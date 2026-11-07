const STORAGE_KEY_PREFIX = "matekk-exam-notifications-read:";

export function getExamNotificationReadStorageKey(userId) {
	return `${STORAGE_KEY_PREFIX}${encodeURIComponent(String(userId))}`;
}

export function getExamNotificationReadId(notification) {
	return `${notification.id}:${notification.sessionId}:${notification.status}:${notification.submittedAt}`;
}

export function readExamNotificationReadIds(storage, userId) {
	const value = storage.getItem(getExamNotificationReadStorageKey(userId));
	if (value === null) return [];
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) {
			throw new TypeError("Saved exam notification read state has an invalid format.");
		}
		return parsed;
	} catch (error) {
		console.error("Unable to read saved exam notification read state.", error);
		return [];
	}
}

export function writeExamNotificationReadIds(storage, userId, readIds) {
	try {
		storage.setItem(
			getExamNotificationReadStorageKey(userId),
			JSON.stringify([...readIds]),
		);
	} catch (error) {
		console.error("Unable to save exam notification read state.", error);
	}
}
