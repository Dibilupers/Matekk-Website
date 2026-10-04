import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, LayoutGrid, List, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API_URL from "../config/api";
import { TRAINING_COURSES } from "../components/training/courses";
import CCNALogo from "../assets/CCNA.png";
import APlusLogo from "../assets/aplus.webp";
import NetworkPlusLogo from "../assets/network+.webp";
import FortinetLogo from "../assets/FortinetHeader.webp";
import PaloAltoLogo from "../assets/PaloAltoHeader.webp";
import DataCenterLogo from "../assets/certified_data_centre_professional.webp";
import CybersecurityLogo from "../assets/CyberSecurityheader.webp";
import AzureLogo from "../assets/azure_fundamentals.webp";
import AwsLogo from "../assets/awspractitioner.webp";
import ItilLogo from "../assets/itil5.webp";
import ProjectManagementLogo from "../assets/project_management_professional.webp";
import CCNAAutomationLogo from "../assets/CCNAAutomation.webp";
import CCNACybersecurityLogo from "../assets/CCNAcybersecurity.webp";
import CCNPDatacenterLogo from "../assets/CCNPDatacenter.webp";
import CCNPEnterpriseLogo from "../assets/CCNPEnterprise.webp";
import CCNPSecurityLogo from "../assets/CCNPSecurity.png";
import CiscoLogo from "../assets/cisco.png";
import SecurityPlusLogo from "../assets/security+.webp";
import CySAPlusLogo from "../assets/cysa.webp";
import PenTestPlusLogo from "../assets/pentest.webp";
import LinuxPlusLogo from "../assets/linux+.webp";
import FortiOSLogo from "../assets/nse-4-fortios.svg";
import FortinetSecureNetworkingLogo from "../assets/nse-5-secure-networking.svg";
import FortinetSaseLogo from "../assets/nse-5-sase.svg";
import FortinetCloudSecurityLogo from "../assets/nse-5-cloud-security.svg";
import FortinetSecurityOperationsLogo from "../assets/nse-5-security-operations.svg";
import FortinetCybersecurityExpertLogo from "../assets/nse-8-cybersecurity-expert.png";
import PaloAltoApprenticeLogo from "../assets/PaloAltoCyberSecurityApprentice.png";
import PaloAltoPractitionerLogo from "../assets/PaloAltoCyberSecurityPractitioner.png";
import PaloAltoProfessionalLogo from "../assets/PaloAltoProfessional.png";
import PaloAltoAnalystLogo from "../assets/PaloAltoNetworkSecurityAnalyst.png";
import PaloAltoFirewallEngineerLogo from "../assets/PaloAltoNextGenFirewallEngineer.png";
import PaloAltoSdwanEngineerLogo from "../assets/PaloAltoSDWanEngineer.png";
import PaloAltoSseEngineerLogo from "../assets/PaloAltoSecurityServiceEdgeEngineer.png";
import PaloAltoArchitectLogo from "../assets/PaloAltoNetworkSecurityArchitect.png";
import PaloAltoSecOpsLogo from "../assets/PaloAltoSecurityOperationProfessional.png";
import PaloAltoXsiamAnalystLogo from "../assets/PaloAltoXsiamAnalyst.png";
import PaloAltoXdrAnalystLogo from "../assets/PaloAltoXDRAnalyst.png";
import PaloAltoXsiamEngineerLogo from "../assets/PaloAltoXsiamEngineer.png";
import PaloAltoXdrEngineerLogo from "../assets/PaloAltoXDREngineer.png";
import PaloAltoXsoarEngineerLogo from "../assets/PaloAltoXsoarEngineer.png";
import PaloAltoCloudSecurityLogo from "../assets/PaloAltoCloudSecurityProfessional.png";
import DcfcLogo from "../assets/dcfc.webp";
import CdcpLogo from "../assets/cdcp.webp";
import CdcsLogo from "../assets/cdcs.webp";
import CdthLogo from "../assets/cdth.png";
import MatekkTrainingLogo from "../assets/MATEKK_training_logo.png";
import AzureFundamentalsLogo from "../assets/azure.svg";
import AwsEssentialsLogo from "../assets/awsessentials.png";
import Itil5FoundationLogo from "../assets/itil5.webp";
import PmpLogo from "../assets/pmp.webp";

