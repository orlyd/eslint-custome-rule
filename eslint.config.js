// eslint.config.js
"use strict";

// Import the ESLint plugin locally
// const eslintPluginExample = require("./eslintPluginExample");

module.exports = [
    {
        files: ["**/*.ts"],
        languageOptions: {
            sourceType: "commonjs",
            ecmaVersion: "latest",
        },
        // Using the eslint-plugin-example plugin defined locally
        plugins: {"example": eslintPluginExample},
        rules: {
            //TODO: Add rules here, as the example below
            // "example/noConsoleLog": "error",

        },
    }
]
