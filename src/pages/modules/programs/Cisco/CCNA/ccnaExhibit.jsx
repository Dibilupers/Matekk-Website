import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, X } from "lucide-react";

/* Exam exhibits (router output and pictures). Each one can open full screen, where it starts zoomed
   to fit the screen and can be zoomed by touch: pinch with two fingers, drag with one, double-tap to
   switch between "fit" and "zoomed in". On a PC, trackpad pinch / Ctrl + mouse wheel zooms too. */

const MAX_ZOOM = 4;

/* Full-screen, touch-zoomable view of any content (a terminal printout or a picture). */
function ZoomViewer({ title, theme, onClose, children }) {
	const scrollerRef = useRef(null);
	const contentRef = useRef(null);
	const [natural, setNatural] = useState(null); // content size at 100%
	const [fit, setFit] = useState(1);
	const [scale, setScale] = useState(1);
	const pinch = useRef(null);
	const lastTap = useRef(0);

	useEffect(() => {
		const onKey = (event) => { if (event.key === "Escape") onClose(); };
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			window.removeEventListener("keydown", onKey);
		};
	}, [onClose]);

	// Measure the content once it has rendered (pictures: once loaded), then start "fit to screen"
	const measure = useCallback(() => {
		const content = contentRef.current;
		const scroller = scrollerRef.current;
		if (!content || !scroller) return;
		const width = content.scrollWidth;
		const height = content.scrollHeight;
		if (!width || !height) return;
		const fitScale = Math.min(1, (scroller.clientWidth - 24) / width);
		setNatural({ width, height });
		setFit(fitScale);
		setScale(fitScale);
	}, []);
	useLayoutEffect(() => {
		measure();
		const content = contentRef.current;
		content?.querySelectorAll("img").forEach((img) => { if (!img.complete) img.addEventListener("load", measure, { once: true }); });
	}, [measure]);

	// Zoom while keeping the point under the fingers / cursor in place
	const zoomTo = useCallback((nextScale, clientX, clientY) => {
		const scroller = scrollerRef.current;
		if (!scroller) return;
		const clamped = Math.min(MAX_ZOOM, Math.max(fit * 0.75, nextScale));
		setScale((current) => {
			const rect = scroller.getBoundingClientRect();
			const x = (clientX ?? rect.left + rect.width / 2) - rect.left;
			const y = (clientY ?? rect.top + rect.height / 2) - rect.top;
			const contentX = (scroller.scrollLeft + x) / current;
			const contentY = (scroller.scrollTop + y) / current;
			requestAnimationFrame(() => {
				scroller.scrollLeft = contentX * clamped - x;
				scroller.scrollTop = contentY * clamped - y;
			});
			return clamped;
		});
	}, [fit]);

	// Two-finger pinch (we handle it ourselves so the whole page doesn't zoom)
	useEffect(() => {
		const scroller = scrollerRef.current;
		if (!scroller) return undefined;
		const distance = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
		const center = (t) => [(t[0].clientX + t[1].clientX) / 2, (t[0].clientY + t[1].clientY) / 2];
		const onStart = (event) => {
			if (event.touches.length === 2) {
				pinch.current = { distance: distance(event.touches), scale: null };
			} else if (event.touches.length === 1) {
				// Double-tap: toggle between "fit" and 2.5x (zoomed in at the tapped spot)
				const now = Date.now();
				if (now - lastTap.current < 300) {
					event.preventDefault();
					const { clientX, clientY } = event.touches[0];
					setScale((current) => {
						const target = current > fit * 1.2 ? fit : Math.min(MAX_ZOOM, fit * 2.5);
						queueMicrotask(() => zoomTo(target, clientX, clientY));
						return current;
					});
					lastTap.current = 0;
				} else {
					lastTap.current = now;
				}
			}
		};
		const onMove = (event) => {
			const activePinch = pinch.current;
			if (event.touches.length !== 2 || !activePinch) return;
			event.preventDefault();
			const [x, y] = center(event.touches);
			setScale((current) => {
				if (pinch.current !== activePinch) return current;
				activePinch.scale ??= current;
				const next = activePinch.scale * (distance(event.touches) / activePinch.distance);
				queueMicrotask(() => {
					if (pinch.current === activePinch) zoomTo(next, x, y);
				});
				return current;
			});
		};
		const onEnd = (event) => { if (event.touches.length < 2) pinch.current = null; };
		// Trackpad pinch on a laptop arrives as Ctrl + wheel
		const onWheel = (event) => {
			if (!event.ctrlKey) return;
			event.preventDefault();
			setScale((current) => {
				queueMicrotask(() => zoomTo(current * Math.exp(-event.deltaY / 200), event.clientX, event.clientY));
				return current;
			});
		};
		scroller.addEventListener("touchstart", onStart, { passive: false });
		scroller.addEventListener("touchmove", onMove, { passive: false });
		scroller.addEventListener("touchend", onEnd);
		scroller.addEventListener("wheel", onWheel, { passive: false });
		return () => {
			scroller.removeEventListener("touchstart", onStart);
			scroller.removeEventListener("touchmove", onMove);
			scroller.removeEventListener("touchend", onEnd);
			scroller.removeEventListener("wheel", onWheel);
		};
	}, [fit, zoomTo]);

	const button = "ccna-term-btn flex h-9 w-9 items-center justify-center rounded-full transition";
	return createPortal(
		<div role="dialog" aria-modal="true" aria-label={title} data-theme={theme} className="ccna-term-screen topology-zoom-in fixed inset-0 z-1000 flex flex-col">
			<div className="ccna-term-bar flex items-center gap-3 px-4 py-2.5">
				<span className="flex gap-1.5" aria-hidden="true">
					<span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
					<span className="h-3 w-3 rounded-full bg-[#febc2e]" />
					<span className="h-3 w-3 rounded-full bg-[#28c840]" />
				</span>
				<p className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</p>
				<span className="ccna-term-hint hidden text-xs sm:inline">Pinch or Ctrl + scroll to zoom</span>
				<button type="button" className={button} onClick={onClose} aria-label="Close full screen"><X size={18} /></button>
			</div>
			<div ref={scrollerRef} className="flex flex-1 overflow-auto overscroll-contain" style={{ touchAction: "pan-x pan-y" }}>
				<div className="m-auto shrink-0 p-3" style={natural ? { width: natural.width * scale + 24, height: natural.height * scale + 24 } : undefined}>
					<div ref={contentRef} className="w-max origin-top-left" style={{ transform: `scale(${scale})` }}>
						{children}
					</div>
				</div>
			</div>
			<p className="ccna-term-bar ccna-term-hint px-4 py-2 text-center text-xs sm:hidden">Pinch to zoom · double-tap to zoom in or out</p>
		</div>,
		document.body,
	);
}

