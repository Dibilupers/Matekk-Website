import { useState } from "react";
import { ArrowRight, BookOpen, ChevronDown, ChevronRight, Clock3, Laptop, ShieldCheck, Wrench } from "lucide-react";
import APlusBadge from "../../../../../assets/aplus.webp";

const modules = [
	{
		title: "Core 1: Mobile Devices",
		description: "Device components, accessories, connectivity, and mobile troubleshooting.",
	},
	{
		title: "Core 1: Networking",
		description: "Network protocols, SOHO networks, wireless technologies, and networking tools.",
	},
	{
		title: "Core 1: Hardware",
		description: "PC components, peripherals, connectors, power, and hardware installation.",
	},
	{
		title: "Core 1: Virtualization and Cloud Computing",
		description: "Virtual machines, hypervisors, cloud models, and desktop virtualization.",
	},
	{
		title: "Core 1: Hardware and Network Troubleshooting",
		description: "A systematic approach to diagnosing hardware, network, and connectivity issues.",
	},
	{
		title: "Core 2: Operating Systems",
		description: "Operating system installation, configuration, tools, filesystems, and updates.",
	},
	{
		title: "Core 2: Security",
		description: "Endpoint protection, access controls, malware prevention, and security practices.",
	},
	{
		title: "Core 2: Software Troubleshooting",
		description: "Troubleshooting operating systems, applications, mobile devices, and security issues.",
	},
	{
		title: "Core 2: Operational Procedures",
		description: "Documentation, safety, communication, backups, and recovery procedures.",
	},
];

const focusAreas = [
	{ title: "IT hardware", icon: <Laptop size={19} /> },
	{ title: "Troubleshooting", icon: <Wrench size={19} /> },
	{ title: "Security essentials", icon: <ShieldCheck size={19} /> },
];

function ModuleCard({ module, index }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<article className="overflow-hidden rounded-[18px] border border-[#ead7dc] bg-white transition-[box-shadow,border-color] duration-200 hover:border-[#c8102e]/50 hover:shadow-[0_10px_24px_rgba(200,16,46,0.08)]">
			<button
				type="button"
				onClick={() => setIsOpen((open) => !open)}
				aria-expanded={isOpen}
				className="flex min-h-[88px] w-full items-center gap-4 px-5 py-4 text-left sm:px-6"
			>
				<span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#f0cbd3] bg-[#fff1f3] text-base font-bold text-[#c8102e]">
					{index + 1}
				</span>
				<span className="min-w-0 flex-1">
					<strong className="block text-base text-[#111a2d] sm:text-[17px]">{module.title}</strong>
					<span className="mt-1 block text-sm text-[#8a96aa]">Course module</span>
				</span>
				{isOpen
					? <ChevronDown className="shrink-0 text-[#c8102e]" size={19} />
					: <ChevronRight className="shrink-0 text-[#91a0b9]" size={19} />}
			</button>
			{isOpen && (
				<p className="border-t border-[#f2e3e6] px-6 py-4 text-sm leading-6 text-[#66738d] sm:pl-[83px]">
					{module.description}
				</p>
			)}
		</article>
	);
}

