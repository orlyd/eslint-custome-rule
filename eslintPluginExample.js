//Example for configuring custom rules
const rule = require("./eslintRule.js");
const plugin = { rules: { "": rule } };
module.exports = plugin;
