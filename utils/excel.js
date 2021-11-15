// const request = require('request').defaults({ encoding: null });
var request = require("sync-request");
var sizeOf = require("buffer-image-size");
const fs = require("fs");

function getNextAlpha(alpha) {
  let chars = [...alpha].reverse();

  const idx = chars.findIndex((c) => {
    return c.charCodeAt() < "Z".charCodeAt();
  });
  if (idx >= 0) {
    chars[idx] = String.fromCharCode(chars[idx].charCodeAt() + 1);
    for (let i = 0; i < idx; i++) {
      chars[idx] = "A";
    }
  } else {
    chars.push("A");
    chars = chars.map((c) => {
      return "A";
    });
  }
  return chars.reverse().join("");
}
function getNextCellCol(alpha) {
  let chars = [...alpha].reverse();

  const idx = chars.findIndex((c) => {
    return c.charCodeAt() < "Z".charCodeAt();
  });
  if (idx >= 0) {
    chars[idx] = String.fromCharCode(chars[idx].charCodeAt() + 1);
    for (let i = 0; i < idx; i++) {
      chars[idx] = "A";
    }
  } else {
    chars.push("A");
    chars = chars.map((c) => {
      return "A";
    });
  }
  return chars.reverse().join("");
}
function getCellPositionMap({ ex, ey }, { x, y }) {
  return [String.fromCharCode(ex.charCodeAt() + x), +ey + y].join("");
}

const getSheetTables = ({ sheet }) => {
  console.log("sheet", sheet);
  let collector = {};
  let number = 1;

  while (true) {
    if (!sheet[`A${number}`]) {
      break;
    } else {
      let datas = [];
      const range = sheet[`B${number}`]["v"];
      const xStart = [...range.trim()][0];
      const xEnd = [...range.trim()][3];
      const yStart = [...range.trim()][1];
      const yEnd = [...range.trim()][4];

      collector[sheet[`A${number}`]["v"]] = sheet[`B${number}`]["v"];

      for (let y = 0; y <= yEnd.charCodeAt() - yStart.charCodeAt(); y++) {
        //
        datas.push([
          ...new Array(xEnd.charCodeAt() - xStart.charCodeAt()).fill(""),
        ]);
        for (let x = 0; x <= xEnd.charCodeAt() - xStart.charCodeAt(); x++) {
          //
          //
          const cell = sheet[
            getCellPositionMap({ ex: xStart, ey: yStart }, { x: x, y: y })
          ];
          datas[y][x] = cell ? cell.v: undefined
            
        }
      }
      console.log("datas", datas);
    }
    number++;
  }

  console.log("collector", collector);
  return {};
};

module.exports = {
  getSheetTables: getSheetTables,
};
