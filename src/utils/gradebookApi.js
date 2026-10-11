import API_URL from "../config/api";

const PENDING_ASSESSMENTS_PREFIX = "matekk-gradebook-pending";
const CACHED_ASSESSMENTS_PREFIX = "matekk-gradebook-cache";
const activeFlushes = new Map();
const onlineSyncHandlers = new Map();

function getScope(userId, programKey) {
	if ((typeof userId !== "string" && typeof userId !== "number") || String(userId).trim() === "") {
		throw new TypeError("A signed-in user is required to access the gradebook.");
	}
	if (typeof programKey !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(programKey)) {
		throw new TypeError("The gradebook program key must be a lowercase slug.");
	}
	return `${PENDING_ASSESSMENTS_PREFIX}:${encodeURIComponent(String(userId))}:${programKey}`;
}

function isValidAssessment(assessment) {
	return typeof assessment?.id === "string" &&
		assessment.id.length > 0 &&
		Number.isFinite(assessment.score) &&
		Number.isFinite(assessment.maxScore) &&
		assessment.maxScore > 0 &&
		Number.isFinite(assessment.submittedAt);
}

function readPendingAssessments(scope) {
	const serialized = window.localStorage.getItem(scope);
	if (!serialized) return [];
	try {
		const assessments = JSON.parse(serialized);
		if (!Array.isArray(assessments)) throw new TypeError("Pending gradebook assessments must be an array.");
		return assessments.filter(isValidAssessment);
	} catch (error) {
		console.error("Unable to restore pending gradebook assessments.", error);
		window.localStorage.removeItem(scope);
		return [];
	}
}

function writePendingAssessments(scope, assessments) {
	if (assessments.length) {
		window.localStorage.setItem(scope, JSON.stringify(assessments));
	} else {
		window.localStorage.removeItem(scope);
	}
}

function readCachedAssessments(scope) {
	const serialized = window.localStorage.getItem(`${CACHED_ASSESSMENTS_PREFIX}:${scope}`);
	if (!serialized) return [];
	try {
		const assessments = JSON.parse(serialized);
		if (!Array.isArray(assessments)) throw new TypeError("Cached gradebook assessments must be an array.");
		return assessments.filter(isValidAssessment);
	} catch (error) {
		console.error("Unable to restore cached gradebook assessments.", error);
		window.localStorage.removeItem(`${CACHED_ASSESSMENTS_PREFIX}:${scope}`);
		return [];
	}
}

function writeCachedAssessments(scope, assessments) {
	window.localStorage.setItem(`${CACHED_ASSESSMENTS_PREFIX}:${scope}`, JSON.stringify(assessments));
}

function mergeAssessments(...assessmentLists) {
	const merged = new Map();
	for (const assessments of assessmentLists) {
		for (const assessment of assessments) merged.set(assessment.id, assessment);
	}
	return [...merged.values()];
}

function enqueueAssessments(scope, assessments) {
	const byId = new Map(readPendingAssessments(scope).map((assessment) => [assessment.id, assessment]));
	for (const assessment of assessments) byId.set(assessment.id, assessment);
	writePendingAssessments(scope, [...byId.values()]);
}

function removeFlushedAssessments(scope, sentAssessments) {
	const sentById = new Map(sentAssessments.map((assessment) => [assessment.id, JSON.stringify(assessment)]));
	const pending = readPendingAssessments(scope).filter((assessment) =>
		sentById.get(assessment.id) !== JSON.stringify(assessment),
	);
	writePendingAssessments(scope, pending);
}

async function readResponse(response) {
	const body = await response.text();
	if (!response.ok) {
		let detail = "";
		try {
			const errorBody = JSON.parse(body);
			const message = errorBody?.message;
			if (typeof message === "string") detail = message;
			else if (Array.isArray(message)) detail = message.filter((item) => typeof item === "string").join(" ");
		} catch {
			// Keep the HTTP status when a proxy returns a non-JSON error body.
		}
		throw new Error(`Gradebook request failed (${response.status})${detail ? `: ${detail}` : "."}`);
	}
	if (!body.trim()) return null;
	try {
		return JSON.parse(body);
	} catch {
		const contentType = response.headers.get("content-type") ?? "unknown content type";
		throw new TypeError(
			`The gradebook API returned a non-JSON response (${contentType}). Check that VITE_API_URL points to the backend.`,
		);
	}
}

