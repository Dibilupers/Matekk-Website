import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Circle, Download, Eye, Lightbulb, Maximize2, RotateCcw, X, XCircle, ZoomIn, ZoomOut } from "lucide-react";
import { PRACTICE_LABS } from "./labs/labDefinitions";
import { canReach, configCommands, createLabState, execute, fullIfName, promptFor } from "./labs/labEngine";
import LabTopology from "./labs/LabTopology";

/* ==========================================================================
   CCNA Online Practice Labs — three labs of increasing difficulty.
   Students type real Cisco IOS commands; tasks are checked live (or on
   Submit in exam mode). Each lab can also be built in Cisco Packet Tracer.
   ========================================================================== */

const PACKET_TRACER_URL = "https://www.netacad.com/resources/lab-downloads";
const LEVEL_STYLE = {
	Beginner: "bg-green-100 text-green-800",
	Intermediate: "bg-amber-100 text-amber-800",
	Advanced: "bg-red-100 text-red-800",
};

const welcome = (name) => [
	`Cisco IOS Software, ISR Software (Practice Simulator) — ${name}`,
	"Type ? at any prompt to see the available commands.",
	"",
	"Press RETURN to get started!",
	"",
];

function freshConsoles(lab) {
	return Object.fromEntries(lab.editable.map((n) => [n, { lines: welcome(n), history: [] }]));
}

// ---------- Packet Tracer section ----------
function buildGuideText(lab) {
	const lines = [
		"MATEKK Cybercore Academy — CCNA Practice Lab " + lab.id + " (" + lab.level + ")",
		lab.title,
		"Packet Tracer build guide (Packet Tracer 8.2 or newer)",
		"=".repeat(70),
		"",
		"DEVICES: " + lab.ptDevices,
		"",
		"CABLING",
		"-------",
		...lab.links.map((l) => {
			const [ad, ai] = l.a.split(":");
			const [bd, bi] = l.b.split(":");
			return `  ${ad} ${fullIfName(ai)}  <->  ${bd} ${fullIfName(bi)}   (${l.net})`;
		}),
		"",
		"PRE-CONFIGURATION (enter these on each device before you start)",
		"---------------------------------------------------------------",
	];
	const start = createLabState(lab);
	for (const [name, d] of Object.entries(lab.devices)) {
		lines.push("", `[${name}]${d.kind === "pc" ? "  (Desktop > IP Configuration)" : ""}`);
		lines.push(...configCommands(start.devices[name]).map((c) => "  " + c));
	}
	lines.push("", "YOUR TASKS", "----------", ...lab.tasks.map((t, i) => `${i + 1}. ${t.text}`));
	lines.push("", "FINAL CHECK", "-----------", `  ${lab.finalCheck.label}`, "", "Tip: practise the same tasks online first in the MATEKK CCNA Practice Lab.");
	return lines.join("\n");
}

