const containerEl = document.querySelector('.container');
const tileEl = document.querySelectorAll('.tile');
const shuffleBtn = document.querySelector('.btn');

const tilesArray = Array.from(tileEl);
console.log(tilesArray);

shuffleBtn.addEventListener('click', shuffle);

function shuffle() {
    const shuffledArray = tilesArray.sort((a, b) => 0.5 - Math.random());
    
    containerEl.removeChild(containerEl.firstChild);
    
    shuffledArray.forEach((tile) => {
        containerEl.appendChild(tile);
    });
}


