"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
  const table = document.getElementById("table");
  const tiles = [];
  createGrid(table, tiles);
  shuffleTiles(tiles);
}

function createGrid(table, tiles) {
  for (let i = 0; i < 5; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      const td = document.createElement("td");
      const index = i * 5 + j;
      td.className = "tile";
      td.index = index;
      td.value = index;
      td.textContent = index === 0 ? "" : index;
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
    click({ target: targetTile }, tiles);
  }
}

function click(e, tiles) {
  const i = e.target.index;
  if (i - 5 >= 0 && tiles[i - 5].value === 0) {
    swap(tiles, i, i - 5);
  } else if (i + 5 < 25 && tiles[i + 5].value === 0) {
    swap(tiles, i, i + 5);
  } else if (i % 5 !== 0 && tiles[i - 1].value === 0) {
    swap(tiles, i, i - 1);
  } else if (i % 5 !== 5 && tiles[i + 1].value === 0) {
    swap(tiles, i, i + 1);
  }
}

function swap(tiles, i, j) {
  const tmp = tiles[i].value;
  tiles[i].textContent = tiles[j].textContent;
  tiles[i].value = tiles[j].value;
  tiles[j].textContent = tmp;
  tiles[j].value = tmp;
}
