"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const table = document.getElementById("table");
  const tiles = [];
  createGrid(table, tiles);
  shuffleTiles(tiles);
}

function createGrid(table, tiles) {
  for (let i = 0; i < 4; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 4; j++) {
      const td = document.createElement("td");
      const index = i * 4 + j;
      td.className = "tile";
      td.index = index;
      td.value = index === 15 ? 0 : index + 1; // 最後の枠は空にする
      td.textContent = index === 15 ? "" : index + 1; // 最後の枠は空にする
      td.addEventListener("click", (event) => click(event, tiles));
      tr.appendChild(td);
      tiles.push(td);
    }
    table.appendChild(tr);
  }
}

function shuffleTiles(tiles) {
  for (let i = 0; i < 1000; i++) {
    const randomIndex = Math.floor(Math.random() * 16);
    const targetTile = tiles[randomIndex];
    click({ target: targetTile }, tiles, false);
  }
}

function click(e, tiles, check = true) {
  const i = e.target.index;
  if (i - 4 >= 0 && tiles[i - 4].value === 0) {
    swap(tiles, i, i - 4);
  } else if (i + 4 < 16 && tiles[i + 4].value === 0) {
    swap(tiles, i, i + 4);
  } else if (i % 4 !== 0 && tiles[i - 1].value === 0) {
    swap(tiles, i, i - 1);
  } else if (i % 4 !== 3 && tiles[i + 1].value === 0) {
    swap(tiles, i, i + 1);
  }

  if (check && checkClear(tiles)) {
    clearGame();
  }
}

function swap(tiles, i, j) {
  const tmp = tiles[i].value;
  tiles[i].textContent = tiles[j].textContent;
  tiles[i].value = tiles[j].value;
  tiles[j].textContent = tmp;
  tiles[j].value = tmp;
}

function checkClear(tiles) {
  for (let i = 0; i < 16; i++) {
    if (tiles[i].index !== tiles[i].value - 1 && tiles[i].value !== 0) {
      return false;
    }
  }
  return true;
}

function clearGame() {
  alert("Congraturation");
  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) =>
    tile.removeEventListener("click", (event) => click(event, tiles))
  );
  document.getElementById("resetButton").style.display = "block";
}

function resetGame() {
  const table = document.getElementById("table");
  table.innerHTML = "";
  document.getElementById("resetButton").style.display = "none";
  init();
}
