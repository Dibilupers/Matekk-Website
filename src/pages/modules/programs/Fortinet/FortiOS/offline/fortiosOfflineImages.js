const PRECACHE_MESSAGE_TYPE = "PRECACHE_FORTIOS_EXHIBIT_IMAGES";
const FORTIOS_EXHIBIT_ASSETS = import.meta.glob("./fortios-exhibits/*.png", {
	eager: true,
	import: "default",
	query: "?url",
});
const FORTIOS_EXHIBIT_URLS_BY_NAME = Object.fromEntries(
	Object.entries(FORTIOS_EXHIBIT_ASSETS).map(([path, url]) => [path.split("/").at(-1), url]),
);

export function getFortiOSBundledImageUrl(imagePath) {
	if (typeof imagePath !== "string") return undefined;
	return FORTIOS_EXHIBIT_URLS_BY_NAME[imagePath.split("/").at(-1)];
}

export function getFortiOSImageUrls(questions) {
	return Object.fromEntries(questions.flatMap((question) => {
		const imageUrl = getFortiOSBundledImageUrl(question.imagePath);
		return imageUrl ? [[String(question.id), imageUrl]] : [];
	}));
}

export async function precacheFortiOSImages(imageUrls) {
	const urls = [...new Set(Object.values(imageUrls)
		.filter((url) => typeof url === "string")
		.map((url) => new URL(url, window.location.origin).href))];
	if (urls.length === 0) return { cachedCount: 0, failedCount: 0 };
	if (!("serviceWorker" in navigator) || !("MessageChannel" in window)) {
		throw new Error("This browser cannot prepare FortiOS exhibit images for offline use.");
	}

	const registration = await navigator.serviceWorker.ready;
	const worker = registration.active;
	if (!worker) throw new Error("The offline cache service worker is not active.");

	return new Promise((resolve, reject) => {
		const channel = new MessageChannel();
		const timeout = window.setTimeout(() => {
			channel.port1.close();
			reject(new Error("Timed out while preparing FortiOS exhibit images."));
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
