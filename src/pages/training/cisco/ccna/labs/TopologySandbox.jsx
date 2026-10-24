import { useMemo, useState } from "react";
import { Network, Plus, RotateCcw, Trash2, Unplug } from "lucide-react";
import { canReach, createLabState, execute, isIp, isMask, promptFor } from "./labEngine";
import LabTopology from "./LabTopology";

const PORT_COUNT = 4;
const makePorts = (kind) => kind === "pc"
	? { fa0: { ip: "", mask: "", up: true } }
	: Object.fromEntries(
		Array.from({ length: PORT_COUNT }, (_, index) => [
			`g0/${kind === "switch" ? index + 1 : index}`,
			{ ip: "", mask: "", up: kind === "switch" },
		]),
	);

function createSandbox() {
	const lab = {
		id: "sandbox",
		level: "Beginner",
		title: "My topology",
		devices: {},
		editable: [],
		links: [],
		tasks: [],
	};
	return { lab, state: createLabState(lab) };
}

function getNextDeviceName(devices, kind) {
	const prefix = { router: "R", switch: "SW", pc: "PC" }[kind];
	let number = 1;
	while (devices[`${prefix}${number}`]) number += 1;
	return `${prefix}${number}`;
}

function withSandboxLayout(lab, state) {
	const entries = Object.entries(lab.devices);
	const columns = Math.max(1, Math.min(3, entries.length));
	const nodes = Object.fromEntries(entries.map(([name, device], index) => {
		const firstInterface = Object.entries(state.devices[name].interfaces)
			.find(([, iface]) => iface.ip);
		const address = firstInterface
			? `${firstInterface[0].toUpperCase()} · ${firstInterface[1].ip}`
			: device.kind === "switch" ? "Layer 2 switch" : "No IP address";
		return [name, {
			x: 120 + (index % columns) * 250,
			y: 100 + Math.floor(index / columns) * 185,
			sub: address,
		}];
	}));
	return {
		...lab,
		layout: {
			width: Math.max(420, columns * 250 + 100),
			height: Math.max(220, Math.ceil(entries.length / columns) * 185 + 70),
			nodes,
		},
	};
}

function CommandConsole({ lab, state, setState, routers }) {
	const [deviceName, setDeviceName] = useState("");
	const [lines, setLines] = useState({});
	const [input, setInput] = useState("");
	const selectedDevice = routers.includes(deviceName) ? deviceName : routers[0] ?? "";
	const output = lines[selectedDevice] ?? [`${selectedDevice}>`, "Use the CLI to configure this router, then try ping or show ip route.", ""];

	function submit(event) {
		event.preventDefault();
		if (!selectedDevice) return;
		const result = execute(lab, state, selectedDevice, input);
		setState(result.state);
		setLines((previous) => ({
			...previous,
			[selectedDevice]: [...(previous[selectedDevice] ?? output), `${promptFor(state, selectedDevice)}${input}`, ...result.out],
		}));
		setInput("");
	}

	return (
		<section className="space-y-3">
			<div className="flex flex-wrap items-center gap-2">
				<h5 className="mr-2 text-[#1775EE]">Router console</h5>
				{routers.map((name) => (
					<button
						key={name}
						type="button"
						onClick={() => setDeviceName(name)}
						aria-pressed={name === selectedDevice}
						className={`rounded-full px-3 py-1.5 text-sm font-semibold ${name === selectedDevice ? "bg-[#1775EE] text-white" : "border border-[#1775EE] text-[#1775EE]"}`}
					>
						{name}
					</button>
				))}
			</div>
			<div className="min-h-48 overflow-auto rounded-2xl bg-[#0b1220] p-4 font-mono text-xs leading-5 text-[#d1fae5]">
				{selectedDevice ? (
					<>
						{output.map((line, index) => <div key={`${index}-${line}`} className="whitespace-pre-wrap break-words">{line || "\u00a0"}</div>)}
						<form onSubmit={submit} className="flex">
							<span className="whitespace-pre">{promptFor(state, selectedDevice)}</span>
							<input
								value={input}
								onChange={(event) => setInput(event.target.value)}
								aria-label={`${selectedDevice} command`}
								autoComplete="off"
								autoCapitalize="off"
								spellCheck={false}
								className="min-w-0 flex-1 bg-transparent outline-none"
							/>
						</form>
					</>
				) : (
					<p>Add a router to use the Cisco-style command line.</p>
				)}
			</div>
			<p className="text-xs text-gray-600">Router commands include interface setup, static routes, <code>show ip route</code>, ping, and traceroute.</p>
		</section>
	);
}