const PROGRAM_INTROS = [
	"Explore practical ICT training programs designed to help you grow with confidence.",
	"Build in-demand technology skills with training programs designed for your next step.",
	"Discover hands-on ICT courses and grow your confidence for the future of technology.",
	"Find the right training program to strengthen your skills and move your career forward.",
	"Explore technology courses that turn your curiosity into practical, career-ready skills.",
];

const categoryLogos = {
	Cisco: CCNALogo,
	CompTIA: APlusLogo,
	Fortinet: FortinetLogo,
	"Palo Alto": PaloAltoLogo,
	"Data Center": DataCenterLogo,
	Cybersecurity: CybersecurityLogo,
	"Cloud Computing": AzureLogo,
	"IT Management": ItilLogo,
	"Project Management": ProjectManagementLogo,
};

const programLogos = {
	"/training/cisco/ccna/ccna": CCNALogo,
	"/training/cisco/ccna/automation": CCNAAutomationLogo,
	"/training/cisco/ccna/cybersecurity": CCNACybersecurityLogo,
	"/training/cisco/ccnp/enterprise": CCNPEnterpriseLogo,
	"/training/cisco/ccnp/security": CCNPSecurityLogo,
	"/training/cisco/ccnp/datacenter": CCNPDatacenterLogo,
	"/training/cisco/ccnp/collaboration": CiscoLogo,
	"/training/comptia/aplus": APlusLogo,
	"/training/comptia/network": NetworkPlusLogo,
	"/training/comptia/security+": SecurityPlusLogo,
	"/training/comptia/cysa": CySAPlusLogo,
	"/training/comptia/pentest": PenTestPlusLogo,
	"/training/comptia/linux": LinuxPlusLogo,
	"/training/fortinet/fortios": FortiOSLogo,
	"/training/fortinet/secure-networking": FortinetSecureNetworkingLogo,
	"/training/fortinet/sase": FortinetSaseLogo,
	"/training/fortinet/cloud-security": FortinetCloudSecurityLogo,
	"/training/fortinet/security-operations": FortinetSecurityOperationsLogo,
	"/training/fortinet/cybersecurity-expert": FortinetCybersecurityExpertLogo,
	"/training/paloalto/networksecurity/apprentice": PaloAltoApprenticeLogo,
	"/training/paloalto/networksecurity/practitioner": PaloAltoPractitionerLogo,
	"/training/paloalto/networksecurity/professional": PaloAltoProfessionalLogo,
	"/training/paloalto/networksecurity/analyst": PaloAltoAnalystLogo,
	"/training/paloalto/networksecurity/nextgenerationfirewallengineer": PaloAltoFirewallEngineerLogo,
	"/training/paloalto/networksecurity/sdwanengineer": PaloAltoSdwanEngineerLogo,
	"/training/paloalto/networksecurity/securityserviceedgeengineer": PaloAltoSseEngineerLogo,
	"/training/paloalto/networksecurity/architect": PaloAltoArchitectLogo,
	"/training/paloalto/securityoperations/professional": PaloAltoSecOpsLogo,
	"/training/paloalto/securityoperations/xsiamanalyst": PaloAltoXsiamAnalystLogo,
	"/training/paloalto/securityoperations/xdranalyst": PaloAltoXdrAnalystLogo,
	"/training/paloalto/securityoperations/xsiamengineer": PaloAltoXsiamEngineerLogo,
	"/training/paloalto/securityoperations/xdrengineer": PaloAltoXdrEngineerLogo,
	"/training/paloalto/securityoperations/xsoarengineer": PaloAltoXsoarEngineerLogo,
	"/training/paloalto/cloudsecurity/professional": PaloAltoCloudSecurityLogo,
	"/training/datacenter/dcfc": DcfcLogo,
	"/training/datacenter/cdcp": CdcpLogo,
	"/training/datacenter/cdcs": CdcsLogo,
	"/training/cybersecurity/cdth": CdthLogo,
	"/training/cybersecurity/peh": MatekkTrainingLogo,
	"/training/cloud/microsoft/azurefundamentals": AzureFundamentalsLogo,
	"/training/cloud/aws/practitioner": AwsLogo,
	"/training/cloud/aws/essentials": AwsEssentialsLogo,
	"/training/itil5/foundation": Itil5FoundationLogo,
	"/training/projectmanagement/pmp": PmpLogo,
};

