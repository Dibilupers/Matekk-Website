import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Circle, Eye, FlaskConical, Lightbulb, RotateCcw, Terminal } from "lucide-react";
import { COMPTIA_PRACTICE_LABS } from "./comptiaPracticeLabDefinitions";

const PROGRAM_DETAILS = {
	"comptia-network-plus": {
		name: "Network+",
		exam: "N10-009",
		dashboard: "/modules/programs/comptia-network-plus",
	},
	"comptia-security-plus": {
		name: "Security+",
		exam: "SY0-701",
		dashboard: "/modules/programs/comptia-security-plus",
	},
};

function createConsole(device) {
	return {
		mode: "user",
		interfaceName: "",
		lines: [
			`${device} Practice Simulator`,
			"Type ? at any prompt to see commands available in this lab.",
			"Press RETURN to get started!",
			"",
		],
		history: [],
	};
}

function createConsoles(lab) {
	return Object.fromEntries(lab.devices.map((device) => [device, createConsole(device)]));
}

function promptFor(device, terminal) {
	if (terminal.mode === "priv") return `${device}#`;
	if (terminal.mode === "config") return `${device}(config)#`;
	if (terminal.mode === "interface") return `${device}(config-if)#`;
	if (terminal.mode === "vlan") return `${device}(config-vlan)#`;
	if (terminal.mode === "dhcp") return `${device}(dhcp-config)#`;
	if (terminal.mode === "wlan") return `${device}(wlan-config)#`;
	if (terminal.mode === "radio") return `${device}(radio-config)#`;
	if (terminal.mode === "archive") return `${device}(config-archive)#`;
	return `${device}>`;
}

