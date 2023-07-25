
const containerEl = document.querySelector('.container');
const tilesEl = Array.from(containerEl.querySelectorAll('.tile'));
const shuffleBtn = document.querySelector('.btn');



const countTiles = 16;
tilesEl[countTiles - 1].style.display = 'none';


let tiles = getTiles(
    tilesEl.map((tile) => Number(tile.dataset.number))
);

// console.log(tiles);

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

        tilesPosition(tiles)
    }
    return tiles;
}

function tilesPosition(tiles) {
    for (let y = 0; y < tiles.length; y++) {
        for (let x = 0; x < tiles[y].length; x++) {
            const value = tiles[y][x];
            const tile = tilesEl[value - 1];
            tilesStyles(tile, x, y)
        }
    }
  
 }

 function tilesStyles(tile, x, y) {
    const shift = 100;
    tile.style.transform = `translate3D(${x*shift}%, ${y*shift}%, 0)`
 }



function shuffleTiles() {
    const tempArray = Array.from({ length: countTiles - 1 }, (_, index) => index + 1);
    for (let i = tempArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [tempArray[i], tempArray[randomIndex]] = [tempArray[randomIndex], tempArray[i]];
    }

    let index = 0;
    tilesEl.forEach((tile) => {
            tile.textContent = tempArray[index];
            index++;
    });
   
}

shuffleBtn.addEventListener('click', shuffleTiles);

const emptyTile = 16;

containerEl.addEventListener('click', onTileClick);

function onTileClick(event) {
    const clickedTile = event.target.closest('.tile');
    // console.log(clickedTile);
    
    const tileNumber = Number(clickedTile.dataset.number);
// console.log(tileNumber);
const tileCoordinates = findCoordinatesByNumber(tileNumber, tiles);
const emptyNumberCoordinates = findCoordinatesByNumber(emptyTile, tiles);
// console.log(tileCoordinates);

const swapValid = isSwapValid(tileCoordinates, emptyNumberCoordinates);
// console.log(swapValid);
if (swapValid) {
  swap(emptyNumberCoordinates, tileCoordinates, tiles);
  tilesPosition(tiles);
}
}

function findCoordinatesByNumber(number, tiles) {
for (let y = 0; y < tiles.length; y++) {
    for (let x = 0; x < tiles[y].length; x++) {
        if (tiles[y][x] === number) {
            return {x, y};
        }
    }
}
return null;
}

function isSwapValid (coord1, coord2) {
const diffx = Math.abs(coord1.x - coord2.x);
const diffy = Math.abs(coord1.y - coord2.y);

return (diffx === 1 || diffy === 1) && (coord1.x === coord2.x || coord1.y === coord2.y);
}

function swap(coord1, coord2, tiles) {
    const coord1Number = tiles[coord1.y][coord1.x];
   tiles[coord1.y][coord1.x] = tiles[coord2.y][coord2.x];
   tiles[coord2.y][coord2.x] = coord1Number;

   if (userWon(tiles)) {
    const finishMessage = document.createElement('p');
    finishMessage.textContent = 'Congratulations!';
    containerEl.after(finishMessage);

   }
}
const winningArray = new Array(16).fill(0).map((tile, i) => i + 1);

function userWon(tiles) {
    const flatTiles = tiles.flat();
    for (let i = 0; i < winningArray.length; i++) {
        if (flatTiles[i] !== winningArray[i]) {
           return false;
        }
    }
    return true;
}





 