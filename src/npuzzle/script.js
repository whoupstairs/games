"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
  const size = 5;
  const table = document.getElementById("table");
  const tiles = [];
  createGrid(table, tiles, size);
  shuffleTiles(tiles, size);
}

function createGrid(table, tiles, size) {
  for (let i = 0; i < size; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < size; j++) {
      const td = document.createElement("td");
      const index = i * size + j;
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

function shuffleTiles(tiles, size) {
  for (let i = 0; i < 1000; i++) {
    const randomIndex = Math.floor(Math.random() * size ** 2);
    const targetTile = tiles[randomIndex];
    click({ target: targetTile }, tiles, size);
  }
}

function click(e, tiles, size) {
  const i = e.target.index;
  if (i - size >= 0 && tiles[i - size].value === 0) {
    swap(tiles, i, i - size);
  } else if (i + size < size ** 2 && tiles[i + size].value === 0) {
    swap(tiles, i, i + size);
  } else if (i % size !== 0 && tiles[i - 1].value === 0) {
    swap(tiles, i, i - 1);
  } else if (i % size !== size && tiles[i + 1].value === 0) {
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
