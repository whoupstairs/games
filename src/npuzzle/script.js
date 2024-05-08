"use strict";

document.addEventListener("DOMContentLoaded", function () {
  init();
});

function init() {
  const puzzleSizeAttribute = document.currentScript.getAttribute("data-n");
  console.log("puzzleSizeAttribute:", puzzleSizeAttribute); // 属性値をログに出力する
  const puzzleSize = parseInt(puzzleSizeAttribute);
  console.log("puzzleSize:", puzzleSize); // パースされたサイズをログに出力する
  const table = document.getElementById("table");
  const tiles = [];
  createGrid(table, tiles, puzzleSize);
  shuffleTiles(tiles, puzzleSize);
}

function createGrid(table, tiles, puzzleSize) {
  for (let i = 0; i < puzzleSize; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < puzzleSize; j++) {
      const td = document.createElement("td");
      const index = i * puzzleSize + j;
      td.className = "tile";
      td.index = index;
      td.value = index;
      td.textContent = index === 0 ? "" : index;
      td.addEventListener("click", (event) => click(event, tiles, puzzleSize));
      tr.appendChild(td);
      tiles.push(td);
    }
    table.appendChild(tr);
  }
}

function shuffleTiles(tiles, puzzleSize) {
  for (let i = 0; i < 1000; i++) {
    const randomIndex = Math.floor((Math.random() * (puzzleSize - 1)) ^ 2);
    const targetTile = tiles[randomIndex];
    click({ target: targetTile }, tiles, puzzleSize);
  }
}

function click(e, tiles, puzzleSize) {
  const i = e.target.index;
  if (i - puzzleSize >= 0 && tiles[i - puzzleSize].value === 0) {
    swap(tiles, i, i - puzzleSize);
  } else if (
    i + puzzleSize < puzzleSize ** 2 &&
    tiles[i + puzzleSize].value === 0
  ) {
    swap(tiles, i, i + puzzleSize);
  } else if (i % puzzleSize !== 0 && tiles[i - 1].value === 0) {
    swap(tiles, i, i - 1);
  } else if (i % puzzleSize !== puzzleSize - 1 && tiles[i + 1].value === 0) {
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
