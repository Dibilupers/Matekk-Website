import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, FlaskConical, RotateCcw, XCircle } from "lucide-react";

const PRACTICE_LABS = {
	"comptia-security-plus": {
		name: "Security+",
		certification: "SY0-701",
		dashboardPath: "/modules/programs/comptia-security-plus",
		scenarioTitle: "Respond to a suspicious account sign-in",
		scenarioDescription: "Review a fictional identity alert and make defensive decisions to secure an employee account.",
		steps: [
			{
				id: "investigate",
				title: "Triage the alert",
				context: "The identity dashboard reports a successful sign-in from an unfamiliar region, followed by an MFA push the employee did not approve.",
				prompt: "What is the best first step to validate the alert?",
				options: [
					{ id: "preserve", label: "Preserve the sign-in and MFA event records, then contact the employee through a trusted channel." },
					{ id: "delete", label: "Delete the alert so the account owner is not interrupted." },
					{ id: "broadcast", label: "Send the employee's sign-in details to the whole organization." },
				],
				answer: "preserve",
				explanation: "Preserved logs support investigation, and a trusted channel helps verify whether the activity is legitimate without exposing account details.",
			},
			{
				id: "contain",
				title: "Contain possible account misuse",
				context: "The employee confirms the sign-in was not theirs. The identity provider shows an active session.",
				prompt: "Which containment action most directly limits continued access?",
				options: [
					{ id: "revoke", label: "Temporarily disable sign-in and revoke active sessions while the account is investigated." },
					{ id: "wait", label: "Wait for the session to expire on its own." },
					{ id: "share", label: "Ask the employee to share their password so you can test it." },
				],
				answer: "revoke",
				explanation: "Disabling sign-in and revoking sessions contain access while preserving time to investigate and recover the account safely.",
			},
			{
				id: "improve",
				title: "Strengthen account protection",
				context: "The employee used a password and push-based MFA. Your organization supports phishing-resistant authenticators.",
				prompt: "Which improvement best reduces the risk of repeated MFA-prompt abuse?",
				options: [
					{ id: "fido", label: "Enroll a phishing-resistant FIDO2 security key and review conditional-access rules." },
					{ id: "reuse", label: "Reuse the current password on fewer work sites." },
					{ id: "disable-mfa", label: "Turn off MFA to prevent future push notifications." },
				],
				answer: "fido",
				explanation: "Phishing-resistant authentication helps prevent credential and push-fatigue abuse; conditional access adds context-based controls.",
			},
		],
	},
	"comptia-network-plus": {
		name: "Network+",
		certification: "N10-009",
		dashboardPath: "/modules/programs/comptia-network-plus",
		scenarioTitle: "Restore a workstation's network access",
		scenarioDescription: "Work through a fictional office-network outage using evidence and a structured troubleshooting approach.",
		steps: [
			{
				id: "identify",
				title: "Identify the symptom",
				context: "A workstation has link lights, but its address is 169.254.18.42 and it cannot reach internal services.",
				prompt: "What does this address most strongly suggest?",
				options: [
					{ id: "dhcp", label: "The workstation did not receive a DHCP lease and assigned itself a link-local IPv4 address." },
					{ id: "dns", label: "DNS is resolving every internal hostname to a public address." },
					{ id: "gateway", label: "The default gateway is responding with an IPv6 address." },
				],
				answer: "dhcp",
				explanation: "An IPv4 address in 169.254.0.0/16 is link-local and commonly indicates that DHCP configuration was not obtained.",
			},
			{
				id: "inspect",
				title: "Check the switch port",
				context: "The DHCP service is healthy for other users. The workstation was recently moved to a different desk.",
				prompt: "Which check best tests whether the move changed the workstation's network segment?",
				options: [
					{ id: "vlan", label: "Inspect the switch port's access VLAN and compare it with the workstation's intended VLAN." },
					{ id: "speed", label: "Increase the workstation's link speed without checking the switch." },
					{ id: "dns-flush", label: "Clear the workstation's DNS cache before checking its IP configuration." },
				],
				answer: "vlan",
				explanation: "A port assigned to the wrong VLAN can prevent the client from reaching its expected DHCP scope. Check the segment before changing client settings.",
			},
			{
				id: "verify",
				title: "Verify the fix",
				context: "The port was found in the guest VLAN instead of the employee VLAN. It has now been corrected according to the network plan.",
				prompt: "What is the best next step to verify service restoration?",
				options: [
					{ id: "renew", label: "Renew the DHCP lease, confirm the expected address, gateway, and DNS settings, then test internal access." },
					{ id: "static", label: "Assign an arbitrary static IP address that appears unused." },
					{ id: "close", label: "Close the ticket as soon as the port configuration is saved." },
				],
				answer: "renew",
				explanation: "Renewing the lease and testing the expected configuration confirms that DHCP and end-to-end access are working before documenting resolution.",
			},
		],
	},
};

