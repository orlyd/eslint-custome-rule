"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noConsoleLog = void 0;
const utils_1 = require("@typescript-eslint/utils");
const createRule = utils_1.ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);
exports.noConsoleLog = createRule({
    name: 'no-console-log',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow the use of console.log',
        },
        messages: {
            noConsoleLog: 'Unexpected console.log statement.',
        },
        fixable: 'code',
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if (node.callee.type === 'MemberExpression' &&
                    node.callee.object.type === 'Identifier' &&
                    node.callee.object.name === 'console' &&
                    node.callee.property.type === 'Identifier' &&
                    node.callee.property.name === 'log') {
                    context.report({
                        node,
                        messageId: 'noConsoleLog',
                    });
                }
            },
        };
    },
});
