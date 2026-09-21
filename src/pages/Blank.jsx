import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
				image: categoryLogos[category.name],
				description: `Explore the ${course.name} program and develop industry-ready skills with MATEKK Cybercore Technologies.`,
			}));
	});
}
/* Reads User's Profile to display enrolled courses */
export default function Blank() {
	const navigate = useNavigate();
	const { profile: sessionProfile } = useAuth();
	const [activeCategory, setActiveCategory] = useState("All Programs");
	const [loadedProfile, setLoadedProfile] = useState(null);
	const [profileError, setProfileError] = useState("");
	const profile = sessionProfile ?? loadedProfile;
	const enrolledCourses = useMemo(
		() => getCoursesForEnrollment([profile?.module_enrolled, profile?.course_enrolled]),
		[profile?.module_enrolled, profile?.course_enrolled],
	);
	const categories = ["All Programs", ...new Set(enrolledCourses.map((course) => course.category))];
	const visibleCourses = useMemo(() => {
		if (activeCategory === "All Programs") return enrolledCourses;
		return enrolledCourses.filter((course) => course.category === activeCategory);
	}, [activeCategory, enrolledCourses]);

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		if (!accessToken) {
			navigate("/login", { replace: true });
			return;
		}
		/* Fetch the user's profile from the server using the access token. If the token is invalid or expired, redirect to login. */
		async function loadProfile() {
			try {
				const response = await fetch("http://localhost:3000/auth/profile", {
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
		<main className="h-[calc(100vh-5rem)] overflow-y-auto bg-[#f8fafc] px-5 py-10 sm:px-8 lg:px-16">
			<div className="mx-auto max-w-7xl">
				<div className="mb-10 max-w-2xl">
					<div>
						<p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#087ff5]">MATEKK Training Academy</p>
						<h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">Welcome, {profile.username}</h1>
						<p className="mt-3 text-slate-600">Explore practical ICT training programs designed to help you grow with confidence.</p>
					</div>
				</div>

				<div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-14">
					<aside className="lg:sticky lg:top-24 lg:self-start">
						<h2 className="mb-5 text-2xl font-bold text-slate-950">Category</h2>
						<nav className="flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1" aria-label="Course categories">
							{categories.map((category) => (
								<button
									key={category}
									type="button"
									onClick={() => setActiveCategory(category)}
									className={`whitespace-nowrap border-b px-3 py-2 text-left text-sm font-semibold transition-colors lg:block lg:w-full ${activeCategory === category ? "border-[#087ff5] bg-blue-50 text-[#087ff5]" : "border-slate-200 text-slate-700 hover:border-[#087ff5] hover:bg-[#087ff5] hover:text-white"}`}
								>
									{category}
								</button>
							))}
						</nav>
					</aside>

					<section aria-live="polite">
						<div className="mb-5 flex items-center justify-between gap-4">
							<p className="flex items-center gap-2 text-sm font-medium text-slate-500"><BookOpen size={17} /> {visibleCourses.length} programs</p>
							<span className="text-sm font-semibold text-slate-400">{activeCategory}</span>
						</div>
						<div className="grid gap-7 sm:grid-cols-2">
							{visibleCourses.map((course) => (
								<article key={course.path} className="group flex min-h-[25rem] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
									<div className="flex h-44 items-center justify-center bg-slate-50 p-7">
										<img src={course.image} alt={`${course.name} certification`} className="h-full max-w-[13rem] object-contain transition duration-300 group-hover:scale-105" />
									</div>
									<div className="flex flex-1 flex-col p-5">
										<p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-[#087ff5]">{course.category}</p>
										<h3 className="text-xl font-bold text-slate-950">{course.name}</h3>
										<p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{course.description}</p>
										<Link to={course.path} className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-[#087ff5] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0062e0]">
											View Program <ArrowRight size={16} />
										</Link>
									</div>
								</article>
							))}
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}
