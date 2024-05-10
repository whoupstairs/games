"use strict";
document.addEventListener("DOMContentLoaded", init);

function init() {
  const size = 7;
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
      // イベントリスナーに関数を渡す代わりに、関数を返す関数を使用する
      td.addEventListener("click", createClickHandler(tiles, size));
      tr.appendChild(td);
      tiles.push(td);
    }
    table.appendChild(tr);
  }
}

// イベントリスナー用の関数を返す関数
function createClickHandler(tiles, size) {
  return function (event) {
    const i = event.target.index;
    if (i - size >= 0 && tiles[i - size].value === 0) {
      swap(tiles, i, i - size);
    } else if (i + size < size ** 2 && tiles[i + size].value === 0) {
      swap(tiles, i, i + size);
    } else if (i % size !== 0 && tiles[i - 1].value === 0) {
      swap(tiles, i, i - 1);
    } else if (i % size !== size && tiles[i + 1].value === 0) {
      swap(tiles, i, i + 1);
    }
  };
}

function shuffleTiles(tiles, size) {
  const directions = ["up", "down", "left", "right"];

  for (let i = 0; i < 1000; i++) {
    const randomIndex = Math.floor(Math.random() * directions.length);
    const direction = directions[randomIndex];
    const emptyTileIndex = tiles.findIndex((tile) => tile.value === 0);

    let targetIndex;
    switch (direction) {
      case "up":
        if (emptyTileIndex - size >= 0) {
          targetIndex = emptyTileIndex - size;
        }
        break;
      case "down":
        if (emptyTileIndex + size < size ** 2) {
          targetIndex = emptyTileIndex + size;
        }
        break;
      case "left":
        if (emptyTileIndex % size !== 0) {
          targetIndex = emptyTileIndex - 1;
        }
        break;
      case "right":
        if (emptyTileIndex % size !== size - 1) {
          targetIndex = emptyTileIndex + 1;
        }
        break;
    }

    if (targetIndex !== undefined) {
      swap(tiles, emptyTileIndex, targetIndex);
    }
  }

  // シャッフル後、0のタイルを非表示にする
  tiles.forEach((tile) => {
    if (tile.value === 0) {
      tile.textContent = ""; // 0の場合は数字を表示しない
    }
  });
}

function swap(tiles, i, j) {
  const tmp = tiles[i].value;
  tiles[i].textContent = tiles[j].textContent;
  tiles[i].value = tiles[j].value;
  tiles[j].textContent = tmp;
  tiles[j].value = tmp;
}
