const OFFLINE_PIN_KEY = "matekk-offline-module-pin";
export const OFFLINE_PIN_SETUP_DISMISSED_KEY = "matekk-offline-pin-setup-dismissed";
const PBKDF2_ITERATIONS = 250000;

function encodeBase64(bytes) {
	return btoa(String.fromCharCode(...bytes));
}

function decodeBase64(value) {
	return Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
}

function readVerifier() {
	const value = localStorage.getItem(OFFLINE_PIN_KEY);
	if (!value) return null;

	try {
		const verifier = JSON.parse(value);
		if (
			verifier?.version !== 1
			|| typeof verifier.salt !== "string"
			|| typeof verifier.hash !== "string"
			|| decodeBase64(verifier.salt).length !== 16
			|| decodeBase64(verifier.hash).length !== 32
		) {
			localStorage.removeItem(OFFLINE_PIN_KEY);
			return null;
		}
		return verifier;
	} catch {
		localStorage.removeItem(OFFLINE_PIN_KEY);
		return null;
	}
}

async function derivePinHash(pin, salt) {
	if (!globalThis.crypto?.subtle) {
		throw new Error("This browser does not support secure offline PIN storage.");
	}
	const key = await crypto.subtle.importKey(
		"raw",
		new TextEncoder().encode(pin),
		"PBKDF2",
		false,
		["deriveBits"],
	);
	return new Uint8Array(await crypto.subtle.deriveBits(
		{ name: "PBKDF2", salt, iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
		key,
		256,
	));
}

export function hasOfflineModulePin() {
	return Boolean(readVerifier());
}

export async function saveOfflineModulePin(pin) {
	if (!/^\d{4,6}$/.test(pin)) {
		throw new Error("The offline PIN must contain 4 to 6 digits.");
	}
	const salt = crypto.getRandomValues(new Uint8Array(16));
	const hash = await derivePinHash(pin, salt);
	localStorage.setItem(OFFLINE_PIN_KEY, JSON.stringify({
		version: 1,
		salt: encodeBase64(salt),
		hash: encodeBase64(hash),
	}));
}

export async function verifyOfflineModulePin(pin) {
	const verifier = readVerifier();
	if (!verifier || !/^\d{4,6}$/.test(pin)) return false;
	const expectedHash = decodeBase64(verifier.hash);
	const actualHash = await derivePinHash(pin, decodeBase64(verifier.salt));
	let difference = 0;
	for (let index = 0; index < expectedHash.length; index += 1) {
		difference |= expectedHash[index] ^ actualHash[index];
	}
	return difference === 0;
}

export function clearOfflineModulePin() {
	localStorage.removeItem(OFFLINE_PIN_KEY);
	sessionStorage.removeItem(OFFLINE_PIN_SETUP_DISMISSED_KEY);
}
