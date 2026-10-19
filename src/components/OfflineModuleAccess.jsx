import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { OFFLINE_PIN_SETUP_DISMISSED_KEY } from "../utils/offlineModulePin";

function OfflinePinForm({ onSubmit, submitLabel, error, isSubmitting }) {
	const [pin, setPin] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		if (!/^\d{4,6}$/.test(pin)) return;
		onSubmit(pin);
	}

	return (
		<form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
			<label className="sr-only" htmlFor="offline-module-pin">4–6 digit offline PIN</label>
			<input
				id="offline-module-pin"
				type="password"
				inputMode="numeric"
				autoComplete="off"
				pattern="[0-9]{4,6}"
				maxLength={6}
				value={pin}
				onChange={(event) => setPin(event.target.value.replace(/\D/g, "").slice(0, 6))}
				placeholder="Enter 4–6 digit PIN"
				aria-invalid={Boolean(error)}
				aria-describedby={error ? "offline-pin-error" : undefined}
				className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-300 px-4 text-slate-900 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
			/>
			<button
				type="submit"
				disabled={isSubmitting || !/^\d{4,6}$/.test(pin)}
				className="min-h-11 rounded-lg bg-cyan-800 px-5 font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
			>
				{isSubmitting ? "Checking…" : submitLabel}
			</button>
			{error && <p id="offline-pin-error" role="alert" className="text-sm text-red-700 sm:basis-full">{error}</p>}
		</form>
	);
}

function OfflinePinSetupNotice() {
	const { configureOfflinePin, hasOfflinePin, profile } = useAuth();
	const isAdmin = profile?.role?.trim().toLowerCase() === "admin";
	const [isDismissed, setIsDismissed] = useState(
		() => sessionStorage.getItem(OFFLINE_PIN_SETUP_DISMISSED_KEY) === "true",
	);
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (!isAdmin || hasOfflinePin || isDismissed) return null;

	async function submitPin(pin) {
		setIsSubmitting(true);
		setError("");
		try {
			await configureOfflinePin(pin);
		} catch (submitError) {
			setError(submitError.message || "Unable to set up offline access.");
		} finally {
			setIsSubmitting(false);
		}
	}

	function dismiss() {
		sessionStorage.setItem(OFFLINE_PIN_SETUP_DISMISSED_KEY, "true");
		setIsDismissed(true);
	}

	return (
		<aside className="mx-auto mt-4 w-full max-w-5xl rounded-xl border border-cyan-200 bg-cyan-50 px-5 py-4 text-slate-800">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<h2 className="font-semibold">Set up offline module access</h2>
					<p className="mt-1 text-sm text-slate-600">
						Verify the admin’s shared PIN once while online. This device can then use it to unlock cached modules offline.
					</p>
				</div>
				<button type="button" onClick={dismiss} className="text-sm font-medium text-slate-600 underline underline-offset-2">
					Not now
				</button>
			</div>
			<OfflinePinForm
				onSubmit={submitPin}
				submitLabel="Set up offline access"
				error={error}
				isSubmitting={isSubmitting}
			/>
		</aside>
	);
}

export default function OfflineModuleAccess({ children, isOnline }) {
	const { hasOfflinePin, isOfflinePinUnlocked, verifyOfflinePin } = useAuth();
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	if (isOnline) {
		return (
			<>
				<OfflinePinSetupNotice />
				{children}
			</>
		);
	}

	if (isOfflinePinUnlocked) return children;

	async function submitPin(pin) {
		setIsSubmitting(true);
		setError("");
		try {
			const verified = await verifyOfflinePin(pin);
			if (!verified) setError("That PIN is incorrect. Try again.");
		} catch (verifyError) {
			setError(verifyError.message || "Unable to verify the offline PIN.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="flex min-h-[70vh] items-center justify-center bg-slate-950 px-5 py-12 text-white">
			<section className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-7 text-slate-900 shadow-2xl">
				<p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-800">Offline learning</p>
				<h1 className="mt-2 text-2xl font-bold">Unlock your modules</h1>
				{hasOfflinePin ? (
					<>
						<p className="mt-2 text-sm leading-6 text-slate-600">Enter the admin’s shared 4–6 digit PIN to continue.</p>
						<OfflinePinForm
							onSubmit={submitPin}
							submitLabel="Unlock modules"
							error={error}
							isSubmitting={isSubmitting}
						/>
					</>
				) : (
					<p className="mt-2 text-sm leading-6 text-slate-600">
						This device has not been set up for offline access yet. Connect while online and have an administrator set up the shared PIN once. After setup, the PIN alone unlocks cached modules offline.
					</p>
				)}
			</section>
		</main>
	);
}
