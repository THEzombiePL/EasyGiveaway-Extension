import { getLocal, saveLocal } from './storage.js';
import { getRandomInt } from './util.js';

chrome.commands.getAll(commands => {
	document.getElementById('addUserCmd').innerText = commands.find(cmd => cmd.name === 'addUser')?.shortcut;
	document.getElementById('clearListCmd').innerText = commands.find(cmd => cmd.name === 'clearList')?.shortcut;
})

const getNamesButton = document.querySelector('#getNames');
const namesList = document.querySelector('ul#listNames');
const buttonsList = document.querySelector('#buttons');
const listNamesHeader = document.querySelector('#listNamesHeader');
const winner = document.querySelector('#winner');
const error = document.querySelector('#error');

async function deleteName(index) {
	const { names } = await getLocal('names');
	names.splice(index, 1);
	saveLocal('names', names);
	loaditems();
}

async function loaditems() {
	const { names } = await getLocal('names');
	namesList.innerHTML = '';
	if (names) {
		names.forEach((name, i) => {
			namesList.innerHTML += `<li><span>${name}</span><button class="delBtn" data-delete="${i}">usuń</button></li>`; 
		});
		document.querySelectorAll('.delBtn')?.forEach(el => {
			el.addEventListener('click', e => {
				if(e.target.dataset.delete) {
					deleteName(e.target.dataset.delete);
				}
			})
		})
	}
	if (!namesList.children.length) {
		error.innerHTML = 'Lista użytkowników jest pusta!';
		listNamesHeader.style.display = 'none';
		namesList.style.display = 'none';
		winner.style.display = 'none';
		document.querySelector('#randomWinner')?.remove();
		error.style.color = '#ff4a4a';
		error.style.display = 'block';
		return;
	}
	error.style.display = 'none';
	winner.style.display = 'block';
	// listNamesHeader.innerHTML = 'Lista użytkowników:';
	namesList.style.maxHeight = '150px';
	const randomWinnerButton = document.querySelector('#randomWinner');
	if (!randomWinnerButton) {
		const newButton = document.createElement('button');
		newButton.id = 'randomWinner';
		newButton.innerText = 'Losuj zwycięzcę'
		buttonsList.appendChild(newButton);
		newButton.onclick = () => {
			Array.from(namesList.children).forEach(child => {
				child.style.backgroundColor = "";
			});
			const selectOneName = namesList.children[getRandomInt(1, namesList.children.length)-1];
			selectOneName.style.backgroundColor = 'green';
			winner.style.color = '#55de4e';
			winner.innerText = `Zwycięzca: ${selectOneName?.textContent?.replaceAll('usuń', '')}`;
		}
	}
}
getNamesButton.onclick = async function() { loaditems() };
/*
getNamesButton.onclick = async () => {
	const list = await getLocal('names');
	const { names } = list;
	namesList.innerHTML = '';
	if (names) {
		names.forEach((name, i) => {
			namesList.innerHTML += `<li><span>${name}</span><button onclick="${i}">Del</button></li>`; 
		});
	}
	if (!namesList.children.length) {
		error.innerHTML = 'Lista użytkowników jest pusta!';
		error.style.color = '#ff4a4a';
		error.style.display = 'block';
		return;
	}
	error.style.display = 'none';
	winner.style.display = 'block';
	listNamesHeader.innerHTML = 'Lista użytkowników:';
	const randomWinnerButton = document.querySelector('#randomWinner');
	if (!randomWinnerButton) {
		const newButton = document.createElement('button');
		newButton.id = 'randomWinner';
		newButton.innerText = 'Losuj zwycięzcę'
		buttonsList.appendChild(newButton);
		newButton.onclick = () => {
			Array.from(namesList.children).forEach(child => {
				child.style.backgroundColor = "";
			});
			const selectOneName = namesList.children[getRandomInt(1, namesList.children.length)-1];
			selectOneName.style.backgroundColor = 'green';
			winner.style.color = '#55de4e';
			winner.innerText = `Zwycięzca: ${selectOneName?.textContent}`;
		}
	}
}
*/
