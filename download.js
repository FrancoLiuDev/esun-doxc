

const fs = require("fs");
var root = require("app-root-path");
const { downloadFile } = require("./utils/download");
const { sdUrl } = require(root + "/utils/download");
const f = downloadFile(sdUrl + "sd-file/手續費.xlsx",'./downloads/手續費.xlsx')