function getCategoryCourses(category) {
	const selectedCategory = TRAINING_COURSES.find((item) => item.name === category);
	if (!selectedCategory) return [];

	const flatten = (items) => items.flatMap((item) =>
		item.path ? [{ name: item.name, path: item.path }] : flatten(item.subcourses || []),
	);

	return flatten(selectedCategory.subcourses || []);
}

function getCoursesForEnrollment(enrollment) {
	if (!enrollment) return [];

	const enrollments = (Array.isArray(enrollment) ? enrollment : [enrollment])
		.flatMap((item) => String(item).split(","))
		.map((item) => item.trim().toLowerCase())
		.filter(Boolean);

	return TRAINING_COURSES.flatMap((category) => {
		const categoryMatches = enrollments.includes(category.name.toLowerCase());
		return getCategoryCourses(category.name)
			.filter((course) => categoryMatches || enrollments.includes(course.name.toLowerCase()))
			.map((course) => ({
				...course,
				category: category.name,
				image: programLogos[course.path] ?? categoryLogos[category.name],
				description: `Explore the ${course.name} program and develop industry-ready skills with MATEKK Cybercore Technologies.`,
			}));
	});
}

function getProgramPath(course) {
	if (course.name === "CCNA") return "/modules/programs/ccna";
	if (course.name === "CCNA Automation") return "/modules/programs/ccna-automation";
	if (course.name === "CCNA Cybersecurity") return "/modules/programs/ccna-cybersecurity";
	return course.path;
}

