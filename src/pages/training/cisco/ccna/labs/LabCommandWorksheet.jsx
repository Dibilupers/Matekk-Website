import { useState } from "react";
import { CheckCircle2, Circle, Maximize2, XCircle } from "lucide-react";
import { applyWorksheetCommands } from "./worksheetCommands";
import { createLabState } from "./labEngine";
import LabTopology from "./LabTopology";

export default function LabCommandWorksheet({ lab, state, setState, activeDevice, onReset, onExpand }) {
	const [answers, setAnswers] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const [failedSlots, setFailedSlots] = useState([]);
	const completedCount = lab.tasks.filter((task) => task.check(state, lab)).length;

	function submit(event) {
		event.preventDefault();
		const result = applyWorksheetCommands(lab, lab.worksheet, answers, createLabState(lab));
		setState(result.state);
		setFailedSlots(result.failedSlots);
		setSubmitted(true);
	}

	function reset() {
		setAnswers({});
		setFailedSlots([]);
		setSubmitted(false);
		onReset();
	}

	return (
		<div className="grid items-start gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
			<aside className="flex flex-col gap-4">
				<section className="rounded border border-[#9ca3af] bg-white p-4">
					<h5 className="mb-3 text-xs font-bold uppercase tracking-wide text-[#b91c1c]">Tasks</h5>
					<p className="mb-4 text-xs leading-5 text-[#334155]">{lab.worksheetInstructions}</p>
					<ol className="list-decimal space-y-3 pl-5 text-xs leading-5 text-[#1f2937]">
						{lab.tasks.map((task) => (
							<li key={task.id}>
								{task.text}
								{submitted && (
									<span className="ml-2 inline-flex align-middle" aria-label={task.check(state, lab) ? "Task complete" : "Task incomplete"}>
										{task.check(state, lab)
											? <CheckCircle2 size={14} className="text-green-600" />
											: <XCircle size={14} className="text-red-500" />}
									</span>
								)}
							</li>
						))}
					</ol>
				</section>
				<section className="rounded border border-[#cbd5e1] bg-white p-3">
					<div className="mb-2 flex items-center justify-between">
						<h5 className="text-xs font-bold text-[#334155]">Topology</h5>
						<div className="flex items-center gap-2">
							<span className="text-[11px] text-[#64748b]">Select a device to highlight it</span>
							<button
								type="button"
								onClick={onExpand}
								className="flex items-center gap-1.5 rounded-full border border-[#1775EE] bg-white px-3 py-1 text-xs font-bold text-[#1775EE] transition hover:bg-[#1775EE] hover:text-white"
							>
								<Maximize2 size={14} /> Expand
							</button>
						</div>
					</div>
					<LabTopology lab={lab} state={state} activeDevice={activeDevice} />
				</section>
			</aside>

			<section className="min-w-0 rounded border border-[#cbd5e1] bg-white p-4 sm:p-5">
				<p className="mb-4 font-mono text-xs text-[#111827]">Please type configuration commands here:</p>
				<form onSubmit={submit} className="space-y-4">
					{lab.worksheet.map((group, groupIndex) => (
						<fieldset key={group.title} className="min-w-0 space-y-1">
							<legend className="mb-1 text-xs font-semibold leading-5 text-[#111827]">{group.title}</legend>
							{group.instructions && <p className="mb-1 text-xs text-[#334155]">{group.instructions}</p>}
							{group.slots.map((slot, slotIndex) => {
								const number = lab.worksheet
									.slice(0, groupIndex)
									.reduce((total, previousGroup) => total + previousGroup.slots.length, 0)
									+ slotIndex + 1;
								return (
									<label key={number} className="flex min-w-0 items-center gap-1 font-mono text-[11px] sm:text-xs">
										<span className="w-fit shrink-0 text-[#111827]">{slot.prompt}</span>
										<input
											value={answers[number - 1] ?? ""}
											onChange={(event) => {
												const value = event.target.value;
												setAnswers((current) => ({ ...current, [number - 1]: value }));
											}}
											aria-label={`Command ${number} for ${slot.prompt}`}
											autoComplete="off"
											autoCapitalize="off"
											spellCheck={false}
											className={`h-7 min-w-0 flex-1 border px-2 font-mono text-xs text-[#111827] outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] ${failedSlots.includes(number) ? "border-red-500 bg-red-50" : "border-[#9ca3af] bg-[#d1d1d1]"}`}
										/>
										<span className="w-6 shrink-0 text-[#374151]">({number})</span>
									</label>
								);
							})}
						</fieldset>
					))}
					<div className="flex flex-wrap items-center justify-center gap-3 pt-1">
						<button type="submit" className="rounded border border-[#6b7280] bg-[#f3f4f6] px-4 py-1 text-xs font-semibold text-[#111827] hover:bg-[#e5e7eb]">
							Submit
						</button>
						<button type="button" onClick={reset} className="rounded border border-[#9ca3af] px-3 py-1 text-xs text-[#374151] hover:bg-gray-100">
							Reset
						</button>
					</div>
				</form>
				<div role="status" aria-live="polite" className="mt-3 flex min-h-8 items-center gap-2 border border-[#9ca3af] bg-[#d1d1d1] px-2 text-xs text-[#111827]">
					<span className="font-semibold">Result:</span>
					{submitted && (
						<span>
							{completedCount} of {lab.tasks.length} tasks correct
							{failedSlots.length ? ` · Check command slot${failedSlots.length === 1 ? "" : "s"} ${failedSlots.join(", ")}` : ""}
						</span>
					)}
					{!submitted && <Circle size={12} className="text-[#6b7280]" />}
				</div>
			</section>
		</div>
	);
}
