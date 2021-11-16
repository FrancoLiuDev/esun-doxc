var root = require("app-root-path");
const xl = require("xlsx");
const workbook = xl.readFile("./downloads/api.xlsx");

 
const { getSheetTables,getSheetFixedTable,getSheetＨeadTable } = require(root + "/utils/excel");

const result = getSheetＨeadTable({ sheet: workbook.Sheets["Sheet3"]})


console.log('result', result)