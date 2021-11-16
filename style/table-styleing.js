var root = require("app-root-path");
 
const {STYLE_TABLE_API} = require("./tables/style-table-api");
const {STYLE_TABLE_UI_DESCRIPTION} = require("./tables/style-table-view-discription");
const {STYLE_TABLE_UI_FIELD_DESCRIPTION,STYLE_TABLE_UI_BUTTON_DESCRIPTION} = require("./tables/style-table-field-discription.js");
const {STYLE_TABLE_DOC_VERSIONS} = require("./tables/style-table-doc-version");

module.exports = {
  STYLE_TABLE_API,
  STYLE_TABLE_UI_DESCRIPTION,
  STYLE_TABLE_UI_FIELD_DESCRIPTION,
  STYLE_TABLE_UI_BUTTON_DESCRIPTION,
  STYLE_TABLE_DOC_VERSIONS
};
