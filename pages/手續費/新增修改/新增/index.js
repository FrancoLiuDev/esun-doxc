
var root = require('app-root-path');
const { IMAGE_UI_FORM } = require(root + "/style/image-styleing");
const { STRING_RUN_BLOCK_ARRAY_LIST } = require(root + "/style/run-string-style");
const {UIDESIGN}  = require('./display');
const {FIELD_DEFINE}  = require('./fields');
const {FIELD_CHECK}  = require('./checks');
const {LOGIC_DEFINE}  = require('./logic');
const {SERVICE_DEFINE}  = require('./service');
module.exports = {
  body: {
    content: [
      UIDESIGN,
      FIELD_DEFINE,
      FIELD_CHECK,
      LOGIC_DEFINE,
      SERVICE_DEFINE,
    ],
  },
   
};