function PacketTracerSection({ lab }) {
	const pktFile = `/downloads/ccna-lab${lab.id}.pkt`;
	const [pktReady, setPktReady] = useState(false);
	const [showSteps, setShowSteps] = useState(false);
	const guide = useMemo(() => buildGuideText(lab), [lab]);
	const guideUrl = useMemo(() => URL.createObjectURL(new Blob([guide], { type: "text/plain" })), [guide]);
	useEffect(() => () => URL.revokeObjectURL(guideUrl), [guideUrl]);

	// The .pkt download appears automatically once the file is added to public/downloads
	useEffect(() => {
		let alive = true;
		fetch(pktFile, { method: "HEAD" })
			.then((r) => alive && setPktReady(r.ok && !(r.headers.get("content-type") || "").includes("text/html")))
			.catch(() => {});
		return () => {
			alive = false;
		};
	}, [pktFile]);

	return (
		<section className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-5">
			<div className="flex flex-col gap-1">
				<h5>Practice This Lab in Cisco Packet Tracer</h5>
				<p className="max-w-3xl">
					Prefer the real thing? This lab can also be built in Cisco Packet Tracer, Cisco&apos;s free
					network simulator. The setup guide lists every device, cable, address, and the starting
					configuration, so you can build it in a few minutes.
				</p>
			</div>
			<div className="flex flex-wrap gap-3">
				{pktReady && (
					<a href={pktFile} download className="inline-flex items-center gap-2 w-fit rounded-full bg-[#1775EE] text-white px-5 py-3 hover:bg-[#0062E0] transition shadow-lg">
						<Download className="w-4 h-4" /> Download Lab File (.pkt)
					</a>
				)}
				<a
					href={guideUrl}
					download={`ccna-lab${lab.id}-setup-guide.txt`}
					className={`inline-flex items-center gap-2 w-fit rounded-full px-5 py-3 transition ${pktReady ? "border border-[#1775EE] text-[#1775EE] hover:bg-[#1775EE] hover:text-white" : "bg-[#1775EE] text-white hover:bg-[#0062E0] shadow-lg"}`}
				>
					<Download className="w-4 h-4" /> Download Lab Setup Guide
				</a>
				<button type="button" onClick={() => setShowSteps((v) => !v)} className="inline-flex items-center gap-2 w-fit rounded-full border border-[#1775EE] text-[#1775EE] px-5 py-3 hover:bg-[#1775EE] hover:text-white transition">
					{showSteps ? "Hide build steps" : "Show build steps"}
				</button>
				<a href={PACKET_TRACER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 w-fit rounded-full border border-[#1775EE] text-[#1775EE] px-5 py-3 hover:bg-[#1775EE] hover:text-white transition">
					Get Packet Tracer
				</a>
			</div>
			{showSteps && <pre className="rounded-xl bg-[#0f1b2d] text-[#e2e8f0] p-4 text-xs leading-5 overflow-auto max-h-[28rem] whitespace-pre-wrap">{guide}</pre>}
			<p className="text-xs text-gray-600">
				Packet Tracer is free from Cisco Networking Academy (sign in with a free NetAcad account, then choose the installer for
				Windows, macOS, or Ubuntu).
			</p>
		</section>
	);
}

// ---------- full-screen topology ----------
const ZOOM_STEPS = [1, 1.5, 2, 3];

// Rendered into <body> so the dashboard's page animation (a CSS transform) can't trap the fixed overlay.
function TopologyFullscreen({ lab, state, device, onClose }) {
	// Phones start zoomed in: the whole diagram at 100% is too small to read in portrait
	const [zoomIndex, setZoomIndex] = useState(() => (window.innerWidth < 640 ? 2 : 0));
	const zoom = ZOOM_STEPS[zoomIndex];

	useEffect(() => {
		const onKey = (e) => { if (e.key === "Escape") onClose(); };
		const prevOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prevOverflow;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);

	const btn = "flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#17233d] shadow border border-[#d6e0ee] disabled:opacity-40";
	return createPortal(
		<div role="dialog" aria-modal="true" aria-label={`Topology: ${lab.title}`} className="topology-zoom-in fixed inset-0 z-1000 flex flex-col bg-[#f4f8fd]">
			<div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[#d6e0ee] bg-white">
				<p className="font-bold text-[#17233d] truncate">Lab {lab.id} topology</p>
				<div className="flex items-center gap-2 shrink-0">
					<button type="button" className={btn} onClick={() => setZoomIndex((i) => Math.max(0, i - 1))} disabled={zoomIndex === 0} aria-label="Zoom out"><ZoomOut size={18} /></button>
					<span className="w-12 text-center text-sm font-semibold text-[#17233d]">{Math.round(zoom * 100)}%</span>
					<button type="button" className={btn} onClick={() => setZoomIndex((i) => Math.min(ZOOM_STEPS.length - 1, i + 1))} disabled={zoomIndex === ZOOM_STEPS.length - 1} aria-label="Zoom in"><ZoomIn size={18} /></button>
					<button type="button" className={`${btn} ml-2`} onClick={onClose} aria-label="Close full screen"><X size={20} /></button>
				</div>
			</div>
			{/* Scrolls in both directions when zoomed in */}
			<div className="flex-1 overflow-auto">
				<div className="flex min-h-full items-center justify-center p-4" style={{ width: `${zoom * 100}%`, minWidth: "100%" }}>
					<div className="w-full max-h-full rounded-2xl bg-white p-3 shadow-sm" style={{ maxWidth: zoom === 1 ? "min(100%, calc((100vh - 7rem) * 1.9))" : "none" }}>
						<LabTopology lab={lab} state={state} activeDevice={device} />
					</div>
				</div>
			</div>
			<p className="px-4 py-2 text-center text-xs text-gray-600 bg-white border-t border-[#d6e0ee]">Use + / − to zoom, drag or scroll to move around. Tip: turn your phone sideways for a bigger view.</p>
		</div>,
		document.body,
	);
}

// ---------- page ----------
function LabWorkspace({ lab, selectLab, fromDashboard }) {

	const [state, setState] = useState(() => createLabState(lab));
	const [consoles, setConsoles] = useState(() => freshConsoles(lab));
	const [device, setDevice] = useState(lab.editable[0]);
	const [achieved, setAchieved] = useState({});
	const [input, setInput] = useState("");
	const [histPos, setHistPos] = useState(-1);
	const [showHints, setShowHints] = useState(false);
	const [showSolution, setShowSolution] = useState(false);
	const [examMode, setExamMode] = useState(false);
	const [topologyOpen, setTopologyOpen] = useState(false);
	const closeTopology = useCallback(() => setTopologyOpen(false), []);
	const [submitted, setSubmitted] = useState(false);
	const termRef = useRef(null);
	const inputRef = useRef(null);


	const liveStatus = useMemo(() => {
		const s = {};
		for (const t of lab.tasks) s[t.id] = Boolean(t.check(state, lab)) && (!t.requires || achieved[t.requires] || s[t.requires]);
		return s;
	}, [lab, state, achieved]);
	const status = useMemo(() => {
		const s = { ...liveStatus };
		for (const t of lab.tasks) if (t.sticky && achieved[t.id]) s[t.id] = true;
		return s;
	}, [lab, liveStatus, achieved]);


	const doneCount = Object.values(status).filter(Boolean).length;
	const allDone = doneCount === lab.tasks.length;
	const showResults = !examMode || submitted;
	const finalOk = canReach(lab, state, lab.finalCheck.from, lab.finalCheck.to);
	const con = consoles[device];

	useEffect(() => {
		if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
	}, [con.lines]);

	function submit(e) {
		e.preventDefault();
		const prompt = promptFor(state, device);
		const res = execute(lab, state, device, input);
		setState(res.state);
		// Remember "sticky" tasks (e.g. failover tested) once they have been achieved
		const newly = lab.tasks.filter((t) => t.sticky && !achieved[t.id] && t.check(res.state, lab));
		if (newly.length) setAchieved((a) => ({ ...a, ...Object.fromEntries(newly.map((t) => [t.id, true])) }));
		setConsoles((c) => ({
			...c,
			[device]: { lines: [...c[device].lines, `${prompt}${input}`, ...res.out], history: input.trim() ? [...c[device].history, input] : c[device].history },
		}));
		setHistPos(-1);
		setInput("");
	}

	function onKeyDown(e) {
		const history = con.history;
		if (e.key === "ArrowUp" && history.length) {
			e.preventDefault();
			const pos = histPos === -1 ? history.length - 1 : Math.max(0, histPos - 1);
			setHistPos(pos);
			setInput(history[pos]);
		} else if (e.key === "ArrowDown" && histPos !== -1) {
			e.preventDefault();
			const pos = histPos + 1;
			if (pos >= history.length) {
				setHistPos(-1);
				setInput("");
			} else {
				setHistPos(pos);
				setInput(history[pos]);
			}
		}
	}

	function reset() {
		setState(createLabState(lab));
		setConsoles(freshConsoles(lab));
		setDevice(lab.editable[0]);
		setAchieved({});
		setInput("");
		setShowSolution(false);
		setSubmitted(false);
		inputRef.current?.focus();
	}

	return (
		<main className={`flex flex-col mx-[2.063rem] md:mx-16 xl:mx-[7.438rem] py-10 gap-8 ${fromDashboard ? "ccna-page-enter ccna-lab-theme" : ""}`}>
			{/* Header + lab picker */}
			<section className="flex flex-col gap-4">
				{fromDashboard && (
					<Link to="/modules/programs/ccna" className="w-fit text-sm text-[#1775EE] underline underline-offset-4">
						&larr; Back to your CCNA dashboard
					</Link>
				)}
				<h6 className="w-fit px-4 py-2 text-[#1775EE] bg-blue-50 rounded-full">CCNA Practice Labs</h6>
				<h3>
					Hands-on <span className="text-[#1775EE]">Router Labs</span>
				</h3>
				<p className="max-w-3xl">
					Practice real Cisco IOS commands in your browser. Pick a lab, configure the routers in the console,
					and watch the network come to life. Cisco shortcuts such as <code>conf t</code>, <code>int g0/0</code>, and <code>sh ip route</code> work too.
				</p>
				<div className="grid gap-3 md:grid-cols-3">
					{PRACTICE_LABS.map((l) => (
						<button
							key={l.id}
							type="button"
							onClick={() => selectLab(l.id)}
							aria-pressed={l.id === lab.id}
							className={`text-left p-4 rounded-2xl border-2 transition hover:-translate-y-0.5 ${l.id === lab.id ? "border-[#1775EE] bg-white shadow-md" : "border-transparent bg-[#EBF5FD]"}`}
						>
							<span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_STYLE[l.level]}`}>Lab {l.id} · {l.level}</span>
							<span className="block mt-2 font-bold text-[#17233d]">{l.title}</span>
							<span className="block mt-1 text-sm text-gray-600">{l.summary}</span>
						</button>
					))}
				</div>
			</section>

			{/* Network diagram (full width) */}
			<div className="p-5 rounded-2xl bg-[#EBF5FD]">
				<div className="flex items-center justify-between mb-2">
					<h5 className="text-[#1775EE]">Topology</h5>
					<div className="flex items-center gap-2">
						<span className={`text-xs font-bold px-2.5 py-1 rounded-full ${LEVEL_STYLE[lab.level]}`}>{lab.level}</span>
						<button
							type="button"
							onClick={() => setTopologyOpen(true)}
							className="flex items-center gap-1.5 rounded-full border border-[#1775EE] bg-white px-3 py-1 text-xs font-bold text-[#1775EE] hover:bg-[#1775EE] hover:text-white transition"
						>
							<Maximize2 size={14} /> Expand
						</button>
					</div>
				</div>
				<button
					type="button"
					onClick={() => setTopologyOpen(true)}
					className="block mx-auto w-full max-w-4xl cursor-zoom-in"
					aria-label="Open the topology full screen"
				>
					<LabTopology lab={lab} state={state} activeDevice={device} />
				</button>
				{topologyOpen && <TopologyFullscreen lab={lab} state={state} device={device} onClose={closeTopology} />}
				<p className="text-xs text-gray-600 mt-1">Green links are up; red dashed links are down. The router you are configuring is circled.</p>
			</div>

			<div className="grid gap-6 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] items-start lg:items-stretch">
				{/* Left: tasks */}
				<aside className="flex flex-col gap-4">

					<div className="p-5 rounded-2xl bg-[#EBF5FD] flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<h5 className="text-[#1775EE]">Tasks</h5>
							{showResults && <span className="text-sm font-semibold">{doneCount}/{lab.tasks.length} done</span>}
						</div>
						{showResults && (
							<div className="h-2 rounded-full bg-white overflow-hidden">
								<div className="h-full bg-[#1775EE] transition-all duration-500" style={{ width: `${(doneCount / lab.tasks.length) * 100}%` }} />
							</div>
						)}
						<ol className="flex flex-col gap-3">
							{lab.tasks.map((task, i) => (
								<li key={task.id} className="flex gap-2 text-sm">
									{!showResults ? (
										<Circle className="w-5 h-5 text-gray-400 shrink-0" />
									) : status[task.id] ? (
										<CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
									) : submitted ? (
										<XCircle className="w-5 h-5 text-red-500 shrink-0" />
									) : (
										<Circle className="w-5 h-5 text-gray-400 shrink-0" />
									)}
									<div>
										<p className={showResults && status[task.id] ? "text-green-700" : ""}>
											<strong>{i + 1}.</strong> {task.text}
										</p>
										{showHints && !(showResults && status[task.id]) && <p className="text-xs text-gray-600 mt-1">Hint: {task.hint}</p>}
									</div>
								</li>
							))}
						</ol>
						{showResults && allDone && (
							<p className="rounded-xl bg-green-100 text-green-800 p-3 text-sm font-semibold">
								Lab complete! {finalOk ? `✔ ${lab.finalCheck.label}.` : ""}
								{lab.id < PRACTICE_LABS.length && (
									<button type="button" onClick={() => selectLab(lab.id + 1)} className="block mt-2 underline underline-offset-4">
										Next: Lab {lab.id + 1} →
									</button>
								)}
							</p>
						)}
						{examMode && submitted && !allDone && (
							<p className="rounded-xl bg-red-50 text-red-700 p-3 text-sm font-semibold">
								{doneCount} of {lab.tasks.length} tasks correct. Fix the red ones and submit again.
							</p>
						)}
						<label className="flex items-center gap-2 text-sm cursor-pointer select-none">
							<input
								type="checkbox"
								checked={examMode}
								onChange={(e) => {
									setExamMode(e.target.checked);
									setSubmitted(false);
								}}
							/>
							Exam mode (hide checkmarks until I submit)
						</label>
						<div className="flex flex-wrap gap-2 pt-1">
							{examMode && (
								<button type="button" onClick={() => setSubmitted(true)} className="inline-flex items-center gap-1.5 rounded-full bg-[#1775EE] text-white px-4 py-1.5 text-sm hover:bg-[#0062E0] transition">
									Submit answers
								</button>
							)}
							<button type="button" onClick={() => setShowHints((v) => !v)} className="inline-flex items-center gap-1.5 rounded-full border border-[#1775EE] text-[#1775EE] px-3 py-1.5 text-sm hover:bg-[#1775EE] hover:text-white transition">
								<Lightbulb className="w-4 h-4" /> {showHints ? "Hide hints" : "Show hints"}
							</button>
							<button type="button" onClick={() => setShowSolution((v) => !v)} className="inline-flex items-center gap-1.5 rounded-full border border-[#1775EE] text-[#1775EE] px-3 py-1.5 text-sm hover:bg-[#1775EE] hover:text-white transition">
								<Eye className="w-4 h-4" /> {showSolution ? "Hide solution" : "Show solution"}
							</button>
							<button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-full border border-gray-400 text-gray-700 px-3 py-1.5 text-sm hover:bg-gray-700 hover:text-white transition">
								<RotateCcw className="w-4 h-4" /> Reset lab
							</button>
						</div>
						{showSolution && (
							<div className="flex flex-col gap-2">
								{Object.entries(lab.solution).map(([name, cmds]) => (
									<div key={name}>
										<p className="text-xs font-bold mb-1">{name}</p>
										<pre className="rounded-xl bg-[#0f1b2d] text-[#e2e8f0] p-3 text-xs overflow-auto">{cmds.join("\n")}</pre>
									</div>
								))}
							</div>
						)}
					</div>
				</aside>

				{/* Right: console with device tabs */}
				<section className="flex flex-col gap-2 min-w-0 lg:h-full">
					<div className="flex flex-wrap items-center justify-between gap-2">
						<div className="flex flex-wrap items-center gap-2">
							<h5>Router Console</h5>
							{lab.editable.length > 1 && (
								<div className="flex gap-1.5" role="tablist" aria-label="Choose router">
									{lab.editable.map((n) => (
										<button
											key={n}
											type="button"
											role="tab"
											aria-selected={n === device}
											onClick={() => {
												setDevice(n);
												setInput("");
												setHistPos(-1);
												inputRef.current?.focus();
											}}
											className={`rounded-full px-3.5 py-1 text-sm font-bold transition ${n === device ? "bg-[#1775EE] text-white" : "border border-[#1775EE] text-[#1775EE] hover:bg-[#1775EE] hover:text-white"}`}
										>
											{n}
										</button>
									))}
								</div>
							)}
						</div>
						<span className="text-xs text-gray-500">↑ / ↓ for command history</span>
					</div>
					<div
						ref={termRef}
						onClick={() => inputRef.current?.focus()}
						className="h-[28rem] lg:h-auto lg:flex-1 lg:basis-0 lg:min-h-[28rem] overflow-auto rounded-2xl bg-[#0b1220] text-[#d1fae5] font-mono text-[13px] leading-5 p-4 shadow-lg cursor-text"
					>
						{con.lines.map((l, i) => (
							<div key={i} className="whitespace-pre-wrap break-words">{l || " "}</div>
						))}
						<form onSubmit={submit} className="flex">
							<span className="whitespace-pre">{promptFor(state, device)}</span>
							<input
								ref={inputRef}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={onKeyDown}
								aria-label="Router command"
								autoComplete="off"
								autoCapitalize="off"
								spellCheck={false}
								className="flex-1 min-w-0 bg-transparent outline-none text-[#d1fae5] caret-[#d1fae5]"
							/>
						</form>
					</div>
					<p className="text-xs text-gray-500">
						Supports the commands these labs use: configuration, show ip route, show ip interface brief, show running-config, ping, and traceroute.
					</p>
				</section>
			</div>

			<PacketTracerSection lab={lab} />

			{fromDashboard ? (
				<p className="text-sm">
					<Link to="/modules/programs/ccna" className="text-[#1775EE] underline underline-offset-4">
						Back to your CCNA dashboard
					</Link>
				</p>
			) : (
				<p className="text-sm">
					Want guided, hands-on CCNA training?{" "}
					<Link to="/training/cisco/ccna/ccna" className="text-[#1775EE] underline underline-offset-4">
						See our CCNA course
					</Link>
					.
				</p>
			)}
		</main>
	);
}

// ---------- page: picks the lab from ?lab=N; each lab mounts fresh (key) ----------
export default function CCNAPracticeLab({ fromDashboard = false }) {
	const [params, setParams] = useSearchParams();
	const labIndex = Math.min(PRACTICE_LABS.length - 1, Math.max(0, Number(params.get("lab") || 1) - 1));
	const lab = PRACTICE_LABS[labIndex];

	function selectLab(id) {
		setParams((p) => {
			const next = new URLSearchParams(p);
			next.set("lab", String(id));
			return next;
		});
	}

	return <LabWorkspace key={lab.id} lab={lab} selectLab={selectLab} fromDashboard={fromDashboard} />;
}
