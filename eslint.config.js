// eslint.config.js
"use strict";

// Import the ESLint plugin locally
const eslintPlugin = require("./eslintPluginExample");

module.exports = [
    {
        files: ["**/*.ts"],
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
        },
        plugins: {
            eslintPlugin
                },
        rules: {
            'eslintPlugin/noConsoleLog': "error",
        },
    }
]
