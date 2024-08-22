//Example for configuring custom rules
const rule = require("./eslintRule.js");
const plugin = { rules: { "noConsoleLog": rule } };
module.exports = plugin;
