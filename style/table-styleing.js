var root = require("app-root-path");
 
const {STYLE_TTABLE_API} = require("./tables/style-table-api");


module.exports = {
  STYLE_TTABLE_API: () => {
    return  STYLE_TTABLE_API()
  },
};
