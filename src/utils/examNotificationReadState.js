const STORAGE_KEY_PREFIX = "matekk-exam-notifications-read:";
const DISMISSED_STORAGE_KEY_PREFIX = "matekk-exam-notifications-dismissed:";

export function getExamNotificationReadStorageKey(userId) {
	return `${STORAGE_KEY_PREFIX}${encodeURIComponent(String(userId))}`;
}

export function getExamNotificationDismissedStorageKey(userId) {
	return `${DISMISSED_STORAGE_KEY_PREFIX}${encodeURIComponent(String(userId))}`;
}

export function getExamNotificationReadId(notification) {
	return `${notification.id}:${notification.sessionId}:${notification.status}:${notification.submittedAt}`;
}

export function shouldShowExamNotification(notification, dismissedIds) {
	return notification.status === "in-progress" ||
		!dismissedIds.has(getExamNotificationReadId(notification));
}

function readNotificationIds(storage, key, description) {
	const value = storage.getItem(key);
	if (value === null) return [];
	try {
		const parsed = JSON.parse(value);
		if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) {
			throw new TypeError(`Saved exam notification ${description} has an invalid format.`);
		}
		return parsed;
	} catch (error) {
		console.error(`Unable to read saved exam notification ${description}.`, error);
		return [];
	}
}

function writeNotificationIds(storage, key, ids, description) {
	try {
		storage.setItem(key, JSON.stringify([...ids]));
	} catch (error) {
		console.error(`Unable to save exam notification ${description}.`, error);
	}
}

export function readExamNotificationReadIds(storage, userId) {
	return readNotificationIds(storage, getExamNotificationReadStorageKey(userId), "read state");
}

export function writeExamNotificationReadIds(storage, userId, readIds) {
	writeNotificationIds(storage, getExamNotificationReadStorageKey(userId), readIds, "read state");
}

export function readExamNotificationDismissedIds(storage, userId) {
	return readNotificationIds(storage, getExamNotificationDismissedStorageKey(userId), "dismissed state");
}

export function writeExamNotificationDismissedIds(storage, userId, dismissedIds) {
	writeNotificationIds(storage, getExamNotificationDismissedStorageKey(userId), dismissedIds, "dismissed state");
}
