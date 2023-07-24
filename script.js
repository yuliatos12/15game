// const containerEl = document.querySelector('.container');
// const tileEl = document.querySelectorAll('.tile');
// const shuffleBtn = document.querySelector('.btn');

// const tilesArray = Array.from(tileEl);
// console.log(tilesArray);

// shuffleBtn.addEventListener('click', shuffle);

// function shuffle() {
//     const shuffledArray = tilesArray.sort((a, b) => 0.5 - Math.random());
    
//     containerEl.removeChild(containerEl.firstChild);
    
//     shuffledArray.forEach((tile) => {
//         containerEl.appendChild(tile);
//     });
// }

const containerEl = document.querySelector('.container');
const tilesEl = Array.from(containerEl.querySelectorAll('.tile'));
const shuffleBtn = document.querySelector('.btn');



const countTiles = 16;
tilesEl[countTiles - 1].style.display = 'none';

let tiles = getTiles(
    tilesEl.map((tile) => Number(tile.dataset.number))
);



function getTiles(arr) {
    const tiles = [[], [], [], []];
    let y = 0;
    let x = 0;

    for(let i = 0; i < arr.length; i++) {
        if (x >= 4) {
            y++;
            x = 0;
        }
        tiles[y][x] = arr[i];
        x++;
    }
    return tiles;
}
const flatTiles = tiles.flat();
function shuffleTiles() {
  
    for (let i = flatTiles.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [flatTiles[i], flatTiles[randomIndex]] = [flatTiles[randomIndex], flatTiles[i]];
    }

    let index = 0;
    tilesEl.forEach((tile) => {
        if (tile.style.display !== 'none') {
            tile.textContent = flatTiles[index];
            index++;
        }
    });
}

shuffleTiles();

shuffleBtn.addEventListener('click', shuffleTiles);


