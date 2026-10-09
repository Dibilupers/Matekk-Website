import { useState } from "react";
import { BadgeCheck, Check, Clock3, LogOut, Mail, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AccountPending() {
	const navigate = useNavigate();
	const { profile, logout, refreshProfile } = useAuth();
	const [isChecking, setIsChecking] = useState(false);
	const [message, setMessage] = useState("");

	async function checkStatus() {
		setIsChecking(true);
		setMessage("");
		try {
			const nextProfile = await refreshProfile();
			if (nextProfile?.active_status) {
				navigate("/pages/blank", { replace: true });
			} else {
				setMessage("Your account is still under review.");
			}
		} catch (error) {
			setMessage(error.message || "Unable to check your account status.");
		} finally {
			setIsChecking(false);
		}
	}

	function signOut() {
		logout();
		navigate("/login", { replace: true });
	}

	return (
		<main className="min-h-screen bg-[#f3f6ff] px-4 py-8 font-poppins text-[#14213d] sm:px-8 sm:py-12">
			<div className="mx-auto max-w-[940px] overflow-hidden bg-white shadow-sm">
				<header className="bg-[#2166f3] px-5 pb-16 pt-8 text-white sm:px-12 sm:py-9">
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Almost there!</h1>
					<p className="mt-2 break-words text-sm text-blue-100 sm:text-base">Your account is being reviewed by our team.</p>
				</header>

				<section className="relative mx-auto -mt-10 max-w-[510px] rounded-2xl border border-[#e7edf8] bg-white px-6 pb-8 pt-11 text-center shadow-[0_18px_45px_rgba(32,95,190,0.12)] sm:px-8">
					<div className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-white text-[#2174fa] shadow-sm">
						<BadgeCheck size={32} strokeWidth={1.8} />
					</div>

					<span className="inline-flex items-center gap-2 rounded-full bg-[#fff2c7] px-3 py-1 text-[11px] font-semibold text-[#975a00]">
						<span className="h-1.5 w-1.5 rounded-full bg-[#f0a800]" />
						Pending admin approval
					</span>
					<h2 className="mt-4 text-xl font-bold">Waiting for admin approval</h2>
					<p className="mx-auto mt-2 max-w-[380px] text-sm leading-5 text-[#74819a]">
						Thanks for signing up. An administrator needs to approve your account before you can access courses and your workspace. This usually takes up to 24 hours.
					</p>

					<div className="mt-6 grid grid-cols-3 items-start">
						<div className="flex flex-col items-center">
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2174fa] text-white"><Check size={15} /></span>
							<span className="mt-2 text-[11px] font-medium text-[#3f4d67]">Registered</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#2174fa] text-[11px] font-semibold text-[#2174fa]">2</span>
							<span className="mt-2 text-[11px] font-medium text-[#3f4d67]">Under review</span>
						</div>
						<div className="flex flex-col items-center">
							<span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#dce2ed] text-[11px] font-semibold text-[#94a0b5]">3</span>
							<span className="mt-2 text-[11px] text-[#8792a6]">Access granted</span>
						</div>
					</div>
					<div className="mx-auto mt-5 max-w-[420px] rounded-xl bg-[#f4f7fd] px-4 py-3 text-left text-xs">
						<div className="flex justify-between gap-4 py-1"><span className="text-[#74819a]">Name</span><strong className="text-right">{profile?.username || "—"}</strong></div>
						<div className="flex justify-between gap-4 py-1"><span className="text-[#74819a]">Role</span><strong className="text-right">{profile?.role || "Student"}</strong></div>
						<div className="flex justify-between gap-4 py-1"><span className="text-[#74819a]">Status</span><strong className="text-right text-[#d98200]">Pending</strong></div>
					</div>

					{message && <p role="status" className="mt-3 text-xs text-[#52617a]">{message}</p>}
					<div className="mt-5 flex flex-wrap justify-center gap-2">
						<button type="button" onClick={checkStatus} disabled={isChecking} className="inline-flex h-9 items-center gap-2 rounded-full bg-[#2174fa] px-5 text-xs font-semibold text-white transition hover:bg-[#145fd5] disabled:cursor-wait disabled:opacity-70">
							{isChecking ? <RefreshCw size={14} className="animate-spin" /> : <Clock3 size={14} />}
							{isChecking ? "Checking..." : "Check status"}
						</button>
						<a href="mailto:info@matekkcybercore.com?subject=Account%20approval%20status" className="inline-flex h-9 items-center gap-2 rounded-full border border-[#2174fa] px-5 text-xs font-semibold text-[#2174fa] transition hover:bg-[#f0f5ff]">
							<Mail size={14} /> Contact support
						</a>
					</div>
					<button type="button" onClick={signOut} className="mt-7 inline-flex items-center gap-1 text-[11px] text-[#7b8799] underline underline-offset-2 hover:text-[#2174fa]">
						<LogOut size={13} /> Log out
					</button>
				</section>
			</div>
		</main>
	);
}
