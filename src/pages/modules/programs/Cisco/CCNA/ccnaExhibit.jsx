import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize2, Minus, Plus, X } from "lucide-react";

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
			if (event.touches.length !== 2 || !pinch.current) return;
			event.preventDefault();
			const [x, y] = center(event.touches);
			setScale((current) => {
				pinch.current.scale ??= current;
				const next = pinch.current.scale * (distance(event.touches) / pinch.current.distance);
				queueMicrotask(() => zoomTo(next, x, y));
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
				{import.meta.env.DEV && (
					<>
						<button type="button" className={button} onClick={() => zoomTo(scale / 1.25)} aria-label="Zoom out (dev)"><Minus size={16} /></button>
						<span className="w-11 text-center text-xs font-semibold">{Math.round(scale * 100)}%</span>
						<button type="button" className={button} onClick={() => zoomTo(scale * 1.25)} aria-label="Zoom in (dev)"><Plus size={16} /></button>
					</>
				)}
				<button type="button" className={button} onClick={onClose} aria-label="Close full screen"><X size={18} /></button>
			</div>
			<div ref={scrollerRef} className="flex-1 overflow-auto overscroll-contain" style={{ touchAction: "pan-x pan-y" }}>
				<div className="p-3" style={natural ? { width: natural.width * scale + 24, height: natural.height * scale + 24 } : undefined}>
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
		<div ref={wrapRef} className={`ccna-term overflow-hidden rounded-xl shadow-sm ${className}`}>
			<TerminalBar label={label} onExpand={overflows ? () => setOpenTheme(pageTheme(wrapRef.current)) : null} />
			<pre ref={boxRef} aria-label="Exhibit" className="max-h-96 overflow-auto p-4 text-xs leading-5 sm:text-[13px]"><code>{text}</code></pre>
			{openTheme && (
				<ZoomViewer title={label} theme={openTheme} onClose={() => setOpenTheme(null)}>
					<pre className="ccna-term rounded-lg border-0 p-4 font-mono text-[14px] leading-[1.6]"><code>{text}</code></pre>
				</ZoomViewer>
			)}
		</div>
	);
}

/* Picture exhibit: always expandable, since diagrams shrink a lot on phones. */
export function ExhibitImage({ src, className = "", imageClassName = "", lazy = false }) {
	const [openTheme, setOpenTheme] = useState(null);
	const wrapRef = useRef(null);
	return (
		<div ref={wrapRef} className={`relative w-fit max-w-full ${className}`}>
			<img src={src} alt="Exhibit" loading={lazy ? "lazy" : undefined} className={`w-auto max-w-full rounded-xl border border-[#d6e5e7] bg-white ${imageClassName}`} />
			<button
				type="button"
				onClick={() => setOpenTheme(pageTheme(wrapRef.current))}
				className="absolute right-2 top-2 flex items-center gap-1.5 rounded-full border border-white/25 bg-[#1e2b44]/90 px-3 py-1.5 text-xs font-bold text-white shadow backdrop-blur transition hover:bg-[#28395a]"
			>
				<Maximize2 size={13} /> Expand
			</button>
			{openTheme && (
				<ZoomViewer title="Exhibit" theme={openTheme} onClose={() => setOpenTheme(null)}>
					<img src={src} alt="Exhibit (full screen)" className="block max-w-none rounded-lg bg-white" />
				</ZoomViewer>
			)}
		</div>
	);
}