export default function TopologySandbox() {
	const [sandbox, setSandbox] = useState(createSandbox);
	const [sourcePort, setSourcePort] = useState("");
	const [destinationPort, setDestinationPort] = useState("");
	const [selectedPc, setSelectedPc] = useState("");
	const [pingFrom, setPingFrom] = useState("");
	const [pingTarget, setPingTarget] = useState("");
	const [pingResult, setPingResult] = useState("");
	const [pcConfigError, setPcConfigError] = useState("");
	const [consoleGeneration, setConsoleGeneration] = useState(0);
	const { lab, state } = sandbox;
	const routers = Object.entries(lab.devices).filter(([, device]) => device.kind === "router").map(([name]) => name);
	const pcs = Object.entries(lab.devices).filter(([, device]) => device.kind === "pc").map(([name]) => name);
	const renderedLab = useMemo(() => withSandboxLayout(lab, state), [lab, state]);
	const endpoints = Object.entries(state.devices).flatMap(([deviceName, device]) =>
		Object.keys(device.interfaces).map((ifName) => `${deviceName}:${ifName}`),
	);
	const usedPorts = new Set(lab.links.flatMap((link) => [link.a, link.b]));
	const availablePorts = endpoints.filter((endpoint) => !usedPorts.has(endpoint));
	const sourceOptions = availablePorts.filter((endpoint) => endpoint !== destinationPort);
	const destinationOptions = availablePorts.filter((endpoint) => endpoint !== sourcePort);

	function updateSandbox(updateLab, updateState) {
		setSandbox((current) => ({
			lab: updateLab(current.lab),
			state: updateState(current.state),
		}));
	}

	function addDevice(kind) {
		const name = getNextDeviceName(lab.devices, kind);
		const device = {
			kind,
			hostname: name,
			gateway: "",
			interfaces: makePorts(kind),
			routes: [],
		};
		updateSandbox(
			(currentLab) => ({
				...currentLab,
				devices: { ...currentLab.devices, [name]: device },
				editable: kind === "router" ? [...currentLab.editable, name] : currentLab.editable,
			}),
			(currentState) => ({
				...currentState,
				devices: { ...currentState.devices, [name]: structuredClone(device) },
				consoles: kind === "router"
					? { ...currentState.consoles, [name]: { mode: "user", iface: null } }
					: currentState.consoles,
				initial: kind === "router"
					? { ...currentState.initial, [name]: JSON.stringify({ h: name, s: "", i: device.interfaces, r: [] }) }
					: currentState.initial,
			}),
		);
		if (kind === "pc") setSelectedPc(name);
		if (kind !== "switch") setPingFrom(name);
	}

	function removeDevice(name) {
		const nextName = Object.keys(lab.devices).filter((deviceName) => deviceName !== name);
		updateSandbox(
			(currentLab) => {
				const devices = { ...currentLab.devices };
				delete devices[name];
				return {
					...currentLab,
					devices,
					editable: currentLab.editable.filter((deviceName) => deviceName !== name),
					links: currentLab.links.filter((link) => !link.a.startsWith(`${name}:`) && !link.b.startsWith(`${name}:`)),
				};
			},
			(currentState) => {
				const devices = { ...currentState.devices };
				const consoles = { ...currentState.consoles };
				const initial = { ...currentState.initial };
				delete devices[name];
				delete consoles[name];
				delete initial[name];
				return { ...currentState, devices, consoles, initial };
			},
		);
		if (selectedPc === name) setSelectedPc(nextName.find((deviceName) => lab.devices[deviceName]?.kind === "pc") ?? "");
		if (pingFrom === name) {
			setPingFrom(nextName.find((deviceName) => ["pc", "router"].includes(lab.devices[deviceName]?.kind)) ?? "");
		}
		if (sourcePort.startsWith(`${name}:`)) setSourcePort("");
		if (destinationPort.startsWith(`${name}:`)) setDestinationPort("");
		if (lab.devices[name]?.kind === "router") setConsoleGeneration((current) => current + 1);
		setPingResult("");
	}

	function connectPorts(event) {
		event.preventDefault();
		if (!sourcePort || !destinationPort || sourcePort === destinationPort) return;
		updateSandbox(
			(currentLab) => ({
				...currentLab,
				links: [...currentLab.links, { a: sourcePort, b: destinationPort, net: `Link ${currentLab.links.length + 1}` }],
			}),
			(currentState) => currentState,
		);
		setSourcePort("");
		setDestinationPort("");
	}

	function configurePc(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const ip = String(form.get("ip") ?? "").trim();
		const mask = String(form.get("mask") ?? "").trim();
		const gateway = String(form.get("gateway") ?? "").trim();
		if ((ip && (!isIp(ip) || !isMask(mask))) || (!ip && mask) || (gateway && !isIp(gateway))) {
			setPcConfigError("Enter a valid IP address, subnet mask, and optional gateway.");
			return;
		}
		updateSandbox(
			(currentLab) => currentLab,
			(currentState) => {
				const device = currentState.devices[selectedPc];
				return {
					...currentState,
					devices: {
						...currentState.devices,
						[selectedPc]: {
							...device,
							gateway,
							interfaces: { ...device.interfaces, fa0: { ...device.interfaces.fa0, ip, mask } },
						},
					},
				};
			},
		);
		setPcConfigError("");
	}

	function testPing(event) {
		event.preventDefault();
		if (!pingFrom || !isIp(pingTarget)) {
			setPingResult("Choose a source device and enter a valid destination IP address.");
			return;
		}
		setPingResult(canReach(lab, state, pingFrom, pingTarget)
			? `${pingFrom} can reach ${pingTarget}.`
			: `${pingFrom} cannot reach ${pingTarget}. Check the cabling, IP settings, and router routes.`);
	}

	function resetSandbox() {
		setSandbox(createSandbox());
		setSourcePort("");
		setDestinationPort("");
		setSelectedPc("");
		setPingFrom("");
		setPingTarget("");
		setPingResult("");
		setPcConfigError("");
		setConsoleGeneration((current) => current + 1);
	}

	return (
		<section className="space-y-6 rounded-3xl border border-[#cfe0f5] bg-white p-4 shadow-sm sm:p-6">
			<header className="flex flex-wrap items-start justify-between gap-4">
				<div>
					<p className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#1775EE]">
						<Network size={14} /> Build and test
					</p>
					<h4 className="mt-2 text-xl font-bold text-[#17233d]">Topology Sandbox</h4>
					<p className="mt-1 max-w-3xl text-sm leading-6 text-gray-600">
						Create a small network, connect device ports, configure router interfaces and routes, then test connectivity.
						Switches forward traffic between connected ports; VLANs and wireless networks are not simulated.
					</p>
				</div>
				<button type="button" onClick={resetSandbox} className="inline-flex items-center gap-2 rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
					<RotateCcw size={15} /> Clear topology
				</button>
			</header>

			<div className="flex flex-wrap gap-2">
				{[
					["router", "Add router"],
					["switch", "Add switch"],
					["pc", "Add PC"],
				].map(([kind, label]) => (
					<button key={kind} type="button" onClick={() => addDevice(kind)} className="inline-flex items-center gap-2 rounded-full bg-[#005b6b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#004653]">
						<Plus size={15} /> {label}
					</button>
				))}
			</div>

			<div className="overflow-x-auto rounded-2xl border border-[#d6e0ee] bg-[#f8fafc] p-3">
				{Object.keys(lab.devices).length ? (
					<div className="mx-auto min-w-[580px] max-w-5xl">
						<LabTopology lab={renderedLab} state={state} activeDevice={null} />
					</div>
				) : (
					<div className="flex min-h-40 flex-col items-center justify-center gap-2 text-center text-sm text-gray-500">
						<Network size={28} />
						<p>Add a router, switch, or PC to start building your topology.</p>
					</div>
				)}
			</div>

			{Object.keys(lab.devices).length > 0 && (
				<div className="grid gap-5 xl:grid-cols-2">
					<section className="space-y-3 rounded-2xl bg-[#f3f8fc] p-4">
						<h5 className="text-[#1775EE]">Devices and connections</h5>
						<ul className="space-y-2">
							{Object.entries(lab.devices).map(([name, device]) => (
								<li key={name} className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2">
									<span className="min-w-0 text-sm font-semibold text-[#263654]">{name} <span className="font-normal text-gray-500">· {device.kind}</span></span>
									<button type="button" onClick={() => removeDevice(name)} aria-label={`Remove ${name}`} className="rounded-full p-2 text-gray-500 hover:bg-red-50 hover:text-red-600">
										<Trash2 size={15} />
									</button>
								</li>
							))}
						</ul>
						<form onSubmit={connectPorts} className="space-y-2 border-t border-[#d6e0ee] pt-3">
							<p className="text-sm font-semibold text-[#263654]">Connect two free ports</p>
							<div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr]">
								<select aria-label="First port" value={sourcePort} onChange={(event) => setSourcePort(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm">
									<option value="">Choose port</option>
									{sourceOptions.map((port) => <option key={port} value={port}>{port}</option>)}
								</select>
								<Unplug className="mx-auto mt-2 text-[#1775EE]" size={18} />
								<select aria-label="Second port" value={destinationPort} onChange={(event) => setDestinationPort(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm">
									<option value="">Choose port</option>
									{destinationOptions.map((port) => <option key={port} value={port}>{port}</option>)}
								</select>
							</div>
							<button type="submit" disabled={!sourcePort || !destinationPort} className="rounded-full border border-[#1775EE] px-4 py-2 text-sm font-semibold text-[#1775EE] hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50">Connect</button>
						</form>
						{lab.links.length > 0 && (
							<ul className="space-y-1">
								{lab.links.map((link) => (
									<li key={`${link.a}-${link.b}`} className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-xs text-gray-600">
										<span>{link.a} ↔ {link.b}</span>
										<button
											type="button"
											onClick={() => updateSandbox(
												(currentLab) => ({ ...currentLab, links: currentLab.links.filter((item) => item !== link) }),
												(currentState) => currentState,
											)}
											aria-label={`Remove connection ${link.a} to ${link.b}`}
											className="font-semibold text-red-600 hover:underline"
										>
											Disconnect
										</button>
									</li>
								))}
							</ul>
						)}
					</section>

					<section className="space-y-4 rounded-2xl bg-[#f3f8fc] p-4">
						<h5 className="text-[#1775EE]">PC network settings</h5>
						{pcs.length ? (
							<>
								<label className="block text-sm font-semibold text-[#263654]">
									Choose a PC
									<select value={selectedPc} onChange={(event) => { setSelectedPc(event.target.value); setPcConfigError(""); }} className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal">
										{pcs.map((name) => <option key={name} value={name}>{name}</option>)}
									</select>
								</label>
								{selectedPc && (
									<form key={selectedPc} onSubmit={configurePc} className="grid gap-2 sm:grid-cols-3">
										{[
											["ip", "IP address", state.devices[selectedPc].interfaces.fa0.ip],
											["mask", "Subnet mask", state.devices[selectedPc].interfaces.fa0.mask],
											["gateway", "Default gateway", state.devices[selectedPc].gateway],
										].map(([name, label, value]) => (
											<label key={name} className="text-xs font-semibold text-gray-600">
												{label}
												<input name={name} defaultValue={value} placeholder={name === "gateway" ? "Optional" : "Required"} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-2 py-2 text-sm font-normal text-[#17233d]" />
											</label>
										))}
										{pcConfigError && <p role="alert" className="text-sm text-red-600 sm:col-span-3">{pcConfigError}</p>}
										<button type="submit" className="w-fit rounded-full border border-[#1775EE] px-4 py-2 text-sm font-semibold text-[#1775EE] hover:bg-blue-50 sm:col-span-3">Apply settings</button>
									</form>
								)}
							</>
						) : (
							<p className="text-sm text-gray-600">Add a PC to configure its IP address, subnet mask, and default gateway.</p>
						)}
					</section>
				</div>
			)}

			{pcs.length + routers.length > 0 && (
				<form onSubmit={testPing} className="flex flex-wrap items-end gap-3 rounded-2xl border border-[#d6e0ee] p-4">
					<label className="text-sm font-semibold text-[#263654]">
						Ping from
						<select value={pingFrom} onChange={(event) => setPingFrom(event.target.value)} className="mt-1 block rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal">
							{[...routers, ...pcs].map((name) => <option key={name} value={name}>{name}</option>)}
						</select>
					</label>
					<label className="text-sm font-semibold text-[#263654]">
						Destination IP
						<input value={pingTarget} onChange={(event) => setPingTarget(event.target.value)} placeholder="192.168.1.10" className="mt-1 block rounded-lg border border-gray-300 px-3 py-2 font-normal" />
					</label>
					<button type="submit" className="rounded-full bg-[#1775EE] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0062E0]">Test ping</button>
					{pingResult && <p role="status" className="w-full text-sm font-medium text-[#263654]">{pingResult}</p>}
				</form>
			)}

			<CommandConsole key={consoleGeneration} lab={lab} state={state} setState={(nextState) => setSandbox((current) => ({ ...current, state: nextState }))} routers={routers} />
		</section>
	);
}
