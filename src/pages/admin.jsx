import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, ChevronDown, Download, Inbox, Pencil, Search, Trash2, UserMinus, Users, X } from "lucide-react";
import API_URL from "../config/api";
import { useAuth } from "../context/auth-context";

function mapApiUser(user) {
	const normalizedRole = typeof user.role === "string" ? user.role.trim() : "";
	return {
		id: user.userId,
		name: user.username,
		email: user.email,
		status: user.pending_status ?? (user.active_status ? "Active" : "Pending"),
		role: normalizedRole ? `${normalizedRole[0].toUpperCase()}${normalizedRole.slice(1).toLowerCase()}` : "Unknown",
		enrolledSubject: `${user.module_enrolled || "—"}`,
		lastActive: "Recently",
	};
}

function getLocalDateTimeValue() {
	return new Date(Date.now() - new Date().getTimezoneOffset() * 60_000)
		.toISOString()
		.slice(0, 16);
}

async function fetchAdminJson(url, options = {}) {
	const response = await fetch(url, {
		...options,
		credentials: "include",
		headers: {
			...options.headers,
		},
	});
	const data = await response.json().catch(() => null);

	if (!response.ok) {
		const message = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
		throw new Error(message || `The request could not be completed (HTTP ${response.status}).`);
	}

	return data;
}

