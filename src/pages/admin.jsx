import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Download, Pencil, Plus, Search, Trash2, UserMinus, X } from "lucide-react";
import CrestLogo from "../assets/MATEKK_tab_logo.webp";
import API_URL from "../config/api";

function BrandMark() {
	return (
		<img src={CrestLogo} alt="Matekk crest" className="h-20 w-20 object-contain" />
	);
}

function mapApiUser(user) {
	return {
		id: user.userId,
		name: user.username,
		email: `${user.username}@example.com`,
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
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

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
/* User Statistics */
	const userCount = userRows.length;
	const activeUserCount = userRows.filter((user) => user.status === "Active").length;
	const suspendedUserCount = userRows.filter((user) => user.status === "Suspended").length;

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

	return (
		<main className="min-h-screen w-full overflow-x-hidden bg-[#e9e9e9] p-3 font-poppins text-[#666666] sm:p-6 lg:p-0">
			<section className="mx-auto min-h-screen w-full max-w-none overflow-hidden border border-[#8e8e8e] bg-white shadow-sm lg:border-0">
				<header className="relative flex min-h-[92px] items-center gap-4 bg-[#1775ee] px-5 py-4 text-white sm:gap-6 sm:px-8 lg:min-h-[168px] lg:px-12">
					<div className="-ml-8 flex h-[108px] w-[108px] shrink-0 items-center justify-center rounded-full bg-white sm:-ml-14 sm:h-[124px] sm:w-[124px]">
						<BrandMark />
					</div>
					<div className="min-w-0 flex-1">
						<h4 className="text-base font-bold leading-tight tracking-wide sm:text-lg">Users</h4>
						<p className="text-[10px] leading-4 sm:text-xs">Manage who has access to your workspace.</p>
						<div className="mt-3 grid max-w-[560px] grid-cols-3 gap-4 text-[10px] sm:text-[11px]">
							<span><strong className="block text-xl sm:text-2xl">{userCount}</strong>Total users</span>
							<span><strong className="block text-xl sm:text-2xl">{activeUserCount}</strong>Active</span>
							<span><strong className="block text-xl sm:text-2xl">{suspendedUserCount}</strong>Suspended</span>
						</div>
					</div>
					<button type="button" className="absolute right-5 top-1/2 flex -translate-y-1/2 items-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-semibold text-[#145bb7] shadow-sm transition hover:bg-blue-50 sm:right-8">
						<Plus size={17} /> Add user
					</button>
				</header>

				<div className="p-4 sm:p-8 lg:p-12">
					<div className="mb-4 grid gap-3 md:grid-cols-[minmax(240px,1.45fr)_0.9fr_0.9fr_1fr_auto] md:gap-3">
						<div className="relative">
							<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888888]" />
							<input
								type="search"
								value={search}
								onChange={(event) => setSearch(event.target.value)}
								placeholder="Search email or name"
								className="h-11 w-full rounded-lg border border-[#dddddd] pl-11 pr-4 text-sm outline-none placeholder:text-[#777777] focus:border-[#1775ee] focus:ring-2 focus:ring-[#1775ee]/20"
							/>
						</div>
						<select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 rounded-lg border border-[#dddddd] px-4 text-sm outline-none focus:border-[#1775ee]">
							<option>All statuses</option>
							<option>Active</option>
							<option>Inactive</option>
							<option>Suspended</option>
						</select>
						<select value={role} onChange={(event) => setRole(event.target.value)} className="h-11 rounded-lg border border-[#dddddd] px-4 text-sm outline-none focus:border-[#1775ee]">
							<option>All roles</option>
							<option>Member</option>
							<option>Admin</option>
						</select>
						<select value={subject} onChange={(event) => setSubject(event.target.value)} className="h-11 rounded-lg border border-[#dddddd] px-4 text-sm outline-none focus:border-[#1775ee]">
							<option>All subjects</option>
							<option>ECE Review</option>
							<option>Networking</option>
							<option>Cybersecurity</option>
						</select>
						<button type="button" onClick={exportUsers} title="Export users" aria-label="Export users" className="flex h-11 items-center justify-center rounded-lg border border-[#dddddd] px-4 text-[#555555] transition hover:border-[#1775ee] hover:text-[#1775ee]"><Download size={18} /></button>
					</div>

					{selectedCount > 0 && (
						<div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg bg-[#eef5ff] px-4 py-3 text-sm text-[#145bb7]">
							<strong>{selectedCount} selected</strong>
							<button type="button" onClick={() => suspendUsers(selectedUsers)} className="flex items-center gap-1 rounded-md border border-[#b8d5ff] bg-white px-3 py-1.5 font-semibold hover:bg-blue-50"><UserMinus size={15} /> Suspend</button>
							<button type="button" onClick={() => removeUsers(selectedUsers)} className="flex items-center gap-1 rounded-md border border-red-200 bg-white px-3 py-1.5 font-semibold text-red-600 hover:bg-red-50"><Trash2 size={15} /> Delete</button>
							<button type="button" onClick={() => setSelectedUsers([])} title="Clear selection" aria-label="Clear selection" className="ml-auto p-1 hover:text-[#0d4084]"><X size={18} /></button>
						</div>
					)}

					<div className="overflow-x-auto border border-[#dddddd] px-3 sm:px-4">
						<table className="w-full min-w-[760px] border-collapse text-left text-xs">
							<thead>
								<tr className="h-10 border-b border-[#cccccc]">
									<th className="w-8"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all users" /></th>
									<th><button type="button" onClick={() => sortBy("name")} className="flex items-center gap-1 font-semibold">Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</button></th>
									<th>Status</th>
									<th>Role</th>
									<th>Enrolled subject</th>
									<th><button type="button" onClick={() => sortBy("lastActive")} className="flex items-center gap-1 font-semibold">Last active {sortConfig.key === "lastActive" && (sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</button></th>
									<th className="w-20">Actions</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers.map((user) => (
									<tr key={user.name} className="border-b border-[#cccccc] last:border-b-0">
										<td><input type="checkbox" checked={selectedUsers.includes(user.name)} onChange={() => toggleUser(user.name)} aria-label={`Select ${user.name}`} /></td>
										<td className="py-2">
											<div className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d9eaff] text-xs font-bold text-[#1e5ba6]">{initials(user.name)}</span><span><span className="block font-semibold text-[#202020]">{user.name}</span>
												<div className="text-[10px] font-normal text-[#8a8a8a]">{user.email}</div>
											</span></div>
										</td>
										<td><span className={`rounded-full px-2 py-1 ${user.status === "Active" ? "bg-[#ccefcf] text-[#23752a]" : user.status === "Suspended" ? "bg-[#ffd8d8] text-[#a52b2b]" : "text-[#555555]"}`}>{user.status}</span></td>
										<td><span className={`rounded-full px-2 py-1 ${user.role === "Admin" ? "bg-[#e3dcff] text-[#5941b2]" : "text-[#555555]"}`}>{user.role}</span></td>
										<td>{user.enrolledSubject}</td>
										<td>{user.lastActive}</td>
										<td><div className="flex items-center gap-3 text-[#777777]"><button type="button" title={`Edit ${user.name}`} aria-label={`Edit ${user.name}`} className="hover:text-[#1775ee]"><Pencil size={16} /></button><button type="button" onClick={() => removeUsers([user.name])} title={`Delete ${user.name}`} aria-label={`Delete ${user.name}`} className="hover:text-red-600"><Trash2 size={16} /></button></div></td>
									</tr>
								))}
								{filteredUsers.length === 0 && (
									<tr><td colSpan="7" className="h-16 text-center font-normal">No users found</td></tr>
								)}
							</tbody>
						</table>
					</div>
					<div className="flex items-center justify-between border-t border-[#dddddd] px-1 pt-4 text-xs text-[#777777]"><span>Showing {filteredUsers.length} of {userRows.length} users</span><span>Page 1 of 1</span></div>
				</div>
			</section>
		</main>
	);
}