function TerminalBar({ label, onExpand }) {
	return (
		<div className="ccna-term-bar flex items-center gap-2 rounded-t-xl px-3 py-2">
			<span className="flex gap-1.5" aria-hidden="true">
				<span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
				<span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
			</span>
			<span className="min-w-0 flex-1 truncate text-xs font-semibold">{label}</span>
			{onExpand && (
				<button
					type="button"
					onClick={onExpand}
					className="ccna-term-btn flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition"
				>
					<Maximize2 size={12} /> Expand
				</button>
			)}
		</div>
	);
}

// The exam page's light/dark setting (the full-screen view opens outside the page, so it's passed along)
const pageTheme = (element) => element?.closest("[data-theme]")?.getAttribute("data-theme") ?? "light";

// The device name for the window title, e.g. "R1" from "R1#show ip route"
function terminalLabel(text) {
	const prompt = /^\s*([\w.-]+)(\([\w-]+\))?#/m.exec(text);
	return prompt ? `${prompt[1]} — Terminal` : "Exhibit";
}

/* Router output / configuration text, shown like a terminal window. */
export function ExhibitText({ text, className = "" }) {
	const boxRef = useRef(null);
	const [overflows, setOverflows] = useState(false);
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const label = terminalLabel(text);

	useLayoutEffect(() => {
		const box = boxRef.current;
		if (!box) return undefined;
		const check = () => setOverflows(box.scrollWidth > box.clientWidth + 2 || box.scrollHeight > box.clientHeight + 2);
		check();
		const observer = new ResizeObserver(check);
		observer.observe(box);
		return () => observer.disconnect();
	}, [text]);

	return (
		<div ref={wrapRef} className={`ccna-term relative left-1/2 w-[min(80rem,calc(100vw_-_2rem))] max-w-none -translate-x-1/2 overflow-hidden rounded-xl shadow-sm lg:left-auto lg:w-full lg:translate-x-0 ${className}`}>
			<TerminalBar label={label} onExpand={overflows ? () => setOpenTheme(pageTheme(wrapRef.current)) : null} />
			<pre ref={boxRef} aria-label="Exhibit" className="max-h-96 overflow-auto whitespace-pre p-4 text-xs leading-5 sm:text-[13px]"><code>{text}</code></pre>
			{openTheme && (
				<ZoomViewer title={label} theme={openTheme} onClose={() => setOpenTheme(null)}>
					<pre className="ccna-term rounded-lg border-0 p-4 font-mono text-[14px] leading-[1.6]"><code>{text}</code></pre>
				</ZoomViewer>
			)}
		</div>
	);
}

