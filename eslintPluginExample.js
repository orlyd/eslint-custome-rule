//Example for configuring custom rules
const rule = require("./eslintRule.ts");
const plugin = { rules: { "": rule } };
module.exports = plugin;
