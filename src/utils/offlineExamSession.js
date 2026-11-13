export function getOfflineExamSessionKey(programKey, examKey, userId) {
	const userKey = userId === null || userId === undefined || String(userId).trim() === ""
		? "device"
		: encodeURIComponent(String(userId));
	return `matekk-offline-exam:${userKey}:${programKey}:${examKey}`;
}

export function getOfflineExamSessionKeys(programKey, examKey, userId) {
	const currentKey = getOfflineExamSessionKey(programKey, examKey, userId);
	const deviceKey = getOfflineExamSessionKey(programKey, examKey, null);
	return currentKey === deviceKey ? [currentKey] : [currentKey, deviceKey];
}