async function flushPendingAssessments(scope, programKey) {
	const activeFlush = activeFlushes.get(scope);
	if (activeFlush) {
		await activeFlush;
		if (readPendingAssessments(scope).length) {
			return flushPendingAssessments(scope, programKey);
		}
		return;
	}

	const pending = readPendingAssessments(scope);
	if (!pending.length) return;
	if (typeof navigator !== "undefined" && !navigator.onLine) {
		throw new Error("You are offline. This assessment is saved on this device and will sync when you reconnect.");
	}

	const flush = (async () => {
		for (const assessment of pending) {
			const response = await fetch(`${API_URL}/gradebook/${encodeURIComponent(programKey)}/assessments`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ assessment }),
			});
			await readResponse(response);
		}
		removeFlushedAssessments(scope, pending);
	})();
	activeFlushes.set(scope, flush);
	try {
		await flush;
	} finally {
		if (activeFlushes.get(scope) === flush) activeFlushes.delete(scope);
	}

	if (readPendingAssessments(scope).length) {
		return flushPendingAssessments(scope, programKey);
	}
}

function ensureOnlineSync(scope, userId, programKey) {
	if (onlineSyncHandlers.has(scope)) return;
	const handleOnline = () => {
		void flushPendingAssessments(scope, programKey).catch((error) => {
			console.error(`Unable to sync pending ${programKey} gradebook assessments for user ${userId}.`, error);
		});
	};
	onlineSyncHandlers.set(scope, handleOnline);
	window.addEventListener("online", handleOnline);
}

export async function readGradebookAssessments(programKey, userId) {
	const scope = getScope(userId, programKey);
	const pending = readPendingAssessments(scope);
	let remoteAssessments = [];
	try {
		if (typeof navigator !== "undefined" && !navigator.onLine) {
			throw new Error("You are offline.");
		}
		const response = await fetch(`${API_URL}/gradebook/${encodeURIComponent(programKey)}`, {
			credentials: "include",
		});
		const gradebook = await readResponse(response);
		const assessments = gradebook?.data?.assessments;
		if (assessments !== undefined && assessments !== null) {
			if (typeof assessments !== "object" || Array.isArray(assessments)) {
				throw new TypeError("The saved gradebook assessments have an invalid format.");
			}
			remoteAssessments = Object.values(assessments).filter(isValidAssessment);
		}
	} catch (error) {
		const cached = readCachedAssessments(scope);
		const localAssessments = mergeAssessments(cached, pending);
		if (!localAssessments.length) throw error;
		console.error(`Unable to load the backend ${programKey} gradebook; showing locally cached results.`, error);
		if (pending.length) ensureOnlineSync(scope, userId, programKey);
		return localAssessments;
	}

	const assessments = mergeAssessments(remoteAssessments, pending);
	writeCachedAssessments(scope, assessments);
	if (pending.length) {
		ensureOnlineSync(scope, userId, programKey);
		void flushPendingAssessments(scope, programKey).catch((error) => {
			console.error(`Unable to sync pending ${programKey} gradebook assessments for user ${userId}.`, error);
		});
	}

	return assessments;
}

export async function saveGradebookAssessments(programKey, assessments, userId) {
	const scope = getScope(userId, programKey);
	if (!Array.isArray(assessments) || assessments.some((assessment) => !isValidAssessment(assessment))) {
		throw new TypeError("Gradebook assessments must include an ID, valid score, maximum score, and submission time.");
	}
	if (assessments.length === 0) return;

	enqueueAssessments(scope, assessments);
	writeCachedAssessments(scope, mergeAssessments(readCachedAssessments(scope), assessments));
	ensureOnlineSync(scope, userId, programKey);
	await flushPendingAssessments(scope, programKey);
}

export async function saveGradebookAssessment(programKey, assessment, userId) {
	return saveGradebookAssessments(programKey, [assessment], userId);
}
