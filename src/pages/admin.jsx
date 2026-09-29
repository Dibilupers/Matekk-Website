import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Download, Inbox, Pencil, Search, Trash2, UserMinus, Users, X } from "lucide-react";
import API_URL from "../config/api";

function mapApiUser(user) {
	return {
		id: user.userId,
		name: user.username,
		email: user.email,
		status: "Active",
		role: `${user.role}`,
		enrolledSubject: `${user.module_enrolled || "—"}`,
		lastActive: "Recently",
	};
}

export default function UsersDashboard() {
	const [search, setSearch] = useState("");
	const [role, setRole] = useState("All roles");
	const [status, setStatus] = useState("All statuses");
	const [subject, setSubject] = useState("All subjects");
	const [userRows, setUserRows] = useState([]);
	const [inquiries, setInquiries] = useState([]);
	const [inquiriesLoading, setInquiriesLoading] = useState(true);
	const [inquiriesError, setInquiriesError] = useState("");
	const [newInquiryCount, setNewInquiryCount] = useState(0);
	const [inquiryNotification, setInquiryNotification] = useState("");
	const [inquirySearch, setInquirySearch] = useState("");
	const [inquiryStatus, setInquiryStatus] = useState("All statuses");
	const [expandedInquiryId, setExpandedInquiryId] = useState(null);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
	const [activeSection, setActiveSection] = useState("users");
	const knownInquiryIds = useRef(new Set());

	useEffect(() => {
		fetch(`${API_URL}/users`)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}
				return response.json();
			})
			.then((data) => setUserRows(data.map(mapApiUser)))
			.catch((error) => console.error(error));
	}, []);

	useEffect(() => {
		const controller = new AbortController();
		let timeoutId;
		let hasLoadedInquiries = false;

		const loadInquiries = async () => {
			try {
				const response = await fetch(`${API_URL}/inquires`, { signal: controller.signal });
				if (!response.ok) {
					throw new Error("Failed to load inquiries.");
				}
				const data = await response.json();
				if (!Array.isArray(data)) {
					throw new Error("The inquiry response was not a list.");
				}

				if (hasLoadedInquiries) {
					const newInquiries = data.filter((inquiry) => !knownInquiryIds.current.has(inquiry.id));
					if (newInquiries.length > 0) {
						setNewInquiryCount((count) => count + newInquiries.length);
						setInquiryNotification(
							newInquiries.length === 1
								? `${newInquiries[0].name} sent a new inquiry.`
								: `${newInquiries.length} new inquiries received.`,
						);
					}
				}
				data.forEach((inquiry) => knownInquiryIds.current.add(inquiry.id));
				hasLoadedInquiries = true;
				setInquiries(data);
				setInquiriesError("");
			} catch (error) {
				if (error.name !== "AbortError") {
					setInquiriesError(error.message || "Unable to load inquiries.");
				}
			} finally {
				if (!controller.signal.aborted) {
					setInquiriesLoading(false);
					timeoutId = window.setTimeout(loadInquiries, 15_000);
				}
			}
		};

		loadInquiries();

		return () => {
			controller.abort();
			window.clearTimeout(timeoutId);
		};
	}, []);

	/* User Statistics */
	const userCount = userRows.length;
	const activeUserCount = userRows.filter((user) => user.status === "Active").length;
	const openInquiryCount = inquiries.filter((inquiry) => inquiry.status).length;
	const resolvedInquiryCount = inquiries.length - openInquiryCount;
	const filteredInquiries = useMemo(() => {
		const query = inquirySearch.trim().toLowerCase();

		return inquiries
			.filter((inquiry) => {
				const searchableText = [
					inquiry.name,
					inquiry.email,
					inquiry.phone,
					inquiry.subject,
					inquiry.inquiry_type,
					inquiry.message,
					inquiry.course,
					inquiry.service_interest,
					inquiry.project_desc,
				].filter(Boolean).join(" ").toLowerCase();
				const matchesSearch = !query || searchableText.includes(query);
				const matchesStatus = inquiryStatus === "All statuses"
					|| (inquiryStatus === "Open" && inquiry.status)
					|| (inquiryStatus === "Resolved" && !inquiry.status);

				return matchesSearch && matchesStatus;
			})
			.sort((firstInquiry, secondInquiry) => new Date(secondInquiry.createdAt) - new Date(firstInquiry.createdAt));
	}, [inquiries, inquirySearch, inquiryStatus]);

	const filteredUsers = useMemo(() => {
		const query = search.trim().toLowerCase();

		const visibleUsers = userRows.filter((user) => {
			const matchesSearch = !query || `${user.name} ${user.email} ${user.enrolledSubject}`.toLowerCase().includes(query);
			const matchesRole = role === "All roles" || user.role === role;
			const matchesStatus = status === "All statuses" || user.status === status;
			const matchesSubject = subject === "All subjects" || user.enrolledSubject === subject;
			return matchesSearch && matchesRole && matchesStatus && matchesSubject;
		});

		return [...visibleUsers].sort((firstUser, secondUser) => {
			const firstValue = firstUser[sortConfig.key];
			const secondValue = secondUser[sortConfig.key];
			const comparison = firstValue.localeCompare(secondValue);
			return sortConfig.direction === "asc" ? comparison : -comparison;
		});
	}, [role, search, sortConfig, status, subject, userRows]);

	const sortBy = (key) => {
		setSortConfig((current) => ({
			key,
			direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
		}));
	};

	const removeUsers = (names) => {
		setUserRows((current) => current.filter((user) => !names.includes(user.name)));
		setSelectedUsers((current) => current.filter((name) => !names.includes(name)));
	};

	const suspendUsers = (names) => {
		setUserRows((current) => current.map((user) => names.includes(user.name) ? { ...user, status: "Suspended" } : user));
		setSelectedUsers([]);
	};

	const exportUsers = () => {
		const csv = ["Name,Email,Role,Status,Enrolled Subject,Last Active", ...userRows.map((user) => [user.name, user.email, user.role, user.status, user.enrolledSubject, user.lastActive].map((value) => `"${value}"`).join(","))].join("\n");
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "users.csv";
		link.click();
		URL.revokeObjectURL(url);
	};

	const toggleUser = (name) => {
		setSelectedUsers((current) =>
			current.includes(name) ? current.filter((selected) => selected !== name) : [...current, name],
		);
	};

	const toggleAll = () => {
		const visibleNames = filteredUsers.map((user) => user.name);
		const allVisibleSelected = visibleNames.every((name) => selectedUsers.includes(name));

		setSelectedUsers((current) =>
			allVisibleSelected
				? current.filter((name) => !visibleNames.includes(name))
				: [...new Set([...current, ...visibleNames])],
		);
	};

	const allVisibleSelected = filteredUsers.length > 0 && filteredUsers.every((user) => selectedUsers.includes(user.name));
	const initials = (name) => name.split(" ").map((part) => part[0]).slice(0, 2).join("");
	const selectedCount = selectedUsers.length;
	const showInquiries = () => {
		setActiveSection("inquiries");
		setNewInquiryCount(0);
		setInquiryNotification("");
	};

	return (
		<main className="min-h-screen w-full overflow-x-hidden bg-white font-poppins text-[#0f172a]">
			{inquiryNotification && (
				<div role="status" aria-live="polite" className="fixed bottom-5 right-5 z-50 flex max-w-sm items-start gap-4 rounded-xl bg-[#145bb7] px-5 py-4 text-sm text-white shadow-xl">
					<div className="flex-1">
						<p className="font-semibold">New inquiry</p>
						<p className="mt-1">{inquiryNotification}</p>
						<button type="button" onClick={showInquiries} className="mt-3 font-semibold underline underline-offset-2 hover:text-blue-100">View inquiries</button>
					</div>
					<button type="button" onClick={() => setInquiryNotification("")} aria-label="Dismiss inquiry notification" className="rounded p-1 hover:bg-white/10"><X size={16} /></button>
				</div>
			)}
			<header className="bg-[#1775ee] px-5 py-6 text-white sm:px-8 sm:py-7">
				<div className="mx-auto max-w-[950px]">
					<h1 className="text-2xl font-bold leading-tight tracking-wide sm:text-[32px]">{activeSection === "users" ? "Users" : "Inquiries"}</h1>
					<p className="mt-1 text-sm sm:text-lg">{activeSection === "users" ? "Manage who has access to your workspace." : "Review messages and requests submitted through the website."}</p>
					<div className="mt-6 grid grid-cols-3 gap-3 text-center sm:mt-7 sm:gap-6">
						{activeSection === "users" ? (
							<>
								<div><span className="block text-xs sm:text-base">Total Users</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-[40px]">{userCount}</strong></div>
								<div><span className="block text-xs sm:text-base">Active</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-[40px]">{activeUserCount}</strong></div>
								<div><span className="block text-xs sm:text-base">Inquiries</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-[40px]">{openInquiryCount}</strong></div>
							</>
						) : (
							<>
								<div><span className="block text-xs sm:text-base">Total Inquiries</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-[40px]">{inquiries.length}</strong></div>
								<div><span className="block text-xs sm:text-base">Open</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-[40px]">{openInquiryCount}</strong></div>
								<div><span className="block text-xs sm:text-base">Resolved</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-[40px]">{resolvedInquiryCount}</strong></div>
							</>
						)}
					</div>
				</div>
			</header>

			<section className="mx-auto max-w-[1180px] px-4 sm:px-8">
				<div className="py-5 sm:py-7">
					<nav aria-label="Admin sections" className="mb-5 flex flex-wrap gap-2 border-b border-[#e3e9f4] pb-4">
						<button type="button" onClick={() => setActiveSection("users")} className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${activeSection === "users" ? "bg-[#2b5cf0] text-white shadow-lg shadow-[#2b5cf0]/20" : "text-[#667085] hover:bg-[#edf3ff] hover:text-[#2b5cf0]"}`}>
							<Users size={17} /> Users
						</button>
						<button type="button" onClick={showInquiries} className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${activeSection === "inquiries" ? "bg-[#2b5cf0] text-white shadow-lg shadow-[#2b5cf0]/20" : "text-[#667085] hover:bg-[#edf3ff] hover:text-[#2b5cf0]"}`}>
							<Inbox size={17} /> Inquiries
							{newInquiryCount > 0 && <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeSection === "inquiries" ? "bg-white text-[#2b5cf0]" : "bg-[#e5484d] text-white"}`} aria-label={`${newInquiryCount} new inquiries`}>{newInquiryCount}</span>}
						</button>
					</nav>

					{activeSection === "users" ? (
						<>
							<div className="mb-4 flex flex-wrap gap-3">
								<div className="relative">
									<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]" />
									<input
										type="search"
										value={search}
										onChange={(event) => setSearch(event.target.value)}
										placeholder="Search email or name"
										className="h-11 w-full min-w-[240px] rounded-[14px] border border-[#e3e9f4] bg-white pl-11 pr-4 text-sm outline-none placeholder:text-[#667085] focus:border-[#2b5cf0] focus:ring-2 focus:ring-[#2b5cf0]/15 sm:flex-1"
									/>
								</div>
								<select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 min-w-[150px] rounded-[14px] border border-[#e3e9f4] bg-white px-4 text-sm text-[#667085] outline-none focus:border-[#2b5cf0]">
									<option>All statuses</option>
									<option>Active</option>
									<option>Inactive</option>
									<option>Suspended</option>
								</select>
								<select value={role} onChange={(event) => setRole(event.target.value)} className="h-11 min-w-[140px] rounded-[14px] border border-[#e3e9f4] bg-white px-4 text-sm text-[#667085] outline-none focus:border-[#2b5cf0]">
									<option>All roles</option>
									<option>Member</option>
									<option>Admin</option>
								</select>
								<select value={subject} onChange={(event) => setSubject(event.target.value)} className="h-11 min-w-[150px] rounded-[14px] border border-[#e3e9f4] bg-white px-4 text-sm text-[#667085] outline-none focus:border-[#2b5cf0]">
									<option>All subjects</option>
									<option>ECE Review</option>
									<option>Networking</option>
									<option>Cybersecurity</option>
								</select>
								<button type="button" onClick={exportUsers} title="Export users" aria-label="Export users" className="flex h-11 items-center justify-center gap-2 rounded-full border-[1.5px] border-[#2b5cf0] px-5 text-sm font-semibold text-[#2b5cf0] transition hover:bg-[#edf3ff]"><Download size={17} /><span>Export CSV</span></button>
							</div>

							{selectedCount > 0 && (
								<div className="mb-4 flex flex-wrap items-center gap-4 rounded-[14px] border border-[#cddcff] bg-[#edf3ff] px-4 py-3 text-sm text-[#334155]">
									<strong>{selectedCount} selected</strong>
									<button type="button" onClick={() => suspendUsers(selectedUsers)} className="flex items-center gap-1 font-semibold text-[#2b5cf0] hover:underline"><UserMinus size={15} /> Suspend</button>
									<button type="button" onClick={() => removeUsers(selectedUsers)} className="flex items-center gap-1 font-semibold text-[#e5484d] hover:underline"><Trash2 size={15} /> Delete</button>
									<button type="button" onClick={() => setSelectedUsers([])} title="Clear selection" aria-label="Clear selection" className="ml-auto rounded-md p-1 text-[#667085] hover:bg-white"><X size={18} /></button>
								</div>
							)}

							<div className="overflow-x-auto rounded-[18px] border border-[#e3e9f4]">
								<table className="w-full min-w-[760px] border-collapse text-left text-sm">
									<thead>
										<tr className="h-12 border-b border-[#e3e9f4] bg-[#f8faff] text-xs text-[#667085]">
											<th className="w-12 px-3 sm:px-4"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all users" className="h-4 w-4 rounded border-[#b5c1d6] accent-[#2b5cf0]" /></th>
											<th className="px-3 py-3 sm:px-4"><button type="button" onClick={() => sortBy("name")} className="flex items-center gap-1 font-semibold">Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</button></th>
											<th className="px-3 py-3 font-semibold sm:px-4">Status</th>
											<th className="px-3 py-3 font-semibold sm:px-4">Role</th>
											<th className="px-3 py-3 font-semibold sm:px-4">Enrolled subject</th>
											<th className="px-3 py-3 sm:px-4"><button type="button" onClick={() => sortBy("lastActive")} className="flex items-center gap-1 font-semibold">Last active {sortConfig.key === "lastActive" && (sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</button></th>
											<th className="w-20 px-3 py-3 font-semibold sm:px-4">Actions</th>
										</tr>
									</thead>
									<tbody>
										{filteredUsers.map((user) => (
											<tr key={user.name} className="border-b border-[#eef2f9] transition-colors last:border-b-0 hover:bg-[#fbfcff]">
												<td className="px-3 py-3 sm:px-4"><input type="checkbox" checked={selectedUsers.includes(user.name)} onChange={() => toggleUser(user.name)} aria-label={`Select ${user.name}`} className="h-4 w-4 rounded border-[#b5c1d6] accent-[#2b5cf0]" /></td>
												<td className="px-3 py-3 sm:px-4">
													<div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2b5cf0] text-xs font-semibold text-white">{initials(user.name)}</span><span><span className="block font-semibold leading-tight text-[#0f172a]">{user.name}</span>
														<div className="mt-0.5 text-xs font-normal text-[#667085]">{user.email}</div>
													</span></div>
												</td>
												<td className="px-3 py-3 sm:px-4"><span className={`before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full ${user.status === "Active" ? "text-[#0f172a] before:bg-[#12a150]" : user.status === "Suspended" ? "text-[#0f172a] before:bg-[#e5484d]" : "text-[#667085] before:bg-[#94a3b8]"}`}>{user.status}</span></td>
												<td className="px-3 py-3 sm:px-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${user.role === "Admin" ? "bg-[#fff0e0] text-[#b4520a]" : "bg-[#e8efff] text-[#2b5cf0]"}`}>{user.role}</span></td>
												<td className="px-3 py-3 text-[#334155] sm:px-4">{user.enrolledSubject}</td>
												<td className="whitespace-nowrap px-3 py-3 text-[#667085] sm:px-4">{user.lastActive}</td>
												<td className="px-3 py-3 sm:px-4"><div className="flex items-center gap-3 text-[#667085]"><button type="button" title={`Edit ${user.name}`} aria-label={`Edit ${user.name}`} className="transition hover:text-[#2b5cf0]"><Pencil size={16} /></button><button type="button" onClick={() => removeUsers([user.name])} title={`Delete ${user.name}`} aria-label={`Delete ${user.name}`} className="transition hover:text-[#e5484d]"><Trash2 size={16} /></button></div></td>
											</tr>
										))}
										{filteredUsers.length === 0 && (
											<tr><td colSpan="7" className="h-20 text-center text-sm text-[#667085]">No users found</td></tr>
										)}
									</tbody>
								</table>
							</div>
							<div className="flex items-center justify-between border-t border-[#e3e9f4] px-1 pt-4 text-xs text-[#667085]"><span>Showing {filteredUsers.length} of {userRows.length} users</span><span>Page 1 of 1</span></div>
						</>
					) : (
						<section aria-label="Website inquiries">
							<div className="mb-4 grid gap-3 sm:grid-cols-[minmax(240px,1fr)_200px]">
								<div className="relative">
									<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" />
									<input
										type="search"
										value={inquirySearch}
										onChange={(event) => setInquirySearch(event.target.value)}
										placeholder="Search inquiries"
										aria-label="Search inquiries"
										className="h-11 w-full rounded-lg border border-[#dddddd] pl-11 pr-4 text-sm outline-none placeholder:text-[#777777] focus:border-[#1775ee] focus:ring-2 focus:ring-[#1775ee]/20"
									/>
								</div>
								<select value={inquiryStatus} onChange={(event) => setInquiryStatus(event.target.value)} className="h-11 rounded-lg border border-[#dddddd] px-4 text-sm outline-none focus:border-[#1775ee]" aria-label="Filter by inquiry status">
									<option>All statuses</option>
									<option>Open</option>
									<option>Resolved</option>
								</select>
							</div>

							{inquiriesError ? (
								<p role="alert" className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{inquiriesError}</p>
							) : (
								<div className="overflow-x-auto border border-[#dddddd]">
									<table className="w-full min-w-[760px] border-collapse text-left text-xs">
										<thead>
											<tr className="h-10 border-b border-[#cccccc] text-[#555555]">
												<th className="px-3 font-semibold sm:px-4">Sender</th>
												<th className="px-3 font-semibold sm:px-4">Subject</th>
												<th className="px-3 font-semibold sm:px-4">Type</th>
												<th className="px-3 font-semibold sm:px-4">Status</th>
												<th className="px-3 font-semibold sm:px-4">Received</th>
												<th className="w-12 px-3 sm:px-4"><span className="sr-only">Details</span></th>
											</tr>
										</thead>
										<tbody>
											{inquiriesLoading ? (
												<tr><td colSpan="6" className="h-16 text-center">Loading inquiries...</td></tr>
											) : filteredInquiries.length === 0 ? (
												<tr><td colSpan="6" className="h-16 text-center">{inquiries.length === 0 ? "No inquiries found" : "No inquiries match your filters"}</td></tr>
											) : filteredInquiries.map((inquiry) => {
												const isExpanded = expandedInquiryId === inquiry.id;
												const receivedAt = new Date(inquiry.createdAt);
												const receivedLabel = Number.isNaN(receivedAt.getTime()) ? "—" : receivedAt.toLocaleString();
												const detailFields = [
													["Funding", inquiry.funding],
													["Attendees", inquiry.attendees],
													["Course", inquiry.course],
													["Service interest", inquiry.service_interest],
													["Project scale", inquiry.project_scale],
													["Timeline", inquiry.timeline],
													["Budget", inquiry.budget],
													["Project description", inquiry.project_desc],
													["Technical specifications", inquiry.tech_specs],
												].filter(([, value]) => value);

												return (
													<Fragment key={inquiry.id}>
														<tr className="border-b border-[#cccccc] last:border-b-0">
															<td className="px-3 py-3 sm:px-4">
																<span className="block font-semibold text-[#202020]">{inquiry.name}</span>
																<a href={`mailto:${inquiry.email}`} className="text-[10px] text-[#666666] hover:text-[#145bb7]">{inquiry.email}</a>
															</td>
															<td className="px-3 py-3 sm:px-4">{inquiry.subject}</td>
															<td className="px-3 py-3 sm:px-4">{inquiry.inquiry_type}</td>
															<td className="px-3 py-3 sm:px-4"><span className={`rounded-full px-2 py-1 ${inquiry.status ? "bg-[#fff0cf] text-[#8b5b00]" : "bg-[#ccefcf] text-[#23752a]"}`}>{inquiry.status ? "Open" : "Resolved"}</span></td>
															<td className="whitespace-nowrap px-3 py-3 sm:px-4">{receivedLabel}</td>
															<td className="px-3 py-3 sm:px-4">
																<button type="button" onClick={() => setExpandedInquiryId(isExpanded ? null : inquiry.id)} aria-expanded={isExpanded} aria-label={`${isExpanded ? "Hide" : "Show"} details for ${inquiry.name}`} className="rounded p-1 text-[#666666] hover:bg-[#eef5ff] hover:text-[#145bb7]"><ChevronDown size={17} className={isExpanded ? "rotate-180" : ""} /></button>
															</td>
														</tr>
														{isExpanded && (
															<tr className="border-b border-[#cccccc] bg-[#f8fbff]">
																<td colSpan="6" className="px-4 py-4 sm:px-6">
																	<div className="grid gap-4 sm:grid-cols-2">
																		<div><h3 className="mb-1 font-semibold text-[#202020]">Message</h3><p className="whitespace-pre-wrap text-sm text-[#555555]">{inquiry.message || "No message provided."}</p></div>
																		<div className="space-y-1 text-sm text-[#555555]"><h3 className="mb-1 font-semibold text-[#202020]">Contact</h3><p>Phone: {inquiry.phone || "—"}</p><p>Email: {inquiry.email || "—"}</p></div>
																	</div>
																	{detailFields.length > 0 && <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-[#dddddd] pt-4 sm:grid-cols-2 lg:grid-cols-3">{detailFields.map(([label, value]) => <div key={label}><dt className="font-semibold text-[#202020]">{label}</dt><dd className="mt-0.5 whitespace-pre-wrap text-[#555555]">{value}</dd></div>)}</dl>}
																</td>
															</tr>
														)}
													</Fragment>
												);
											})}
										</tbody>
									</table>
								</div>
							)}
							<div className="border-t border-[#dddddd] px-1 pt-4 text-xs text-[#777777]">Showing {filteredInquiries.length} of {inquiries.length} inquiries</div>
						</section>
					)}
				</div>
			</section>
		</main>
	);
}