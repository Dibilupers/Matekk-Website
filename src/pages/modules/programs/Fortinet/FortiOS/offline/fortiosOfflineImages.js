import API_URL from "../../../../../../config/api";

const IMAGE_URLS_STORAGE_KEY = "matekk-fortios-offline-image-urls";
const FORTIOS_MODULE_NAME = "fortinet fortios";
const PRECACHE_MESSAGE_TYPE = "PRECACHE_FORTIOS_EXHIBIT_IMAGES";

export function readFortiOSImageUrls() {
	const saved = window.localStorage.getItem(IMAGE_URLS_STORAGE_KEY);
	if (!saved) return {};

	const parsed = JSON.parse(saved);
	if (!parsed || parsed.version !== 1 || !parsed.urls || typeof parsed.urls !== "object") {
		throw new TypeError("Saved FortiOS exhibit image data has an invalid format.");
	}
	return parsed.urls;
}

export async function loadFortiOSImageUrls(questions) {
	const response = await fetch(`${API_URL}/questions/bank`, { credentials: "include" });
	if (!response.ok) {
		throw new Error(`FortiOS image bank request failed (${response.status}).`);
	}

	const rows = await response.json();
	if (!Array.isArray(rows)) {
		throw new TypeError("The question bank response was not a list.");
	}

	const questionIds = new Set(questions.filter((question) => question.imagePath).map((question) => question.id));
	const urls = Object.fromEntries(rows.flatMap((row) => {
		if (
			!questionIds.has(Number(row.id)) ||
			String(row.module ?? "").trim().toLowerCase() !== FORTIOS_MODULE_NAME ||
			typeof row.imageUrl !== "string" ||
			!/^https?:\/\//i.test(row.imageUrl)
		) {
			return [];
		}
		return [[String(row.id), row.imageUrl]];
	}));

	const savedUrls = readFortiOSImageUrls();
	const mergedUrls = { ...savedUrls, ...urls };
	if (Object.keys(mergedUrls).length === 0) {
		throw new Error("The FortiOS question bank did not return any signed exhibit images.");
	}
	window.localStorage.setItem(IMAGE_URLS_STORAGE_KEY, JSON.stringify({ version: 1, urls: mergedUrls }));
	return mergedUrls;
}

export async function precacheFortiOSImages(imageUrls) {
	const urls = [...new Set(Object.values(imageUrls).filter((url) => typeof url === "string"))];
	if (urls.length === 0) return { cachedCount: 0, failedCount: 0 };
	if (!("serviceWorker" in navigator) || !("MessageChannel" in window)) {
		throw new Error("This browser cannot cache FortiOS exhibit images for offline use.");
	}

	const registration = await navigator.serviceWorker.ready;
	const worker = registration.active;
	if (!worker) throw new Error("The offline cache service worker is not active.");

	return new Promise((resolve, reject) => {
		const channel = new MessageChannel();
		const timeout = window.setTimeout(() => {
			channel.port1.close();
			reject(new Error("Timed out while caching FortiOS exhibit images."));
		}, 120_000);

		channel.port1.onmessage = (event) => {
			window.clearTimeout(timeout);
			channel.port1.close();
			if (event.data?.error) {
				reject(new Error(event.data.error));
				return;
			}
			resolve({
				cachedCount: event.data?.cachedCount ?? 0,
				failedCount: event.data?.failedCount ?? urls.length,
			});
		};

		worker.postMessage({ type: PRECACHE_MESSAGE_TYPE, urls }, [channel.port2]);
	});
}
