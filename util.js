export function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function escapeHTML(str) {
	const escapedHtml = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		"'": '&#39;',
		'"': '&quot;'
	};
	return str.replace(/[&<>'"]/g , match => escapedHtml[match]);
}
export default {getRandomInt, escapeHTML}