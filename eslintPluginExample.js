//Example for configuring custom rules
const rule = require("./eslintRule.ts");
const plugin = { rules: { "noConsoleLog": rule } };
module.exports = plugin;
