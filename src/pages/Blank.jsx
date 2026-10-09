import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, CircleSlash, LayoutGrid, List, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
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
import CCNPCollaborationLogo from "../assets/CCNPCollaboration.png";
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
import PehLogo from "../assets/ejpt.svg"; // official eJPT badge (INE)
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
const PROGRAM_CACHE_KEY = "matekk-training-programs";

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
	"/training/cisco/ccnp/collaboration": CCNPCollaborationLogo,
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
	"/training/cybersecurity/peh": PehLogo,
	"/training/cloud/microsoft/azurefundamentals": AzureFundamentalsLogo,
	"/training/cloud/aws/practitioner": AwsLogo,
	"/training/cloud/aws/essentials": AwsEssentialsLogo,
	"/training/itil5/foundation": Itil5FoundationLogo,
	"/training/projectmanagement/pmp": PmpLogo,
};

const PROGRAM_DESCRIPTIONS = {
	"CCNA": "Build networking foundations in IP connectivity, network access, services, security, and automation.",
	"CCNA Automation": "Learn to automate Cisco networks with Python, APIs, programmable infrastructure, and modern development practices.",
	"CCNA Cybersecurity": "Develop skills in security monitoring, host and network analysis, threat detection, and incident response.",
	"CCNP Enterprise": "Advance your enterprise networking skills across routing, infrastructure, and network assurance.",
	"CCNP Security": "Build advanced skills for securing enterprise networks, managing access, and protecting infrastructure.",
	"CCNP Data Center": "Learn to design, operate, and troubleshoot data center networks and compute infrastructure.",
	"CCNP Collaboration": "Develop expertise in collaboration technologies, voice, video, and Cisco collaboration infrastructure.",
	"A+ (Core 1 & 2)": "Prepare for IT support work through hardware, operating systems, troubleshooting, and security fundamentals.",
	"Network+": "Strengthen your skills in network technologies, operations, security, and troubleshooting.",
	"Security+": "Learn the core security concepts used to protect systems, networks, and organizational data.",
	"CySA+": "Practice security monitoring, threat analysis, vulnerability management, and incident response.",
	"PenTest+": "Learn penetration testing methods, from planning and assessment to exploitation and reporting.",
	"Linux+": "Build practical Linux administration skills in system management, security, and troubleshooting.",
	"FortiOS": "Learn to configure and manage FortiGate security features with FortiOS.",
	"Secure Networking": "Build secure networking skills with Fortinet switching, wireless, and network security solutions.",
	"SASE": "Explore secure access service edge concepts, cloud-delivered security, and zero-trust connectivity.",
	"Cloud Security": "Learn to secure cloud environments, applications, and workloads with Fortinet solutions.",
	"Security Operations": "Develop security operations skills in monitoring, analysis, and response using Fortinet tools.",
	"Cybersecurity Expert": "Practice advanced cybersecurity engineering through hands-on Fortinet solution labs.",
	"Cybersecurity Apprentice": "Start learning cybersecurity fundamentals, common threats, and practical protection methods.",
	"Cybersecurity Practitioner": "Build practical cybersecurity skills for identifying threats and applying security controls.",
	"Network Security Professional": "Learn professional network security concepts for protecting enterprise infrastructure.",
	"Network Security Analyst": "Practice analyzing network activity, investigating alerts, and identifying security threats.",
	"Next-Generation Firewall Engineer": "Learn to deploy, configure, and troubleshoot next-generation firewall solutions.",
	"SD-WAN Engineer": "Build skills in secure SD-WAN design, deployment, and operations.",
	"Security Service Edge Engineer": "Learn to implement cloud-delivered security and secure service edge connectivity.",
	"Network Security Architect": "Develop architecture skills for designing resilient enterprise network security.",
	"Security Operations Professional": "Strengthen security operations through detection, investigation, and incident handling.",
	"XSIAM Analyst": "Learn to investigate security incidents and analyze threats with Cortex XSIAM.",
	"XDR Analyst": "Practice investigating alerts and correlating endpoint, network, and cloud security data with XDR.",
	"XSIAM Engineer": "Build engineering skills for deploying and managing Cortex XSIAM security operations.",
	"XDR Engineer": "Learn to configure and operate extended detection and response integrations and workflows.",
	"XSOAR Engineer": "Develop skills in security orchestration, automated playbooks, and incident response workflows.",
	"Cloud Security Professional": "Learn to protect cloud workloads, applications, and data with Palo Alto Networks security tools.",
	"Data Centre Foundation Certificate (DCFC)": "Explore data centre fundamentals, facilities, infrastructure, and operational practices.",
	"Certified Data Centre Professional (CDCP)": "Build the knowledge to operate and maintain reliable data centre facilities.",
	"Certified Data Centre Specialist (CDCS)": "Advance your expertise in data centre design, infrastructure, and operational resilience.",
	"Cyber Defense & Threat Hunting (SOC)": "Practice SOC workflows for detecting, investigating, and responding to cyber threats.",
	"Practical Ethical Hacking (VAPT)": "Learn hands-on ethical hacking techniques for assessing vulnerabilities and testing defenses.",
	"Azure Fundamentals": "Understand cloud concepts, Azure services, security, and core cloud management.",
	"Cloud Practitioner": "Learn AWS cloud fundamentals, core services, security, and cloud value propositions.",
	"Technical Essentials": "Get hands-on with core AWS services and the technical building blocks of cloud solutions.",
	"ITIL 5 Foundation": "Learn IT service management concepts, practices, and value-focused service delivery.",
	"Project Management Professional": "Build project leadership skills across planning, delivery, risk, and stakeholder management.",
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
				description: PROGRAM_DESCRIPTIONS[course.name]
					?? `Study ${course.name} through focused lessons, practical activities, and certification preparation.`,
			}));
	});
}