/* Reads User's Profile to display enrolled courses */
export default function Blank() {
	const navigate = useNavigate();
	const { profile: sessionProfile } = useAuth();
	const [activeCategory, setActiveCategory] = useState("All Programs");
	const [programLayout, setProgramLayout] = useState("grid");
	const [programSearch, setProgramSearch] = useState("");
	const [loadedProfile, setLoadedProfile] = useState(null);
	const [profileError, setProfileError] = useState("");
	const profile = sessionProfile ?? loadedProfile;
	const hasProfile = profile !== null;
	const [introText] = useState(() => PROGRAM_INTROS[Math.floor(Math.random() * PROGRAM_INTROS.length)]);
	const [typedUsername, setTypedUsername] = useState("");
	const [typedIntro, setTypedIntro] = useState("");
	const enrolledCourses = useMemo(
		() => getCoursesForEnrollment([profile?.module_enrolled, profile?.course_enrolled]),
		[profile?.module_enrolled, profile?.course_enrolled],
	);
	const categories = ["All Programs", ...new Set(enrolledCourses.map((course) => course.category))];
	const visibleCourses = useMemo(() => {
		const normalizedSearch = programSearch.trim().toLowerCase();
		return enrolledCourses.filter((course) => {
			const matchesCategory = activeCategory === "All Programs" || course.category === activeCategory;
			const matchesSearch = !normalizedSearch || `${course.name} ${course.category} ${course.description}`
				.toLowerCase()
				.includes(normalizedSearch);
			return matchesCategory && matchesSearch;
		});
	}, [activeCategory, enrolledCourses, programSearch]);

	const selectCategory = (category) => {
		setActiveCategory(category);
	};

	useEffect(() => {
		if (!profile?.username) return undefined;

		const welcomeText = String(profile.username);
		let timeoutId;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedUsername(welcomeText), 0);
			return () => window.clearTimeout(timeoutId);
		}

		let usernameIndex = 0;

		function startTyping() {
			setTypedUsername("");
			timeoutId = window.setTimeout(typeUsername, 65);
		}

		function typeUsername() {
			usernameIndex += 1;
			setTypedUsername(welcomeText.slice(0, usernameIndex));
			if (usernameIndex < welcomeText.length) {
				timeoutId = window.setTimeout(typeUsername, 65);
			}
		}

		timeoutId = window.setTimeout(startTyping, 120);
		return () => window.clearTimeout(timeoutId);
	}, [profile?.username]);

	useEffect(() => {
		if (!hasProfile) return undefined;

		let timeoutId;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			timeoutId = window.setTimeout(() => setTypedIntro(introText), 0);
			return () => window.clearTimeout(timeoutId);
		}

		let introIndex = PROGRAM_INTROS.indexOf(introText);
		let characterIndex = 0;

		function typeIntro() {
			const description = PROGRAM_INTROS[introIndex];
			characterIndex += 1;
			setTypedIntro(description.slice(0, characterIndex));
			if (characterIndex < description.length) {
				timeoutId = window.setTimeout(typeIntro, 18);
			} else {
				timeoutId = window.setTimeout(eraseIntro, 10000);
			}
		}

		function eraseIntro() {
			characterIndex -= 1;
			setTypedIntro(PROGRAM_INTROS[introIndex].slice(0, characterIndex));
			if (characterIndex > 0) {
				timeoutId = window.setTimeout(eraseIntro, 8);
			} else {
				introIndex = (introIndex + 1) % PROGRAM_INTROS.length;
				timeoutId = window.setTimeout(typeIntro, 120);
			}
		}

		timeoutId = window.setTimeout(typeIntro, 150);
		return () => window.clearTimeout(timeoutId);
	}, [introText, hasProfile]);

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) {
			navigate("/login", { replace: true });
			return;
		}
		/* Fetch the user's profile from the server using the access token. If the token is invalid or expired, redirect to login. */
		async function loadProfile() {
			try {
				const response = await fetch(`${API_URL}/auth/profile`, {
					headers: { Authorization: `Bearer ${accessToken}` },
				});

				if (!response.ok) {
					localStorage.removeItem("accessToken");
					navigate("/login", { replace: true });
					return;
				}

				setLoadedProfile(await response.json());
			} catch {
				setProfileError("We could not load your profile. Please try again.");
			}
		}

		loadProfile();
	}, [navigate]);



	if (!profile && !profileError) {
		return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#f8fafc] text-slate-600">Loading your profile...</main>;
	}

	if (profileError) {
		return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#f8fafc] text-slate-600">{profileError}</main>;
	}

	return (
		<main className="h-[calc(100vh-5rem)] w-full max-w-full overflow-x-hidden overflow-y-auto bg-[#f8fafc] px-5 py-10 sm:px-8 lg:px-16">
			<div className="mx-auto w-full min-w-0 max-w-7xl">
				<div className="fade-in-up mb-10 max-w-2xl">
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#087ff5]">MATEKK Training Academy</p>
						<h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">
							Welcome, <span className={typedUsername.length < String(profile.username).length ? "typewriter-caret" : ""}>{typedUsername}</span>
						</h1>
						<p className="mt-3 text-slate-600">
							<span className="typewriter-caret">{typedIntro}</span>
						</p>
					</div>
				</div>

				<div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-14">
					<aside className="fade-in-up lg:sticky lg:top-24 lg:self-start" style={{ "--fade-delay": 100 }}>
						<h2 className="mb-5 text-2xl font-bold text-slate-950">Category</h2>
						<nav
							className="flex max-h-56 w-full flex-col gap-0 overflow-y-auto overscroll-contain rounded-lg border border-slate-200 bg-slate-50 px-3 pb-1 touch-pan-y lg:max-h-none lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:block lg:space-y-1"
							aria-label="Course categories"
						>
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									onClick={() => selectCategory(category)}
									className={`min-h-12 w-full shrink-0 whitespace-nowrap rounded-md border-b px-3 py-2 text-left text-sm font-semibold transition-all duration-200 ease-out last:border-b-0 hover:scale-[1.02] hover:shadow-sm lg:block lg:w-full ${activeCategory === category ? "border-[#087ff5] bg-blue-50 text-[#087ff5]" : "border-slate-200 text-slate-700 hover:border-[#087ff5] hover:bg-[#087ff5] hover:text-white"}`}
								>
									{category}
								</button>
							))}
						</nav>
					</aside>

					<section className="min-w-0" aria-live="polite">
						<div className="mb-5 flex flex-wrap items-center justify-between gap-4">
							<p className="flex items-center gap-2 text-sm font-medium text-slate-500"><BookOpen size={17} /> {visibleCourses.length} programs</p>
							<div className="flex items-center gap-4">
								<span className="text-sm font-semibold text-slate-400">{activeCategory}</span>
								<label className="relative block">
									<Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
									<input
										type="search"
										value={programSearch}
										onChange={(event) => setProgramSearch(event.target.value)}
										placeholder="Search programs"
										aria-label="Search programs"
										className="h-10 w-44 rounded-md border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#1775EE] focus:ring-2 focus:ring-[#1775EE]/20 sm:w-52"
									/>
									{programSearch && (
										<button
											type="button"
											onClick={() => setProgramSearch("")}
											aria-label="Clear program search"
											className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
										>
											<X size={15} />
										</button>
									)}
								</label>
								<div role="group" aria-label="Program layout" className="flex items-center gap-2">
									<button
										type="button"
										onClick={() => setProgramLayout("grid")}
										aria-label="Grid view"
										aria-pressed={programLayout === "grid"}
										className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${programLayout === "grid" ? "border-[#1775EE] bg-[#1775EE] text-white" : "border-slate-200 bg-white text-slate-500 hover:border-[#1775EE] hover:text-[#1775EE]"}`}
									>
										<LayoutGrid size={19} />
									</button>
									<button
										type="button"
										onClick={() => setProgramLayout("list")}
										aria-label="List view"
										aria-pressed={programLayout === "list"}
										className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${programLayout === "list" ? "border-[#1775EE] bg-[#1775EE] text-white" : "border-slate-200 bg-white text-slate-500 hover:border-[#1775EE] hover:text-[#1775EE]"}`}
									>
										<List size={20} />
									</button>
								</div>
							</div>
						</div>
						<div className={programLayout === "grid" ? "grid min-w-0 gap-7 sm:grid-cols-2" : "flex min-w-0 flex-col gap-4"}>
							{visibleCourses.map((course, index) => (
								<article key={course.path} className={`fade-in-up-stagger group flex min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-[#1775EE] hover:shadow-xl ${programLayout === "grid" ? "min-h-[25rem] flex-col hover:-translate-y-1" : "flex-col sm:flex-row"}`} style={{ "--fade-delay": 150 + index * 75 }}>
									<div className={`flex shrink-0 items-center justify-center bg-slate-50 p-7 ${programLayout === "grid" ? "h-44" : "h-36 sm:h-auto sm:w-52"}`}>
										<img src={course.image} alt={`${course.name} certification`} className={`object-contain transition duration-300 group-hover:scale-105 ${programLayout === "grid" ? "h-full max-w-[13rem]" : "h-full max-h-28 max-w-[10rem]"}`} />
									</div>
									<div className={`flex min-w-0 flex-1 flex-col p-5 ${programLayout === "list" ? "sm:flex-row sm:items-center sm:gap-6" : ""}`}>
										<div className="min-w-0 flex-1">
										<p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1775EE]">{course.category}</p>
										<h3 className="break-words text-xl font-bold text-slate-950">{course.name}</h3>
										<p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
										</div>
										<Link to={getProgramPath(course)} className={`mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#1775EE] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1262c9] ${programLayout === "list" ? "sm:mt-0 sm:w-48 sm:shrink-0" : ""}`}>
											View Program <ArrowRight size={16} />
										</Link>
									</div>
								</article>
							))}
						</div>
						{visibleCourses.length === 0 && (
							<p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-sm text-slate-500">
								No programs match “{programSearch}”.
							</p>
						)}
					</section>
				</div>
			</div>
		</main>
	);
}
