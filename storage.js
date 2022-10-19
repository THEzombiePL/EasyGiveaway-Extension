export function saveLocal(key, item) {
	chrome.storage.local.set({[key]: item})
}
export function clearLocal(key) {
	chrome.storage.local.clear(key);
}
export function getLocal(key) {
    return chrome.storage.local.get(key);
}
export default {clearLocal, getLocal, saveLocal}