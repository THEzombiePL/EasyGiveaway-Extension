import { clearLocal, getLocal, saveLocal } from './storage.js';

let cl=0;
chrome.commands.onCommand.addListener(async (command) => {
	if (command === 'addUser') {
		const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
		let result;
		try {
			[{result}] = await chrome.scripting.executeScript({
				target: {tabId: tab.id},
				function: () => getSelection().toString(),
			});
		} catch (e) {
			return;
		}
		if (!result.length || result === " ") return;

		let {names} = await getLocal('names');
		if (!names) {
			names = [];
			await saveLocal('names', names);
		}

		names.push(result);
		saveLocal('names', names);
	}

	if (command === 'clearList') {
		cl++;
		if (cl === 2) {
			clearLocal();
			cl=0;
		}
		setTimeout(() => {
			cl=0;
		}, 3000)
	}
});