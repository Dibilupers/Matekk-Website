export function readPracticeLabProgress(key, validate, storage) {
	let resolvedStorage;
	let serialized;
	try {
		resolvedStorage = storage ?? window.localStorage;
		serialized = resolvedStorage.getItem(key);
	} catch (error) {
		return { value: null, error };
	}

	if (serialized === null) return { value: null, error: null };

	let value;
	try {
		value = JSON.parse(serialized);
	} catch (error) {
		return { value: null, error };
	}

	if (!validate(value)) {
		return { value: null, error: new TypeError("Saved practice lab progress has an invalid structure.") };
	}
	return { value, error: null };
}

export function writePracticeLabProgress(key, value, storage) {
	const resolvedStorage = storage ?? window.localStorage;
	resolvedStorage.setItem(key, JSON.stringify(value));
}