function normalizeCommand(value) {
	return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function applyModeCommand(command, terminal) {
	if (command === "enable" && terminal.mode === "user") {
		return { ...terminal, mode: "priv" };
	}
	if (["configure terminal", "conf t"].includes(command) && terminal.mode === "priv") {
		return { ...terminal, mode: "config" };
	}
	if (command === "end" && terminal.mode !== "user") {
		return { ...terminal, mode: "priv", interfaceName: "" };
	}
	if (command === "exit") {
		if (terminal.mode === "priv") return { ...terminal, mode: "user", interfaceName: "" };
		if (terminal.mode === "config") return { ...terminal, mode: "priv", interfaceName: "" };
		if (terminal.mode !== "user") return { ...terminal, mode: "config", interfaceName: "" };
	}
	if (terminal.mode === "config" && /^interface(?:\s+range)?\s+.+/.test(command)) {
		return { ...terminal, mode: "interface", interfaceName: command.replace(/^interface(?:\s+range)?\s+/, "") };
	}
	if (terminal.mode === "config" && /^vlan\s+\d+$/.test(command)) {
		return { ...terminal, mode: "vlan" };
	}
	if (terminal.mode === "config" && /^ip dhcp pool\s+.+/.test(command)) {
		return { ...terminal, mode: "dhcp" };
	}
	if (terminal.mode === "config" && command === "archive") {
		return { ...terminal, mode: "archive" };
	}
	if (/^wlan\s+\d+$/.test(command)) return { ...terminal, mode: "wlan" };
	if (/^ap name\s+.+\s+radio\s+\d+$/.test(command)) return { ...terminal, mode: "radio" };
	if (terminal.mode === "interface" && command === "exit") {
		return { ...terminal, mode: "config", interfaceName: "" };
	}
	return terminal;
}

function executeCommand(lab, device, terminal, rawCommand, taskProgress) {
	const command = normalizeCommand(rawCommand);
	if (!command) return { terminal, output: [], taskProgress };

	for (const item of lab.tasks) {
		const actionIndex = taskProgress[item.id] ?? 0;
		const expectedAction = item.actions[actionIndex];
		if (!expectedAction || normalizeCommand(expectedAction.command) !== command) continue;
		if (expectedAction.device && expectedAction.device !== device) {
			return { terminal, output: [`% Run this command on ${expectedAction.device}.`], taskProgress };
		}
		if (expectedAction.context !== "any" && expectedAction.context !== terminal.mode) {
			return { terminal, output: [`% This command requires ${expectedAction.context} mode. Current mode: ${terminal.mode}.`], taskProgress };
		}
		if (expectedAction.interfaceName && expectedAction.interfaceName !== terminal.interfaceName) {
			return { terminal, output: [`% Select interface ${expectedAction.interfaceName} before running this command.`], taskProgress };
		}
		const nextProgress = { ...taskProgress, [item.id]: actionIndex + 1 };
		return {
			terminal: applyModeCommand(command, terminal),
			output: [expectedAction.output],
			taskProgress: nextProgress,
		};
	}

	if (command === "?" || command === "help") {
		const available = lab.tasks.flatMap((item) => item.actions.map((entry) => entry.command));
		return {
			terminal,
			output: ["Available lab commands:", ...new Set(["enable", "configure terminal", "interface <name>", "exit", "end", ...available])],
			taskProgress,
		};
	}
	if (command === "enable" || command === "configure terminal" || command === "conf t" ||
		command === "exit" || command === "end" || /^interface(?:\s+range)?\s+.+/.test(command) ||
		/^vlan\s+\d+$/.test(command) || /^ip dhcp pool\s+.+/.test(command) || command === "archive" ||
		/^wlan\s+\d+$/.test(command) || /^ap name\s+.+\s+radio\s+\d+$/.test(command)) {
		const nextTerminal = applyModeCommand(command, terminal);
		if (nextTerminal === terminal) {
			return { terminal, output: [`% Cannot run "${rawCommand.trim()}" from ${terminal.mode} mode.`], taskProgress };
		}
		return { terminal: nextTerminal, output: [], taskProgress };
	}
	if (command.startsWith("show ") || command.startsWith("ping ") || command.startsWith("traceroute ")) {
		return { terminal, output: [`No additional simulator output for "${rawCommand.trim()}".`], taskProgress };
	}
	return { terminal, output: [`% Invalid command. Type ? to see the commands available in this lab.`], taskProgress };
}

export default function CompTIAPracticeLab({ programKey }) {
	const programLabs = COMPTIA_PRACTICE_LABS[programKey];
	const program = PROGRAM_DETAILS[programKey];
	const [selectedLabId, setSelectedLabId] = useState(1);
	const lab = programLabs.find((item) => item.id === selectedLabId) ?? programLabs[0];
	const [consoles, setConsoles] = useState(() => createConsoles(lab));
	const [device, setDevice] = useState(lab.devices[0]);
	const [taskProgress, setTaskProgress] = useState({});
	const [input, setInput] = useState("");
	const [historyPosition, setHistoryPosition] = useState(-1);
	const [showLabPicker, setShowLabPicker] = useState(false);
	const [showHints, setShowHints] = useState(false);
	const [showSolution, setShowSolution] = useState(false);
	const terminalRef = useRef(null);
	const inputRef = useRef(null);
	const terminal = consoles[device];
	const completedCount = lab.tasks.filter((item) => (taskProgress[item.id] ?? 0) >= item.actions.length).length;
	const allDone = completedCount === lab.tasks.length;

	useEffect(() => {
		if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
	}, [terminal.lines]);

	function selectLab(nextId) {
		const nextLab = programLabs.find((item) => item.id === nextId);
		setSelectedLabId(nextLab.id);
		setConsoles(createConsoles(nextLab));
		setDevice(nextLab.devices[0]);
		setTaskProgress({});
		setInput("");
		setHistoryPosition(-1);
		setShowHints(false);
		setShowSolution(false);
		setShowLabPicker(false);
	}

	function submitCommand(event) {
		event.preventDefault();
		if (!input.trim()) return;
		const prompt = promptFor(device, terminal);
		const result = executeCommand(lab, device, terminal, input, taskProgress);
		setTaskProgress(result.taskProgress);
		setConsoles((current) => ({
			...current,
			[device]: {
				...result.terminal,
				lines: [...terminal.lines, `${prompt}${input}`, ...result.output],
				history: [...terminal.history, input],
			},
		}));
		setInput("");
		setHistoryPosition(-1);
	}

	function handleHistory(event) {
		if (event.key === "ArrowUp" && terminal.history.length) {
			event.preventDefault();
			const nextPosition = historyPosition === -1
				? terminal.history.length - 1
				: Math.max(0, historyPosition - 1);
			setHistoryPosition(nextPosition);
			setInput(terminal.history[nextPosition]);
		} else if (event.key === "ArrowDown" && historyPosition !== -1) {
			event.preventDefault();
			const nextPosition = historyPosition + 1;
			if (nextPosition >= terminal.history.length) {
				setHistoryPosition(-1);
				setInput("");
			} else {
				setHistoryPosition(nextPosition);
				setInput(terminal.history[nextPosition]);
			}
		}
	}

	function resetLab() {
		setConsoles(createConsoles(lab));
		setDevice(lab.devices[0]);
		setTaskProgress({});
		setInput("");
		setHistoryPosition(-1);
		setShowSolution(false);
		inputRef.current?.focus();
	}

	const solutionDevices = lab.devices.map((name) => ({
		name,
		commands: lab.tasks.flatMap((item) => item.actions
			.filter((itemAction) => !itemAction.device || itemAction.device === name)
			.map((itemAction) => itemAction.command)),
	}));

	return (
		<main className="min-h-screen bg-white px-4 pb-8 pt-4 text-[#111a2d] sm:px-8 sm:pb-10 sm:pt-4">
			<div className="mx-auto max-w-[1440px]">
				<Link to={program.dashboard} className="inline-flex items-center gap-2 rounded-full bg-[#fff5f6] px-4 py-2 text-sm font-bold text-[#c8102e] transition hover:bg-[#ffe9ed]">
					<ArrowLeft size={17} /> Back to CompTIA {program.name}
				</Link>

				<header className="mx-auto mt-5 max-w-5xl rounded-3xl border border-[#f0cbd3] bg-[#fffafb] p-6 shadow-[0_12px_28px_rgba(200,16,46,0.07)] sm:p-8">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#f0cbd3] bg-[#fff5f6] px-4 py-2 text-sm font-semibold text-[#b20d29]">
						<FlaskConical size={16} /> CompTIA {program.name} · {program.exam} Practice Lab
					</div>
					<h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">{lab.title}</h1>
					<p className="mt-2 max-w-3xl leading-7 text-[#66738d]">{lab.summary}</p>
					<p className="mt-3 text-xs text-[#8a96aa]">Interactive command simulator · Changes are limited to this practice session.</p>
				</header>

				<section className="mx-auto mt-5 max-w-5xl">
					<div className="flex flex-wrap items-end justify-between gap-3">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c8102e]">Practice library</p>
							<h2 className="mt-1 text-lg font-bold text-[#17233d]">Simulation {lab.id} of {programLabs.length}</h2>
						</div>
						<button
							type="button"
							onClick={() => setShowLabPicker((visible) => !visible)}
							aria-expanded={showLabPicker}
							aria-controls="comptia-practice-lab-picker"
							className="inline-flex items-center gap-2 rounded-full border border-[#c8102e] px-4 py-2 text-sm font-semibold text-[#c8102e] transition hover:bg-[#fff5f6]"
						>
							{showLabPicker ? "Close simulations" : `Choose simulation (${programLabs.length})`}
							<ChevronDown size={16} />
						</button>
					</div>
					{showLabPicker && (
						<div id="comptia-practice-lab-picker" className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
							{programLabs.map((item) => (
								<button
									key={item.id}
									type="button"
									onClick={() => selectLab(item.id)}
									aria-pressed={item.id === lab.id}
									className={`rounded-xl border p-3 text-left transition ${item.id === lab.id ? "border-[#c8102e] bg-[#fff5f6]" : "border-[#ead7dc] bg-white hover:border-[#c8102e]/50"}`}
								>
									<span className="block text-xs font-bold uppercase tracking-wide text-[#b20d29]">Simulation {item.id}</span>
									<span className="mt-1 block text-sm font-semibold text-[#17233d]">{item.title}</span>
								</button>
							))}
						</div>
					)}
				</section>

				<div className="mx-auto mt-5 grid max-w-[1440px] gap-5 lg:grid-cols-[minmax(300px,0.38fr)_minmax(0,0.62fr)]">
					<aside className="rounded-2xl border border-[#dbe7ea] bg-white p-5 shadow-[0_12px_28px_rgba(15,35,55,0.08)]">
						<div className="flex items-center justify-between gap-3">
							<h2 className="text-xl font-bold text-[#c8102e]">Tasks</h2>
							<span className="text-sm font-bold text-[#17233d]">{completedCount}/{lab.tasks.length} done</span>
						</div>
						<div className="mt-4 h-2 overflow-hidden rounded-full bg-[#ffe9ed]">
							<div className="h-full rounded-full bg-[#c8102e] transition-[width]" style={{ width: `${(completedCount / lab.tasks.length) * 100}%` }} />
						</div>
						<ol className="mt-5 space-y-4">
							{lab.tasks.map((item, index) => {
								const done = (taskProgress[item.id] ?? 0) >= item.actions.length;
								return (
									<li key={item.id} className="flex items-start gap-2.5 text-sm leading-6 text-[#26354d]">
										{done
											? <CheckCircle2 className="mt-1 shrink-0 text-emerald-600" size={19} />
											: <Circle className="mt-1 shrink-0 text-slate-400" size={19} />}
										<div>
											<p className={done ? "text-emerald-700" : ""}><strong>{index + 1}.</strong> {item.text}</p>
											{showHints && !done && <p className="mt-1 text-xs leading-5 text-[#66738d]">Hint: {item.hint}</p>}
										</div>
									</li>
								);
							})}
						</ol>

						{allDone && (
							<div className="mt-5 rounded-xl bg-emerald-50 p-3 text-sm font-semibold text-emerald-800" role="status">
								Lab complete! All tasks in this simulation are done.
								{lab.id < programLabs.length && (
									<button type="button" onClick={() => selectLab(lab.id + 1)} className="mt-2 flex items-center gap-1 underline underline-offset-4">
										Next simulation <ArrowRight size={14} />
									</button>
								)}
							</div>
						)}

						<div className="mt-5 flex flex-wrap gap-2">
							<button type="button" onClick={() => setShowHints((visible) => !visible)} className="inline-flex items-center gap-1.5 rounded-full border border-[#c8102e] px-3 py-2 text-sm font-semibold text-[#c8102e] transition hover:bg-[#fff5f6]">
								<Lightbulb size={15} /> {showHints ? "Hide hints" : "Show hints"}
							</button>
							<button type="button" onClick={() => setShowSolution((visible) => !visible)} className="inline-flex items-center gap-1.5 rounded-full border border-[#c8102e] px-3 py-2 text-sm font-semibold text-[#c8102e] transition hover:bg-[#fff5f6]">
								<Eye size={15} /> {showSolution ? "Hide solution" : "Show solution"}
							</button>
							<button type="button" onClick={resetLab} className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
								<RotateCcw size={15} /> Reset terminal
							</button>
						</div>

						{showSolution && (
							<div className="mt-4 space-y-3">
								<p className="text-sm font-bold text-[#17233d]">Solution commands</p>
								{solutionDevices.map(({ name, commands }) => (
									<div key={name}>
										<p className="mb-1 text-xs font-bold text-[#53617a]">{name}</p>
										<pre className="overflow-auto rounded-xl bg-[#0b1220] p-3 text-xs leading-5 text-[#d1fae5]">{commands.join("\n")}</pre>
									</div>
								))}
							</div>
						)}
					</aside>

					<section className="flex min-w-0 flex-col gap-2">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<div className="flex flex-wrap items-center gap-2">
								<h2 className="inline-flex items-center gap-2 text-lg font-bold text-[#17233d]">
									<Terminal size={19} /> {lab.devices.length > 1 ? "Device Console" : `${device} Console`}
								</h2>
								{lab.devices.length > 1 && (
									<div className="flex gap-1.5" role="tablist" aria-label="Choose simulated device">
										{lab.devices.map((name) => (
											<button
												key={name}
												type="button"
												role="tab"
												aria-selected={name === device}
												onClick={() => {
													setDevice(name);
													setInput("");
													setHistoryPosition(-1);
													inputRef.current?.focus();
												}}
												className={`rounded-full px-3.5 py-1 text-sm font-bold transition ${name === device ? "bg-[#c8102e] text-white" : "border border-[#c8102e] text-[#c8102e] hover:bg-[#fff5f6]"}`}
											>
												{name}
											</button>
										))}
									</div>
								)}
							</div>
							<span className="text-xs text-[#7b879b]">↑ / ↓ for command history</span>
						</div>

						<div
							ref={terminalRef}
							onClick={() => inputRef.current?.focus()}
							className="h-[28rem] min-w-0 overflow-auto rounded-2xl bg-[#0b1220] p-4 font-mono text-[13px] leading-5 text-[#d1fae5] shadow-lg"
						>
							{terminal.lines.map((line, index) => (
								<div key={`${index}-${line}`} className="whitespace-pre-wrap break-words">{line || "\u00a0"}</div>
							))}
							<form onSubmit={submitCommand} className="flex min-w-0">
								<span className="whitespace-pre">{promptFor(device, terminal)}</span>
								<input
									ref={inputRef}
									value={input}
									onChange={(event) => setInput(event.target.value)}
									onKeyDown={handleHistory}
									aria-label={`${device} command`}
									autoComplete="off"
									autoCapitalize="off"
									spellCheck={false}
									className="min-w-0 flex-1 bg-transparent text-[#d1fae5] outline-none"
								/>
							</form>
						</div>
						<p className="text-xs leading-5 text-[#7b879b]">This is an isolated learning simulator. Commands update only the scenario state in this browser session.</p>
					</section>
				</div>
			</div>
		</main>
	);
}
