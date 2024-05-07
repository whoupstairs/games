"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
  const table = document.getElementById("table");
  const tiles = [];
  createGrid(table, tiles);
  shuffleTiles(tiles);
}

function createGrid(table, tiles) {
  for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 3; j++) {
      const td = document.createElement("td");
      const index = i * 3 + j;
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
    const randomIndex = Math.floor(Math.random() * 9);
    const targetTile = tiles[randomIndex];
    click({ target: targetTile }, tiles);
  }
}

function click(e, tiles) {
  const i = e.target.index;
  if (i - 3 >= 0 && tiles[i - 3].value === 0) {
    swap(tiles, i, i - 3);
  } else if (i + 3 < 9 && tiles[i + 3].value === 0) {
    swap(tiles, i, i + 3);
  } else if (i % 3 !== 0 && tiles[i - 1].value === 0) {
    swap(tiles, i, i - 1);
  } else if (i % 3 !== 2 && tiles[i + 1].value === 0) {
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
