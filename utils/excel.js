// const request = require('request').defaults({ encoding: null });
var request = require("sync-request");
var sizeOf = require("buffer-image-size");
const fs = require("fs");

const detectLimitRetry = 5;

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
  let collector = {};
  let number = 1;

  while (true) {
    if (!sheet[`A${number}`]) {
      break;
    } else {
      let datas = [];
      const range = sheet[`B${number}`]["v"].trim().split(":");
      const xStart = [...range[0]].slice(0, 1).join("");
      const xEnd = [...range[1]].slice(0, 1).join("");
      const yStart = [...range[0]].slice(1).join("");
      const yEnd = [...range[1]].slice(1).join("");
      for (let y = 0; y <= +yEnd - +yStart; y++) {
        datas.push([
          ...new Array(xEnd.charCodeAt() - xStart.charCodeAt()).fill("ee"),
        ]);
        for (let x = 0; x <= xEnd.charCodeAt() - xStart.charCodeAt(); x++) {
          const cell =
            sheet[
              getCellPositionMap({ ex: xStart, ey: yStart }, { x: x, y: y })
            ];
          datas[y][x] = cell ? cell.v : undefined;
        }
      }
      collector[sheet[`A${number}`]["v"]] = datas;
    }
    number++;
  }
  return collector;
};

const getSheetFixedTable = ({ sheet }) => {
  let recordCnt = 1;
  let alpha = "A";
  while (true) {
    if (!sheet[`A${recordCnt}`]) {
      recordCnt = recordCnt - 1;
      break;
    }
    recordCnt++;
  }
  while (true) {
    if (!sheet[`${alpha}1`]) {
      alpha = String.fromCharCode(alpha.charCodeAt() - 1);
      break;
    } else {
      alpha = getNextAlpha(alpha);
    }
  }
  let datas = [];
  const range = `A1:${alpha}${recordCnt}`.trim().split(":");
  const xStart = [...range[0]].slice(0, 1).join("");
  const xEnd = [...range[1]].slice(0, 1).join("");
  const yStart = [...range[0]].slice(1).join("");
  const yEnd = [...range[1]].slice(1).join("");
  for (let y = 0; y <= +yEnd - +yStart; y++) {
    datas.push([
      ...new Array(xEnd.charCodeAt() - xStart.charCodeAt()).fill("ee"),
    ]);
    for (let x = 0; x <= xEnd.charCodeAt() - xStart.charCodeAt(); x++) {
      let cell =
        sheet[getCellPositionMap({ ex: xStart, ey: yStart }, { x: x, y: y })];

      if (cell && "v" in cell && typeof cell.w !== "string") {
        cell = "" + cell.w;
      }

      datas[y][x] = cell ? cell.w : undefined;
    }
  }

  return datas;
};

const getSheetＨeadTable = ({ sheet }) => {

  
  console.log('sheet',sheet['!merges'])
  //detectLimitRetry
  let recordCnt = 1;
  let retry = 0;
  let alpha = "A";
  while (true) {
    if (!sheet[`A${recordCnt}`]) {
      recordCnt++;
      retry = retry + 1;
      if (retry > detectLimitRetry){
        console.log('retry',retry)
        break;
      } 
    } else {
      
      retry = 0;
      recordCnt++;
    }
  }
  return [];
};

module.exports = {
  getSheetTables: getSheetTables,
  getSheetFixedTable: getSheetFixedTable,
  getSheetＨeadTable: getSheetＨeadTable,
};
