import { getLocal, saveLocal } from './storage.js';
import { getRandomInt } from './util.js';

chrome.commands.getAll(commands => {
	document.getElementById('addUserCmd').innerText = commands.find(cmd => cmd.name === 'addUser')?.shortcut;
	document.getElementById('clearListCmd').innerText = commands.find(cmd => cmd.name === 'clearList')?.shortcut;
})

async function deleteName(index) {
	const { names } = await getLocal('names');
	names.splice(index, 1);
	saveLocal('names', names);
	loaditems();
}

async function loaditems() {
	const { names } = await getLocal('names');
	listNames.innerHTML = '';
	if (names) {
		names.forEach((name, i) => {
			listNames.innerHTML += `<li><span>${name}</span><button class="delBtn" data-delete="${i}">usuń</button></li>`; 
		});
		document.querySelectorAll('.delBtn')?.forEach(btn => {
			btn.addEventListener('click', e => {
				if (e.target.dataset.delete) deleteName(e.target.dataset.delete);
			})
		})
	}
	if (!listNames.children.length) {
		error.innerHTML = 'Lista użytkowników jest pusta!';
		listNamesHeader.style.display = 'none';
		listNames.style.display = 'none';
		winner.style.display = 'none';
		error.style.color = '#ff4a4a';
		error.style.display = 'block';

		document.querySelector('#randomWinner')?.remove();
		return;
	}
	error.style.display = 'none';
	winner.style.display = 'block';
	listNamesHeader.style.display = 'block';
	
	const randomWinnerButton = document.querySelector('#randomWinner');
	if (!randomWinnerButton) {
		const newButton = document.createElement('button');
		newButton.id = 'randomWinner';
		newButton.innerText = 'Losuj zwycięzcę';
		newButton.onclick = () => {
			Array.from(listNames.children).forEach(child => {
				child.style.backgroundColor = "";
			});
			const selectOneName = listNames.children[getRandomInt(1, listNames.children.length)-1];
			selectOneName.style.backgroundColor = 'green';
			winner.style.color = '#55de4e';
			winner.innerText = `Zwycięzca: ${selectOneName?.textContent?.replaceAll('usuń', '')}`;
		}
		buttons.appendChild(newButton);
	}
}

getNames.onclick = async function() { loaditems() };