export default function AplusDashboard() {
	return (
		<main className="min-h-screen bg-white text-[#111827]">
			<section className="mx-auto max-w-[1440px] px-6 pb-14 pt-12 sm:px-10 lg:px-14 lg:pb-16 lg:pt-16">
				<div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
					<div>
						<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f0cbd3] bg-[#fff5f6] px-4 py-2 text-sm font-semibold text-[#b20d29]">
							<span className="h-2 w-2 rounded-full bg-[#c8102e]" />
							CompTIA · A+ Core 1 and Core 2
						</div>
						<h1 className="max-w-[700px] text-[2.65rem] font-bold leading-[1.08] tracking-[-1.5px] sm:text-6xl lg:text-[3.25rem] xl:text-[3.7rem]">
							Build your foundation for <span className="text-[#c8102e]">IT support.</span>
						</h1>
						<p className="mt-6 min-h-16 max-w-[555px] text-base leading-[1.8] text-[#66738d] sm:text-lg">
							Explore the CompTIA A+ learning path across hardware, operating systems, networking, troubleshooting, and security.
						</p>
						<a href="#program-content" className="mt-8 inline-flex h-[54px] items-center gap-2 rounded-full bg-[#c8102e] px-7 text-base font-bold text-white shadow-[0_10px_20px_rgba(200,16,46,0.16)] transition hover:-translate-y-0.5 hover:bg-[#a80e27] hover:shadow-[0_14px_26px_rgba(200,16,46,0.22)]">
							Explore course modules <ArrowRight size={18} />
						</a>
						<div className="mt-10 flex flex-wrap gap-6 divide-x divide-[#f0dfe3]">
							<div className="flex items-center gap-3">
								<strong className="text-3xl leading-none text-[#111827]">9</strong>
								<span className="max-w-20 text-xs leading-tight text-[#6f7d99] sm:text-sm">Course modules</span>
							</div>
							<div className="flex items-center gap-3 pl-6">
								<strong className="text-3xl leading-none text-[#111827]">2</strong>
								<span className="max-w-20 text-xs leading-tight text-[#6f7d99] sm:text-sm">Certification cores</span>
							</div>
						</div>
					</div>

					<div className="relative mx-auto flex h-[300px] w-full max-w-[440px] items-center justify-center sm:h-[360px] sm:max-w-[470px]">
						<div aria-hidden="true" className="absolute h-[255px] w-[255px] rounded-full bg-[#fff0f2] sm:h-[330px] sm:w-[330px]" />
						<img src={APlusBadge} alt="CompTIA A+ certification badge" className="relative z-10 h-[210px] w-[210px] object-contain sm:h-[270px] sm:w-[270px]" />
						<div className="absolute left-0 top-[25%] z-20 rounded-xl border border-[#f1e2e5] bg-white px-4 py-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:left-[-4px]">
							<strong className="text-sm text-[#c8102e]">Core 1</strong>
							<span className="mt-1 block text-xs text-[#64708a]">Hardware and devices</span>
						</div>
						<div className="absolute bottom-[16%] right-0 z-20 rounded-xl border border-[#f1e2e5] bg-white px-4 py-3 shadow-[0_14px_28px_rgba(15,35,75,0.1)] sm:right-[-2%]">
							<strong className="text-sm text-[#c8102e]">Core 2</strong>
							<span className="mt-1 block text-xs text-[#64708a]">Operating systems and security</span>
						</div>
					</div>
				</div>
			</section>

			<div className="bg-[#fff1f3] py-10 text-center sm:py-12">
				<p className="mx-auto max-w-4xl px-6 text-xl font-bold tracking-tight text-[#111827] sm:text-2xl">
					Build practical skills for supporting devices, users, and everyday IT environments.
				</p>
			</div>

			<section id="program-content" className="scroll-mt-8 bg-[#fff9fa]">
				<div className="mx-auto grid max-w-[1440px] gap-8 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_330px] lg:px-14 lg:py-14">
					<div>
						<div className="mb-6 flex flex-wrap items-center justify-between gap-2">
							<h2 className="text-xl font-bold text-[#111827] sm:text-[21px]">Course modules</h2>
							<span className="text-sm text-[#7c89a1]">9 modules · A+ Core 1 and Core 2</span>
						</div>
						<div className="space-y-3">
							{modules.map((module, index) => (
								<ModuleCard key={module.title} module={module} index={index} />
							))}
						</div>
					</div>

					<aside className="space-y-5">
						<div className="rounded-[18px] border border-[#ead7dc] bg-white p-6">
							<div className="mb-4 flex items-center gap-3">
								<BookOpen className="text-[#c8102e]" size={21} />
								<h2 className="text-xl font-bold text-[#111827]">Program Overview</h2>
							</div>
							<p className="text-sm leading-6 text-[#7c89a1]">
								A guided outline of the major topics covered in the CompTIA A+ certification.
							</p>
							<h3 className="mb-3 mt-5 text-xs font-bold uppercase tracking-wide text-[#7c89a1]">Learning focus</h3>
							<ul className="space-y-3">
								{focusAreas.map((area) => (
									<li key={area.title} className="flex items-center gap-3 text-sm font-medium text-[#334454]">
										<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#fff1f3] text-[#c8102e]">{area.icon}</span>
										{area.title}
									</li>
								))}
							</ul>
							<p className="mt-5 flex items-center gap-2 border-t border-[#f2e3e6] pt-4 text-xs text-[#7c89a1]">
								<Clock3 size={15} className="text-[#c8102e]" /> Course materials and activities can be added here.
							</p>
						</div>
					</aside>
				</div>
			</section>
		</main>
	);
}