export default function CompTIAPracticeLab({ programKey }) {
	const lab = PRACTICE_LABS[programKey];
	const [stepIndex, setStepIndex] = useState(0);
	const [selectedOption, setSelectedOption] = useState("");
	const [result, setResult] = useState(null);
	const [completedSteps, setCompletedSteps] = useState([]);
	const step = lab.steps[stepIndex];
	const isComplete = stepIndex === lab.steps.length;

	function checkAnswer() {
		if (!selectedOption) return;
		const isCorrect = selectedOption === step.answer;
		setResult({ isCorrect, explanation: isCorrect ? step.explanation : "Review the scenario evidence and try another response." });
		if (isCorrect) setCompletedSteps((current) => [...current, step.id]);
	}

	function continueLab() {
		setStepIndex((current) => current + 1);
		setSelectedOption("");
		setResult(null);
	}

	function resetLab() {
		setStepIndex(0);
		setSelectedOption("");
		setResult(null);
		setCompletedSteps([]);
	}

	return (
		<main className="min-h-screen bg-[#fffafb] px-4 py-8 text-[#111a2d] sm:px-8 sm:py-12">
			<div className="mx-auto max-w-5xl">
				<Link to={lab.dashboardPath} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#c8102e] shadow-sm transition hover:bg-[#fff1f3]">
					<ArrowLeft size={17} /> Back to CompTIA {lab.name}
				</Link>

				<header className="mt-8 rounded-3xl border border-[#f0cbd3] bg-white p-6 shadow-[0_12px_28px_rgba(200,16,46,0.07)] sm:p-9">
					<div className="inline-flex items-center gap-2 rounded-full border border-[#f0cbd3] bg-[#fff5f6] px-4 py-2 text-sm font-semibold text-[#b20d29]">
						<FlaskConical size={16} /> CompTIA {lab.name} · {lab.certification} Practice Lab
					</div>
					<h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">{lab.scenarioTitle}</h1>
					<p className="mt-3 max-w-3xl leading-7 text-[#66738d]">{lab.scenarioDescription}</p>
					<p className="mt-4 text-sm text-[#66738d]">Original learning scenario · No changes are made to real systems.</p>
				</header>

				<section className="mt-6 overflow-hidden rounded-3xl border border-[#ead7dc] bg-white shadow-sm">
					<div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f2e3e6] px-6 py-4 sm:px-8">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b20d29]">Simulation progress</p>
							<p className="mt-1 text-sm font-semibold text-[#53617a]">
								{isComplete ? "Scenario complete" : `Step ${stepIndex + 1} of ${lab.steps.length}`}
							</p>
						</div>
						<div className="flex items-center gap-3">
							<span className="text-sm text-[#66738d]">{completedSteps.length}/{lab.steps.length} steps correct</span>
							<button type="button" onClick={resetLab} className="inline-flex items-center gap-2 rounded-full border border-[#ead7dc] px-3 py-2 text-sm font-semibold text-[#53617a] transition hover:bg-[#fff5f6]">
								<RotateCcw size={15} /> Reset
							</button>
						</div>
					</div>

					{isComplete ? (
						<div className="p-6 sm:p-8">
							<div className="flex items-start gap-4 rounded-2xl bg-[#f0faf4] p-5 text-[#166534]">
								<CheckCircle2 className="mt-0.5 shrink-0" size={22} />
								<div>
									<h2 className="text-lg font-bold">Nice work — simulation completed.</h2>
									<p className="mt-1 text-sm leading-6">You completed all {completedSteps.length} steps. Reset the lab to try the scenario again.</p>
								</div>
							</div>
						</div>
					) : (
						<div className="p-6 sm:p-8">
							<div className="rounded-2xl bg-[#f8f9fc] p-5">
								<p className="text-sm font-bold text-[#53617a]">{step.title}</p>
								<p className="mt-2 leading-7 text-[#44516a]">{step.context}</p>
							</div>
							<fieldset className="mt-6">
								<legend className="text-lg font-bold leading-7">{step.prompt}</legend>
								<div className="mt-4 space-y-3">
									{step.options.map((option) => (
										<label
											key={option.id}
											className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
												selectedOption === option.id
													? "border-[#c8102e] bg-[#fff5f6]"
													: "border-[#ead7dc] hover:border-[#c8102e]/50 hover:bg-[#fffafb]"
											}`}
										>
											<input
												type="radio"
												name={`practice-step-${step.id}`}
												value={option.id}
												checked={selectedOption === option.id}
												onChange={() => {
													setSelectedOption(option.id);
													setResult(null);
												}}
												className="mt-1 accent-[#c8102e]"
											/>
											<span className="text-sm leading-6 text-[#44516a]">{option.label}</span>
										</label>
									))}
								</div>
							</fieldset>

							{result && (
								<div role={result.isCorrect ? "status" : "alert"} className={`mt-5 flex items-start gap-3 rounded-2xl p-4 ${result.isCorrect ? "bg-[#f0faf4] text-[#166534]" : "bg-[#fff5f0] text-[#9a3412]"}`}>
									{result.isCorrect ? <CheckCircle2 className="mt-0.5 shrink-0" size={19} /> : <XCircle className="mt-0.5 shrink-0" size={19} />}
									<p className="text-sm leading-6">{result.explanation}</p>
								</div>
							)}

							<div className="mt-6 flex flex-wrap justify-end gap-3">
								{result?.isCorrect ? (
									<button type="button" onClick={continueLab} className="inline-flex items-center gap-2 rounded-full bg-[#c8102e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a80e27]">
										{stepIndex === lab.steps.length - 1 ? "Finish simulation" : "Next step"} <ArrowRight size={17} />
									</button>
								) : (
									<button type="button" onClick={checkAnswer} disabled={!selectedOption} className="inline-flex items-center gap-2 rounded-full bg-[#c8102e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#a80e27] disabled:cursor-not-allowed disabled:opacity-40">
										Check response <ArrowRight size={17} />
									</button>
								)}
							</div>
						</div>
					)}
				</section>
			</div>
		</main>
	);
}