export default function UsersDashboard() {
	const { profile } = useAuth();
	const isAdmin = profile?.role?.trim().toLowerCase() === "admin";
	const [userListTab, setUserListTab] = useState("all");
	const [search, setSearch] = useState("");
	const [role, setRole] = useState("All roles");
	const [status, setStatus] = useState("All statuses");
	const [subject, setSubject] = useState("All subjects");
	const [userRows, setUserRows] = useState([]);
	const [usersLoading, setUsersLoading] = useState(true);
	const [usersError, setUsersError] = useState("");
	const [usersRequestAttempt, setUsersRequestAttempt] = useState(0);
	const [inquiries, setInquiries] = useState([]);
	const [inquiriesLoading, setInquiriesLoading] = useState(true);
	const [inquiriesError, setInquiriesError] = useState("");
	const [newInquiryCount, setNewInquiryCount] = useState(0);
	const [inquiryNotification, setInquiryNotification] = useState("");
	const [inquirySearch, setInquirySearch] = useState("");
	const [inquiryStatus, setInquiryStatus] = useState("All statuses");
	const [expandedInquiryId, setExpandedInquiryId] = useState(null);
	const [enrollmentUsers, setEnrollmentUsers] = useState([]);
	const [programs, setPrograms] = useState([]);
	const [enrollments, setEnrollments] = useState([]);
	const [enrollmentLoading, setEnrollmentLoading] = useState(false);
	const [enrollmentError, setEnrollmentError] = useState("");
	const [enrollmentMessage, setEnrollmentMessage] = useState("");
	const [enrollmentSearch, setEnrollmentSearch] = useState("");
	const [studentSearch, setStudentSearch] = useState("");
	const [selectedStudentId, setSelectedStudentId] = useState("");
	const [selectedProgramIds, setSelectedProgramIds] = useState([]);
	const [enrolledAt, setEnrolledAt] = useState(getLocalDateTimeValue);
	const [enrollmentSubmitting, setEnrollmentSubmitting] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [approvingUserId, setApprovingUserId] = useState(null);
	const [approvalError, setApprovalError] = useState("");
	const [acceptingInquiryId, setAcceptingInquiryId] = useState(null);
	const [inquiryActionError, setInquiryActionError] = useState("");
	const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
	const [activeSection, setActiveSection] = useState("users");
	const knownInquiryIds = useRef(new Set());

	useEffect(() => {
		let isMounted = true;
		setUsersLoading(true);
		setUsersError("");
		fetch(`${API_URL}/users`, {
			credentials: "include",
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorData = await response.json().catch(() => null);
					const message = Array.isArray(errorData?.message)
						? errorData.message.join(", ")
						: errorData?.message;
					throw new Error(message || `Failed to fetch users (HTTP ${response.status}).`);
				}
				return response.json();
			})
			.then((data) => {
				if (!Array.isArray(data)) {
					throw new Error("The users response was not a list.");
				}
				if (isMounted) setUserRows(data.map(mapApiUser));
			})
			.catch((error) => {
				if (isMounted) setUsersError(error.message || "Unable to load users.");
			})
			.finally(() => {
				if (isMounted) setUsersLoading(false);
			});
		return () => {
			isMounted = false;
		};
	}, [usersRequestAttempt]);

	useEffect(() => {
		const controller = new AbortController();
		let timeoutId;
		let hasLoadedInquiries = false;

		const loadInquiries = async () => {
			try {
				const response = await fetch(`${API_URL}/inquires`, {
					credentials: "include",
					signal: controller.signal,
				});
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

	useEffect(() => {
		if (activeSection !== "enrollments") return undefined;

		const controller = new AbortController();
		setEnrollmentLoading(true);
		Promise.all([
			fetchAdminJson(`${API_URL}/enrollments/users`, { signal: controller.signal }),
			fetchAdminJson(`${API_URL}/enrollments/programs`, { signal: controller.signal }),
			fetchAdminJson(`${API_URL}/enrollments`, { signal: controller.signal }),
		])
			.then(([users, availablePrograms, currentEnrollments]) => {
				if (!Array.isArray(users) || !Array.isArray(availablePrograms) || !Array.isArray(currentEnrollments)) {
					throw new Error("The enrollment response was not a list.");
				}
				setEnrollmentUsers(users);
				setPrograms(availablePrograms);
				setEnrollments(currentEnrollments);
				setEnrollmentError("");
			})
			.catch((error) => {
				if (error.name !== "AbortError") {
					setEnrollmentError(error.message || "Unable to load enrollment information.");
				}
			})
			.finally(() => {
				if (!controller.signal.aborted) setEnrollmentLoading(false);
			});

		return () => controller.abort();
	}, [activeSection]);

	/* User Statistics */
	const userCount = userRows.length;
	const activeUserCount = userRows.filter((user) => user.status === "Active").length;
	const pendingApprovalCount = userRows.filter((user) => user.status === "Pending").length;
	const openInquiryCount = inquiries.filter((inquiry) => inquiry.status).length;
	const pendingEnrollmentApprovalCount = inquiries.filter(
		(inquiry) => inquiry.status && inquiry.inquiry_type === "Enrollment Request",
	).length;
	const resolvedInquiryCount = inquiries.length - openInquiryCount;
	const enrolledStudentCount = new Set(enrollments.map((enrollment) => enrollment.userId)).size;
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
	const filteredEnrollmentRequests = useMemo(() => {
		const query = search.trim().toLowerCase();
		return inquiries
			.filter((inquiry) => inquiry.status && inquiry.inquiry_type === "Enrollment Request")
			.filter((inquiry) =>
				!query || `${inquiry.name} ${inquiry.email} ${inquiry.phone} ${inquiry.course} ${inquiry.subject}`
					.toLowerCase()
					.includes(query),
			)
			.sort((firstInquiry, secondInquiry) => new Date(secondInquiry.createdAt) - new Date(firstInquiry.createdAt));
	}, [inquiries, search]);

	const filteredEnrollmentUsers = useMemo(() => {
		const query = studentSearch.trim().toLowerCase();
		return enrollmentUsers.filter((user) =>
			!query || `${user.username} ${user.id} ${user.email || ""}`.toLowerCase().includes(query),
		);
	}, [enrollmentUsers, studentSearch]);

	const filteredEnrollments = useMemo(() => {
		const query = enrollmentSearch.trim().toLowerCase();
		return enrollments.filter((enrollment) =>
			!query
			|| `${enrollment.user.username} ${enrollment.user.email || ""} ${enrollment.program.name} ${enrollment.program.training?.name || enrollment.program.parent?.training?.name || ""}`
				.toLowerCase()
				.includes(query),
		);
	}, [enrollmentSearch, enrollments]);

	const filteredUsers = useMemo(() => {
		const query = search.trim().toLowerCase();

		const visibleUsers = userRows.filter((user) => {
			const matchesSearch = !query || `${user.name} ${user.email} ${user.enrolledSubject}`.toLowerCase().includes(query);
			const matchesRole = role === "All roles" || user.role === role;
			const matchesStatus = userListTab === "pending"
				? user.status === "Pending"
				: status === "All statuses" || user.status === status;
			const matchesSubject = subject === "All subjects" || user.enrolledSubject === subject;
			return matchesSearch && matchesRole && matchesStatus && matchesSubject;
		});

		return [...visibleUsers].sort((firstUser, secondUser) => {
			const firstValue = firstUser[sortConfig.key];
			const secondValue = secondUser[sortConfig.key];
			const comparison = firstValue.localeCompare(secondValue);
			return sortConfig.direction === "asc" ? comparison : -comparison;
		});
	}, [role, search, sortConfig, status, subject, userListTab, userRows]);

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

	async function approveUser(user) {
		setApprovingUserId(user.id);
		setApprovalError("");
		try {
			await fetchAdminJson(`${API_URL}/users/${user.id}/approve`, { method: "PATCH" });
			setUserRows((current) => current.map((row) =>
				row.id === user.id ? { ...row, status: "Active" } : row,
			));
		} catch (error) {
			setApprovalError(error.message || `Unable to approve ${user.name}.`);
		} finally {
			setApprovingUserId(null);
		}
	}

	async function acceptInquiry(inquiry) {
		setAcceptingInquiryId(inquiry.id);
		setInquiryActionError("");
		try {
			await fetchAdminJson(`${API_URL}/inquires/${inquiry.id}/accept`, { method: "PATCH" });
			setInquiries((current) => current.map((row) =>
				row.id === inquiry.id ? { ...row, status: false } : row,
			));
		} catch (error) {
			setInquiryActionError(error.message || `Unable to accept the inquiry from ${inquiry.name}.`);
		} finally {
			setAcceptingInquiryId(null);
		}
	}

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

	const toggleProgram = (programId) => {
		setSelectedProgramIds((current) =>
			current.includes(programId)
				? current.filter((selectedId) => selectedId !== programId)
				: [...current, programId],
		);
	};

	const enrollStudent = async (event) => {
		event.preventDefault();
		setEnrollmentError("");
		setEnrollmentMessage("");
		setEnrollmentSubmitting(true);

		try {
			await fetchAdminJson(`${API_URL}/enrollments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: Number(selectedStudentId),
					programIds: selectedProgramIds,
					enrolledAt: new Date(enrolledAt).toISOString(),
				}),
			});
			const updatedEnrollments = await fetchAdminJson(`${API_URL}/enrollments`);
			if (!Array.isArray(updatedEnrollments)) {
				throw new Error("The enrollment response was not a list.");
			}
			setEnrollments(updatedEnrollments);
			setEnrollmentMessage("Student enrollment saved.");
			setSelectedStudentId("");
			setSelectedProgramIds([]);
			setEnrolledAt(getLocalDateTimeValue());
		} catch (error) {
			setEnrollmentError(error.message || "Unable to enroll the student.");
		} finally {
			setEnrollmentSubmitting(false);
		}
	};

	const removeEnrollment = async (userId, programId) => {
		setEnrollmentError("");
		setEnrollmentMessage("");
		try {
			await fetchAdminJson(`${API_URL}/enrollments/${userId}/${programId}`, { method: "DELETE" });
			setEnrollments((current) =>
				current.filter((enrollment) => enrollment.userId !== userId || enrollment.programId !== programId),
			);
		} catch (error) {
			setEnrollmentError(error.message || "Unable to remove the enrollment.");
		}
	};

	return (
		<main className="min-h-screen w-full overflow-x-hidden bg-[#f4f6fa] font-sans text-[#0f172a]">
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
			<header className="bg-[#1673ee] px-5 py-8 text-white sm:px-8 sm:py-9">
				<div className="mx-auto max-w-[1216px]">
					<h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-[40px]">{activeSection === "users" ? "Users" : activeSection === "enrollments" ? "Enroll a student" : "Inquiries"}</h1>
					<p className="mt-1 text-sm text-white/90 sm:text-base">{activeSection === "users" ? "Manage who has access to your workspace." : activeSection === "enrollments" ? "Add a student to a program and see who is already enrolled." : "Review messages and requests submitted through the website."}</p>
					<div className={`mt-6 grid gap-3 lg:gap-4 ${activeSection === "users" ? "grid-cols-2 lg:grid-cols-5" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
						{activeSection === "users" ? (
							<>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Total users</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{userCount}</strong></div>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Active</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{activeUserCount}</strong></div>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Pending approval</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{pendingApprovalCount}</strong></div>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Pending enrollment</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{pendingEnrollmentApprovalCount}</strong></div>
								<button type="button" onClick={showInquiries} className="min-w-0 rounded-[14px] bg-white px-4 py-3.5 text-left text-[#0b4fc2] transition-all duration-200 ease-out hover:-translate-y-1 hover:bg-blue-50 hover:shadow-md active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><span className="block text-xs font-semibold">Inquiries · needs attention</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{openInquiryCount}</strong></button>
							</>
						) : activeSection === "inquiries" ? (
							<>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Total inquiries</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{inquiries.length}</strong></div>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Open</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{openInquiryCount}</strong></div>
								<div className="admin-stat-card min-w-0 rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs font-medium text-white/90">Resolved</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{resolvedInquiryCount}</strong></div>
							</>
						) : (
							<>
								<div className="admin-stat-card rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs text-white/90 sm:text-sm">Total enrollments</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{enrollments.length}</strong></div>
								<div className="admin-stat-card rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs text-white/90 sm:text-sm">Students</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{enrolledStudentCount}</strong></div>
								<div className="admin-stat-card rounded-[14px] border border-white/30 bg-white/15 px-4 py-3.5"><span className="block text-xs text-white/90 sm:text-sm">Programs</span><strong className="mt-1 block text-3xl font-bold leading-none sm:text-4xl">{programs.length}</strong></div>
							</>
						)}
					</div>
				</div>
			</header>

			<section className="mx-auto max-w-[1280px] px-4 py-6 sm:px-8 sm:py-8">
				<div className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-sm">
					<nav aria-label="Admin sections" className="flex flex-wrap gap-1 border-b border-[#e2e8f0] p-3">
						<button type="button" onClick={() => setActiveSection("users")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${activeSection === "users" ? "bg-[#1673ee] text-white" : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0b4fc2]"}`}>
							<Users size={17} /> Users
						</button>
						<button type="button" onClick={showInquiries} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${activeSection === "inquiries" ? "bg-[#1673ee] text-white" : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0b4fc2]"}`}>
							<Inbox size={17} /> Inquiries
							{newInquiryCount > 0 && <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${activeSection === "inquiries" ? "bg-white text-[#0b4fc2]" : "bg-[#b42318] text-white"}`} aria-label={`${newInquiryCount} new inquiries`}>{newInquiryCount}</span>}
						</button>
						<button type="button" onClick={() => setActiveSection("enrollments")} className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${activeSection === "enrollments" ? "bg-[#1673ee] text-white" : "text-[#475569] hover:bg-[#f1f5f9] hover:text-[#0b4fc2]"}`}>
							<Users size={17} /> Enroll students
						</button>
					</nav>

					{activeSection === "users" ? (
						<>
							<div role="tablist" aria-label="User lists" className="flex flex-wrap gap-6 border-b border-[#e2e8f0] px-6">
								<button
									type="button"
									role="tab"
									id="all-users-tab"
									aria-selected={userListTab === "all"}
									aria-controls="users-list-panel"
									onClick={() => setUserListTab("all")}
									className={`border-b-2 px-0 py-4 text-sm font-semibold transition ${userListTab === "all" ? "border-[#1673ee] text-[#0b4fc2]" : "border-transparent text-[#475569] hover:text-[#0b4fc2]"}`}
								>
									All users
								</button>
								<button
									type="button"
									role="tab"
									id="pending-users-tab"
									aria-selected={userListTab === "pending"}
									aria-controls="users-list-panel"
									onClick={() => setUserListTab("pending")}
									className={`flex items-center gap-2 border-b-2 px-0 py-4 text-sm font-semibold transition ${userListTab === "pending" ? "border-[#1673ee] text-[#0b4fc2]" : "border-transparent text-[#475569] hover:text-[#0b4fc2]"}`}
								>
									Pending approval
									<span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${userListTab === "pending" ? "bg-[#eaf2ff] text-[#0b4fc2]" : "bg-[#f1f5f9] text-[#475569]"}`}>{pendingApprovalCount}</span>
								</button>
								<button
									type="button"
									role="tab"
									id="pending-enrollment-tab"
									aria-selected={userListTab === "enrollment"}
									aria-controls="users-list-panel"
									onClick={() => setUserListTab("enrollment")}
									className={`flex items-center gap-2 border-b-2 px-0 py-4 text-sm font-semibold transition ${userListTab === "enrollment" ? "border-[#1673ee] text-[#0b4fc2]" : "border-transparent text-[#475569] hover:text-[#0b4fc2]"}`}
								>
									Pending approval for enrollment
									<span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${userListTab === "enrollment" ? "bg-[#eaf2ff] text-[#0b4fc2]" : "bg-[#f1f5f9] text-[#475569]"}`}>{pendingEnrollmentApprovalCount}</span>
								</button>
							</div>
							<div className="flex flex-wrap items-center gap-3 px-6 py-4">
								<div className="relative min-w-[240px] flex-1 sm:max-w-[380px]">
									<Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#667085]" />
									<input
										type="search"
										value={search}
										onChange={(event) => setSearch(event.target.value)}
										placeholder={userListTab === "enrollment" ? "Search enrollment requests" : "Search email or name"}
										className="h-11 w-full rounded-[10px] border border-[#cbd5e1] bg-white pl-11 pr-4 text-sm outline-none placeholder:text-[#64748b] focus:border-[#1673ee] focus:ring-2 focus:ring-[#1673ee]/15"
									/>
								</div>
								{userListTab !== "enrollment" && userListTab === "all" && <select value={status} onChange={(event) => setStatus(event.target.value)} className="h-11 min-w-[150px] rounded-[10px] border border-[#cbd5e1] bg-white px-4 text-sm text-[#334155] outline-none focus:border-[#1673ee]">
									<option>All statuses</option>
									<option>Active</option>
									<option>Pending</option>
									<option>Inactive</option>
									<option>Suspended</option>
								</select>}
								{userListTab !== "enrollment" && <select value={role} onChange={(event) => setRole(event.target.value)} className="h-11 min-w-[140px] rounded-[10px] border border-[#cbd5e1] bg-white px-4 text-sm text-[#334155] outline-none focus:border-[#1673ee]">
									<option>All roles</option>
									<option>Student</option>
									<option>Admin</option>
								</select>}
								{userListTab !== "enrollment" && <select value={subject} onChange={(event) => setSubject(event.target.value)} className="h-11 min-w-[150px] rounded-[10px] border border-[#cbd5e1] bg-white px-4 text-sm text-[#334155] outline-none focus:border-[#1673ee]">
									<option>All subjects</option>
									<option>ECE Review</option>
									<option>Networking</option>
									<option>Cybersecurity</option>
								</select>}
								{userListTab !== "enrollment" && <button type="button" onClick={exportUsers} title="Export users" aria-label="Export users" className="ml-auto flex h-11 items-center justify-center gap-2 rounded-[10px] border border-[#1673ee] px-4 text-sm font-semibold text-[#0b4fc2] transition hover:bg-[#eff6ff]"><Download size={17} /><span>Export CSV</span></button>}
							</div>

							{userListTab !== "enrollment" && selectedCount > 0 && (
								<div className="mx-6 mb-4 flex flex-wrap items-center gap-4 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] px-4 py-3 text-sm text-[#334155]">
									<strong>{selectedCount} selected</strong>
									<button type="button" onClick={() => suspendUsers(selectedUsers)} className="flex items-center gap-1 font-semibold text-[#2b5cf0] hover:underline"><UserMinus size={15} /> Suspend</button>
									<button type="button" onClick={() => removeUsers(selectedUsers)} className="flex items-center gap-1 font-semibold text-[#e5484d] hover:underline"><Trash2 size={15} /> Delete</button>
									<button type="button" onClick={() => setSelectedUsers([])} title="Clear selection" aria-label="Clear selection" className="ml-auto rounded-md p-1 text-[#667085] hover:bg-white"><X size={18} /></button>
								</div>
							)}

							{userListTab !== "enrollment" && usersError && (
								<div role="alert" className="mx-6 mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
									<span>{usersError}</span>
									<button type="button" onClick={() => setUsersRequestAttempt((attempt) => attempt + 1)} className="font-semibold underline">
										Retry
									</button>
								</div>
							)}
							{userListTab !== "enrollment" && approvalError && <p role="alert" className="mx-6 mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{approvalError}</p>}
							{userListTab === "enrollment" ? (
								<>
									{(inquiriesError || inquiryActionError) && <p role="alert" className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{inquiryActionError || inquiriesError}</p>}
									<div id="users-list-panel" role="tabpanel" aria-labelledby="pending-enrollment-tab" className="overflow-x-auto border-y border-[#e2e8f0]">
										<table className="w-full min-w-[760px] border-collapse text-left text-sm">
											<thead>
												<tr className="h-12 border-b border-[#e3e9f4] bg-[#f8faff] text-xs text-[#667085]">
													<th className="px-3 py-3 sm:px-4">Student</th>
													<th className="px-3 py-3 sm:px-4">Program</th>
													<th className="px-3 py-3 sm:px-4">Contact</th>
													<th className="px-3 py-3 sm:px-4">Requested</th>
													<th className="px-3 py-3 sm:px-4">Action</th>
												</tr>
											</thead>
											<tbody>
												{inquiriesLoading ? (
													<tr><td colSpan="5" className="h-20 text-center text-sm text-[#667085]">Loading enrollment requests...</td></tr>
												) : filteredEnrollmentRequests.length ? filteredEnrollmentRequests.map((request) => {
													const requestDate = new Date(request.createdAt);
													return (
														<tr key={request.id} className="border-b border-[#eef2f9] last:border-b-0 hover:bg-[#fbfcff]">
															<td className="px-3 py-3 sm:px-4">
																<span className="block font-semibold text-[#0f172a]">{request.name}</span>
																<span className="text-xs text-[#667085]">{request.email}</span>
															</td>
															<td className="px-3 py-3 text-[#334155] sm:px-4">{request.course || request.subject}</td>
															<td className="px-3 py-3 text-[#334155] sm:px-4">{request.phone || "—"}</td>
															<td className="whitespace-nowrap px-3 py-3 text-[#667085] sm:px-4">{Number.isNaN(requestDate.getTime()) ? "—" : requestDate.toLocaleDateString()}</td>
															<td className="px-3 py-3 sm:px-4">
																{isAdmin && <button type="button" onClick={() => acceptInquiry(request)} disabled={acceptingInquiryId === request.id} className="whitespace-nowrap rounded-lg bg-[#2174fa] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#145fd5] disabled:cursor-wait disabled:opacity-60">{acceptingInquiryId === request.id ? "Approving..." : "Approve & enroll"}</button>}
															</td>
														</tr>
													);
												}) : (
													<tr><td colSpan="5" className="h-20 text-center text-sm text-[#667085]">{pendingEnrollmentApprovalCount ? "No enrollment requests match your search." : "No enrollment requests are waiting for approval."}</td></tr>
												)}
											</tbody>
										</table>
									</div>
									<div className="flex items-center justify-between border-t border-[#e3e9f4] px-1 pt-4 text-xs text-[#667085]"><span>Showing {filteredEnrollmentRequests.length} of {pendingEnrollmentApprovalCount} pending enrollment requests</span><span>Page 1 of 1</span></div>
								</>
							) : (
							<>
							<div id="users-list-panel" role="tabpanel" aria-labelledby={userListTab === "pending" ? "pending-users-tab" : "all-users-tab"} className="overflow-x-auto border-y border-[#e2e8f0]">
								<table className="w-full min-w-[900px] border-collapse text-left text-sm">
									<thead>
										<tr className="h-12 border-b border-[#e2e8f0] bg-[#f8fafc] text-xs text-[#475569]">
											<th className="w-12 px-4"><input type="checkbox" checked={allVisibleSelected} onChange={toggleAll} aria-label="Select all users" className="h-[18px] w-[18px] rounded border-[#cbd5e1] accent-[#1673ee]" /></th>
											<th className="px-4 py-3"><button type="button" onClick={() => sortBy("name")} className="flex items-center gap-1 font-semibold">Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</button></th>
											<th className="px-4 py-3 font-semibold">Status</th>
											<th className="px-4 py-3 font-semibold">Role</th>
											<th className="px-4 py-3 font-semibold">Enrolled subjects</th>
											<th className="px-4 py-3"><button type="button" onClick={() => sortBy("lastActive")} className="flex items-center gap-1 font-semibold">Last active {sortConfig.key === "lastActive" && (sortConfig.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />)}</button></th>
											<th className="px-4 py-3 text-right font-semibold">Actions</th>
										</tr>
									</thead>
									<tbody>
										{usersLoading && <tr><td colSpan="7" className="h-20 text-center text-sm text-[#667085]">Loading users...</td></tr>}
										{!usersLoading && !usersError && userRows.length === 0 && <tr><td colSpan="7" className="h-20 text-center text-sm text-[#667085]">No users found.</td></tr>}
										{filteredUsers.map((user) => (
											<tr key={user.name} className="border-b border-[#e2e8f0] transition-colors last:border-b-0 hover:bg-[#f8fafc]">
												<td className="px-4 py-3"><input type="checkbox" checked={selectedUsers.includes(user.name)} onChange={() => toggleUser(user.name)} aria-label={`Select ${user.name}`} className="h-[18px] w-[18px] rounded border-[#cbd5e1] accent-[#1673ee]" /></td>
												<td className="px-4 py-3">
													<div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1673ee] text-sm font-semibold text-white">{initials(user.name)}</span><span><span className="block font-semibold leading-tight text-[#0f172a]">{user.name}</span>
														<div className="mt-0.5 text-[13px] font-normal text-[#475569]">{user.email}</div>
													</span></div>
												</td>
												<td className="px-4 py-3"><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${user.status === "Active" ? "bg-[#e7f6ec] text-[#0b6b33]" : user.status === "Pending" ? "bg-[#fff8e6] text-[#946200]" : user.status === "Suspended" ? "bg-[#fef3f2] text-[#b42318]" : "bg-[#f1f5f9] text-[#475569]"}`}><span className={`h-[7px] w-[7px] rounded-full ${user.status === "Active" ? "bg-[#16a34a]" : user.status === "Pending" ? "bg-[#d97706]" : user.status === "Suspended" ? "bg-[#b42318]" : "bg-[#94a3b8]"}`} />{user.status}</span></td>
												<td className="px-4 py-3"><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${user.role === "Admin" ? "bg-[#fff7ed] text-[#b45309]" : "bg-[#eff6ff] text-[#0b4fc2]"}`}>{user.role}</span></td>
												<td className="px-4 py-3 text-[#334155]"><span className="inline-flex rounded-full bg-[#f1f5f9] px-2.5 py-1 text-xs font-medium text-[#334155]">{user.enrolledSubject}</span></td>
												<td className="whitespace-nowrap px-4 py-3 text-[#475569]">{user.lastActive}</td>
												<td className="px-4 py-3"><div className="flex items-center justify-end gap-1.5 text-[#475569]">
													{isAdmin && userListTab === "pending" && user.status === "Pending" && <button type="button" onClick={() => approveUser(user)} disabled={approvingUserId === user.id} className="whitespace-nowrap rounded-lg bg-[#2174fa] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#145fd5] disabled:cursor-wait disabled:opacity-60">{approvingUserId === user.id ? "Approving..." : "Approve"}</button>}
													<button type="button" title={`Edit ${user.name}`} aria-label={`Edit ${user.name}`} className="rounded-md p-2 transition hover:bg-[#eff6ff] hover:text-[#0b4fc2]"><Pencil size={17} /></button><button type="button" onClick={() => removeUsers([user.name])} title={`Delete ${user.name}`} aria-label={`Delete ${user.name}`} className="rounded-md p-2 transition hover:bg-[#fef3f2] hover:text-[#b42318]"><Trash2 size={17} /></button></div></td>
											</tr>
										))}
										{!usersLoading && !usersError && userRows.length > 0 && filteredUsers.length === 0 && (
											<tr><td colSpan="7" className="h-20 text-center text-sm text-[#667085]">{userListTab === "pending" ? "No users are waiting for approval." : "No users match these filters."}</td></tr>
										)}
									</tbody>
								</table>
							</div>
							<div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#e2e8f0] px-6 py-4 text-xs text-[#475569]"><span>Showing {filteredUsers.length} of {userListTab === "pending" ? pendingApprovalCount : userRows.length} {userListTab === "pending" ? "pending users" : "users"}</span><span>Page 1 of 1</span></div>
							</>
							)}
						</>
					) : (
						<section aria-label={activeSection === "enrollments" ? "Student enrollments" : "Website inquiries"}>
							{activeSection === "enrollments" ? (
								<div className="space-y-5 p-5 sm:p-6">
									<div>
										<h2 className="text-xl font-bold text-[#14213d]">Enroll a student</h2>
										<p className="mt-1 text-sm text-[#667085]">Add a student to one or more programs and review current enrollments.</p>
									</div>
									{enrollmentError && <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{enrollmentError}</p>}
									{enrollmentMessage && <p role="status" className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">{enrollmentMessage}</p>}
									<div className="grid items-start gap-5 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
										<form onSubmit={enrollStudent} className="rounded-2xl border border-[#e3e9f4] bg-white p-5 shadow-sm">
											<h3 className="font-bold text-[#14213d]">New enrollment</h3>
											<p className="mt-1 text-xs text-[#667085]">Choose a student and a program.</p>
											<label className="mt-5 block text-xs font-semibold text-[#344054]">Student (userId)</label>
											<input
												type="search"
												value={studentSearch}
												onChange={(event) => setStudentSearch(event.target.value)}
												placeholder="Search by name or ID"
												aria-label="Search students by name or ID"
												className="mt-2 h-10 w-full rounded-lg border border-[#e3e9f4] px-3 text-sm outline-none focus:border-[#2b5cf0] focus:ring-2 focus:ring-[#2b5cf0]/15"
											/>
											<div className="mt-1 max-h-40 overflow-y-auto rounded-lg border border-[#e3e9f4]">
												{enrollmentLoading ? (
													<p className="p-3 text-sm text-[#667085]">Loading students...</p>
												) : filteredEnrollmentUsers.length ? filteredEnrollmentUsers.map((user) => (
													<button key={user.id} type="button" onClick={() => setSelectedStudentId(String(user.id))} aria-pressed={selectedStudentId === String(user.id)} className={`flex w-full items-center justify-between border-b border-[#eef2f9] px-3 py-2.5 text-left text-sm last:border-b-0 ${selectedStudentId === String(user.id) ? "bg-[#edf3ff] text-[#174fc4]" : "hover:bg-[#f8faff]"}`}>
														<span className="min-w-0"><span className="block truncate font-medium">{user.username}</span><span className="block truncate text-[11px] text-[#667085]">{user.email || `usr_${user.id}`}</span></span>
														<span className="ml-3 text-xs text-[#667085]">usr_{user.id}</span>
													</button>
												)) : <p className="p-3 text-sm text-[#667085]">{enrollmentUsers.length ? "No students match your search." : "No students available."}</p>}
											</div>

											<fieldset className="mt-5">
												<legend className="text-xs font-semibold text-[#344054]">Programs (programId)</legend>
												<div className="mt-2 space-y-2">
													{Array.from(new Set(programs.map((program) => program.training?.name || "Other"))).map((trainingName) => (
														<div key={trainingName} className="space-y-1">
															<p className="pt-2 text-xs font-bold uppercase tracking-wide text-[#667085]">{trainingName} training</p>
															{programs.filter((program) => (program.training?.name || "Other") === trainingName).map((program) => (
																<div key={program.id} className="space-y-1">
																	<label className="flex cursor-pointer items-center gap-3 rounded-lg border border-[#e3e9f4] px-3 py-2.5 text-sm hover:bg-[#f8faff]">
																		<input type="checkbox" checked={selectedProgramIds.includes(program.id)} onChange={() => toggleProgram(program.id)} className="h-4 w-4 accent-[#2b5cf0]" />
																		<span className="flex-1">{program.name} — Entire program</span>
																	</label>
																	{program.modules?.map((module) => (
																		<label key={module.id} className="ml-6 flex cursor-pointer items-center gap-3 rounded-lg border border-[#e3e9f4] px-3 py-2.5 text-sm hover:bg-[#f8faff]">
																			<input type="checkbox" checked={selectedProgramIds.includes(module.id)} onChange={() => toggleProgram(module.id)} className="h-4 w-4 accent-[#2b5cf0]" />
																			<span className="flex-1">{program.name} — {module.name}</span>
																		</label>
																	))}
																</div>
															))}
														</div>
													))}
												</div>
												<p className="mt-2 text-xs text-[#667085]">Choose a whole program or one or more of its modules.</p>
											</fieldset>

											<label htmlFor="enrolled-at" className="mt-5 block text-xs font-semibold text-[#344054]">Enrolled at (enrolledAt)</label>
											<input id="enrolled-at" type="datetime-local" value={enrolledAt} onChange={(event) => setEnrolledAt(event.target.value)} required className="mt-2 h-10 w-full rounded-lg border border-[#e3e9f4] px-3 text-sm outline-none focus:border-[#2b5cf0] focus:ring-2 focus:ring-[#2b5cf0]/15" />
											<button type="submit" disabled={enrollmentSubmitting || enrollmentLoading || !selectedStudentId || selectedProgramIds.length === 0} className="mt-4 h-11 w-full rounded-full bg-[#2166f3] text-sm font-semibold text-white transition hover:bg-[#1554d1] disabled:cursor-not-allowed disabled:opacity-50">{enrollmentSubmitting ? "Saving enrollment..." : "Enroll student"}</button>
										</form>

										<section aria-label="Current enrollments" className="rounded-2xl border border-[#e3e9f4] bg-white p-5 shadow-sm">
											<div className="flex flex-wrap items-center justify-between gap-3">
												<div><h3 className="font-bold text-[#14213d]">Enrollments</h3><p className="mt-1 text-xs text-[#667085]">{enrollments.length} total</p></div>
												<input type="search" value={enrollmentSearch} onChange={(event) => setEnrollmentSearch(event.target.value)} placeholder="Filter by name or program" aria-label="Filter enrollments by name or program" className="h-9 w-full rounded-lg border border-[#e3e9f4] px-3 text-xs outline-none focus:border-[#2b5cf0] sm:w-52" />
											</div>
											<div className="mt-4 overflow-x-auto">
												<table className="w-full min-w-[480px] border-collapse text-left text-xs">
													<thead><tr className="border-b border-[#e3e9f4] text-[#667085]"><th className="px-2 py-2 font-semibold">Student</th><th className="px-2 py-2 font-semibold">Program</th><th className="px-2 py-2 font-semibold">Enrolled at</th><th className="px-2 py-2"><span className="sr-only">Remove</span></th></tr></thead>
													<tbody>
														{enrollmentLoading ? <tr><td colSpan="4" className="py-5 text-center text-[#667085]">Loading enrollments...</td></tr>
															: filteredEnrollments.length ? filteredEnrollments.map((enrollment) => {
																const enrollmentDate = new Date(enrollment.enrolledAt);
																return <tr key={`${enrollment.userId}-${enrollment.programId}`} className="border-b border-[#eef2f9] last:border-0">
																	<td className="px-2 py-3"><span className="block font-medium text-[#14213d]">{enrollment.user.username}</span><span className="text-[10px] text-[#667085]">usr_{enrollment.userId}</span></td>
																	<td className="px-2 py-3"><span className="rounded-full bg-[#edf3ff] px-2 py-1 font-semibold text-[#2b5cf0]">{enrollment.program.parent ? `${enrollment.program.parent.training?.name || enrollment.program.training?.name || "Other"} — ${enrollment.program.parent.name} — ${enrollment.program.name}` : `${enrollment.program.training?.name || "Other"} — ${enrollment.program.name} — Entire program`}</span></td>
																	<td className="whitespace-nowrap px-2 py-3 text-[#344054]">{Number.isNaN(enrollmentDate.getTime()) ? "—" : enrollmentDate.toLocaleString()}</td>
																	<td className="px-2 py-3"><button type="button" onClick={() => removeEnrollment(enrollment.userId, enrollment.programId)} className="font-medium text-[#d92d20] hover:underline">Remove</button></td>
																</tr>;
															}) : <tr><td colSpan="4" className="py-5 text-center text-[#667085]">{enrollments.length ? "No enrollments match your filter." : "No enrollments yet."}</td></tr>}
													</tbody>
												</table>
											</div>
										</section>
									</div>
								</div>
							) : (
								<>
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
										<>
											{inquiryActionError && <p role="alert" className="mb-3 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{inquiryActionError}</p>}
											<div className="overflow-x-auto border border-[#dddddd]">
												<table className="w-full min-w-[760px] border-collapse text-left text-xs">
													<thead>
														<tr className="h-10 border-b border-[#cccccc] text-[#555555]">
															<th className="px-3 font-semibold sm:px-4">Sender</th>
															<th className="px-3 font-semibold sm:px-4">Subject</th>
															<th className="px-3 font-semibold sm:px-4">Type</th>
															<th className="px-3 font-semibold sm:px-4">Status</th>
															<th className="px-3 font-semibold sm:px-4">Received</th>
															<th className="px-3 font-semibold sm:px-4">Action</th>
															<th className="w-12 px-3 sm:px-4"><span className="sr-only">Details</span></th>
														</tr>
													</thead>
													<tbody>
														{inquiriesLoading ? (
															<tr><td colSpan="7" className="h-16 text-center">Loading inquiries...</td></tr>
														) : filteredInquiries.length === 0 ? (
															<tr><td colSpan="7" className="h-16 text-center">{inquiries.length === 0 ? "No inquiries found" : "No inquiries match your filters"}</td></tr>
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
																			{isAdmin && inquiry.status && <button type="button" onClick={() => acceptInquiry(inquiry)} disabled={acceptingInquiryId === inquiry.id} className="whitespace-nowrap rounded-lg bg-[#2174fa] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#145fd5] disabled:cursor-wait disabled:opacity-60">{acceptingInquiryId === inquiry.id ? "Accepting..." : inquiry.inquiry_type === "Enrollment Request" ? "Approve & enroll" : "Accept"}</button>}
																		</td>
																		<td className="px-3 py-3 sm:px-4">
																			<button type="button" onClick={() => setExpandedInquiryId(isExpanded ? null : inquiry.id)} aria-expanded={isExpanded} aria-label={`${isExpanded ? "Hide" : "Show"} details for ${inquiry.name}`} className="rounded p-1 text-[#666666] hover:bg-[#eef5ff] hover:text-[#145bb7]"><ChevronDown size={17} className={isExpanded ? "rotate-180" : ""} /></button>
																		</td>
																	</tr>
																	{isExpanded && (
																		<tr className="border-b border-[#cccccc] bg-[#f8fbff]">
																			<td colSpan="7" className="px-4 py-4 sm:px-6">
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
										</>
									)}
									<div className="border-t border-[#dddddd] px-1 pt-4 text-xs text-[#777777]">Showing {filteredInquiries.length} of {inquiries.length} inquiries</div>
								</>
							)}
						</section>
					)}
				</div>
			</section>
		</main>
	);
}