function TopologyNode({ role, name, details }) {
	return (
		<div className="min-w-0 rounded-xl border border-[#d6e5e7] bg-white px-3 py-3 text-center shadow-sm">
			<p className="text-[11px] font-bold uppercase tracking-wide text-[#70809a]">{role}</p>
			<p className="mt-1 font-bold text-[#17324a]">{name}</p>
			<p className="mt-1 whitespace-pre-line text-xs leading-5 text-[#526584]">{details}</p>
		</div>
	);
}

export function ExhibitDiagram({ type, className = "" }) {
	if (type !== "router-on-a-stick-vlan20") return null;

	return (
		<section aria-label="Network topology exhibit" className={`mb-4 rounded-2xl border border-[#d9e1ef] bg-[#f7f9fc] p-4 sm:p-5 ${className}`}>
			<p className="mb-3 text-xs font-bold uppercase tracking-wide text-[#526584]">Network topology</p>
			<div className="grid gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center">
				<TopologyNode role="Router" name="R1" details={"E0/0\nSubinterface E0/0.20"} />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/0 to E0/0</p>
				<TopologyNode role="Switch" name="SW1" details={"E0/0 trunk\nE0/1 trunk: VLANs 10, 20"} />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/1 to E0/1</p>
				<TopologyNode role="Switch" name="SW2" details={"E0/1 trunk\nE0/2 access: VLAN 20"} />
				<p className="text-center text-xs font-semibold text-[#526584]">E0/2</p>
				<TopologyNode role="End device" name="VLAN 20 host" details="Connected to SW2 E0/2" />
			</div>
		</section>
	);
}

/* Picture exhibit: always expandable, since diagrams shrink a lot on phones. */
export function ExhibitImage({ src, className = "", imageClassName = "", lazy = false, cropTop = false }) {
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	const image = cropTop
		? (
			<div className="aspect-[578/260] w-full overflow-hidden rounded-xl border border-[#d6e5e7] bg-white">
				<img key={src} src={src} alt="Exhibit" loading={lazy ? "lazy" : undefined} className={`h-full w-full object-cover object-top ${imageClassName}`} />
			</div>
		)
		: <img key={src} src={src} alt="Exhibit" loading={lazy ? "lazy" : undefined} className={`w-auto max-w-full rounded-xl border border-[#d6e5e7] bg-white ${imageClassName}`} />;
	return (
		<div ref={wrapRef} className={`relative mx-auto ${cropTop ? "w-full max-w-[36rem]" : "w-fit max-w-full"} ${className}`}>
			{image}
			<button
				type="button"
				onClick={() => setOpenTheme(pageTheme(wrapRef.current))}
				className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-white/25 bg-[#1e2b44]/90 px-3 py-1.5 text-xs font-bold text-white shadow backdrop-blur transition hover:bg-[#28395a]"
			>
				<Maximize2 size={13} /> Expand
			</button>
			{openTheme && (
				<ZoomViewer title="Exhibit" theme={openTheme} onClose={() => setOpenTheme(null)}>
					{cropTop
						? (
							<div className="aspect-[578/260] w-[36rem] max-w-[90vw] overflow-hidden rounded-lg bg-white">
								<img src={src} alt="Exhibit (full screen)" className="h-full w-full object-cover object-top" />
							</div>
						)
						: <img src={src} alt="Exhibit (full screen)" className="block max-w-none rounded-lg bg-white" />}
				</ZoomViewer>
			)}
		</div>
	);
}