function getProgramPath(course) {
	if (course.name === "CCNA") return "/modules/programs/ccna";
	if (course.name === "A+ (Core 1 & 2)") return "/modules/programs/comptia-aplus";
	if (course.name === "CCNA Automation") return "/modules/programs/ccna-automation";
	if (course.name === "CCNA Cybersecurity") return "/modules/programs/ccna-cybersecurity";
	return course.path;
}

function readCachedPrograms() {
	try {
		const cachedPrograms = JSON.parse(localStorage.getItem(PROGRAM_CACHE_KEY) || "null");
		return Array.isArray(cachedPrograms) ? cachedPrograms : null;
	} catch {
		localStorage.removeItem(PROGRAM_CACHE_KEY);
		return null;
	}
}

/* Reads User's Profile to display enrolled courses */
export default function Blank() {
	const { profile: sessionProfile } = useAuth();
	const [activeCategory, setActiveCategory] = useState("All Programs");
	const [programLayout, setProgramLayout] = useState("grid");
	const [programSearch, setProgramSearch] = useState("");
	const [databasePrograms, setDatabasePrograms] = useState(readCachedPrograms);
	const [programsError, setProgramsError] = useState("");
	const profile = sessionProfile;
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
		const databaseNames = new Set(
			(databasePrograms ?? []).flatMap((program) => [
				program.name,
				...(program.modules ?? []).map((module) => module.name),
			]).map((name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "")),
		);
		const courseAliases = {
			"A+ (Core 1 & 2)": ["A+"],
			"CCNA Cybersecurity": ["CCNA Security"],
			"CCNP Enterprise": ["CCNP Enterprise Core"],
			FortiOS: ["FortiGate Administrator"],
			"Secure Networking": ["FortiGate Security"],
		};
		return enrolledCourses
			.filter((course) => {
			const matchesCategory = activeCategory === "All Programs" || course.category === activeCategory;
			const matchesSearch = !normalizedSearch || `${course.name} ${course.category} ${course.description}`
				.toLowerCase()
				.includes(normalizedSearch);
				return matchesCategory && matchesSearch;
			})
			.map((course) => {
				const courseNames = [course.name, ...(courseAliases[course.name] ?? [])]
					.map((name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, ""));
				return {
					...course,
					isInDatabase: databaseNames.size > 0 && courseNames.some((name) => databaseNames.has(name)),
				};
			});
	}, [activeCategory, databasePrograms, enrolledCourses, programSearch]);

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
		const controller = new AbortController();
		fetch(`${API_URL}/auth/programs`, { signal: controller.signal })
			.then(async (response) => {
				if (!response.ok) {
					throw new Error(`Program catalog request failed with status ${response.status}.`);
				}
				const programs = await response.json();
				if (!Array.isArray(programs)) {
					throw new Error("Program catalog response was not a list.");
				}
				setDatabasePrograms(programs);
				localStorage.setItem(PROGRAM_CACHE_KEY, JSON.stringify(programs));
				setProgramsError("");
			})
			.catch((error) => {
				if (error.name === "AbortError") return;
				console.error("Unable to load the program catalog from the database.", error);
				setProgramsError("Program availability could not be checked. Please refresh to try again.");
			});
		return () => controller.abort();
	}, []);



	if (!profile) {
		return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-[#f8fafc] text-slate-600">Loading your profile...</main>;
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
					<aside className="fade-in-up hidden lg:sticky lg:top-24 lg:block lg:self-start" style={{ "--fade-delay": 100 }}>
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
						<div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between sm:gap-4">
							<label className="col-span-2 block sm:hidden">
								<span className="sr-only">Filter by category</span>
								<select
									value={activeCategory}
									onChange={(event) => selectCategory(event.target.value)}
									aria-label="Filter programs by category"
									className="h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-[#1775EE] focus:ring-2 focus:ring-[#1775EE]/20"
								>
									{categories.map((category) => <option key={category} value={category}>{category}</option>)}
								</select>
							</label>
							<p className="flex min-w-0 items-center gap-2 text-sm font-medium text-slate-500"><BookOpen size={17} className="shrink-0" /> {visibleCourses.length} programs</p>
							<div role="group" aria-label="Program layout" className="col-start-2 row-start-2 flex items-center justify-end gap-2 sm:order-3 sm:ml-auto">
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
							<div className="col-span-2 row-start-3 flex min-w-0 items-center gap-3 sm:order-2 sm:ml-auto sm:w-auto">
								<span className="hidden text-sm font-semibold text-slate-400 sm:block">{activeCategory}</span>
								<label className="relative block min-w-0 flex-1 sm:w-52 sm:flex-none">
									<Search size={17} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
									<input
										type="search"
										value={programSearch}
										onChange={(event) => setProgramSearch(event.target.value)}
										placeholder="Search programs"
										aria-label="Search programs"
										className="h-11 w-full rounded-md border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#1775EE] focus:ring-2 focus:ring-[#1775EE]/20 sm:h-10"
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
							</div>
						</div>
						<div className={programLayout === "grid" ? "grid min-w-0 gap-7 sm:grid-cols-2" : "flex min-w-0 flex-col gap-4"}>
							{programsError && (
								<p role="alert" className="col-span-full rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-900">
									{programsError}
								</p>
							)}
							{visibleCourses.map((course, index) => (
								<article key={course.path} className={`fade-in-up-stagger group flex min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:border-[#1775EE] hover:shadow-xl ${programLayout === "grid" ? "min-h-[25rem] flex-col hover:-translate-y-1" : "flex-row"}`} style={{ "--fade-delay": 150 + index * 75 }}>
									<div className={`flex shrink-0 items-center justify-center overflow-hidden bg-slate-50 ${programLayout === "grid" ? "h-44 p-7" : "w-24 p-3 sm:h-auto sm:w-52 sm:p-7"}`}>
										<img src={course.image} alt={`${course.name} certification`} className={`object-contain transition duration-300 group-hover:scale-105 ${programLayout === "grid" ? "h-full max-w-[13rem]" : "h-16 w-16 sm:h-28 sm:w-40"}`} />
									</div>
									<div className={`flex min-w-0 flex-1 flex-col ${programLayout === "list" ? "p-3 sm:flex-row sm:items-center sm:gap-6 sm:p-5" : "p-5"}`}>
										<div className="min-w-0 flex-1">
										<p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#1775EE]">{course.category}</p>
										<h3 className="break-words text-xl font-bold text-slate-950">{course.name}</h3>
										<p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
										</div>
										{course.isInDatabase && getProgramPath(course) ? (
											<Link to={getProgramPath(course)} className={`mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#1775EE] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1262c9] ${programLayout === "list" ? "sm:mt-0 sm:w-48 sm:shrink-0" : ""}`}>
												View Program <ArrowRight size={16} />
											</Link>
										) : (
											<div className={`group/program relative mt-5 ${programLayout === "list" ? "sm:mt-0 sm:w-48 sm:shrink-0" : ""}`}>
												<button
													type="button"
													disabled
													title={programsError ? "Program availability unknown" : "Coming soon"}
													aria-label={`${course.name} ${programsError ? "availability could not be checked" : "program coming soon"}`}
													className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-[#1775EE] px-4 py-2.5 text-sm font-semibold text-white opacity-45"
												>
													<CircleSlash size={16} />
													View Program <ArrowRight size={16} />
												</button>
												<span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover/program:opacity-100 group-focus-within/program:opacity-100">
													{programsError ? "Availability unavailable" : !databasePrograms ? "Checking availability..." : "Coming soon"}
												</span>
											</div>
										)}
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
