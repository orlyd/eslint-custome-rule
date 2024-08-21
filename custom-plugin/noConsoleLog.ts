import { ESLintUtils, TSESTree, TSESLint } from '@typescript-eslint/utils';
import { RuleModule } from '@typescript-eslint/utils/ts-eslint';


const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);

export const noConsoleLog:RuleModule<'noConsoleLog'> = createRule({
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
  create(context: TSESLint.RuleContext<'noConsoleLog', []>) {
    return {
      CallExpression(node:TSESTree.CallExpression) {
        if (
          node.callee.type === 'MemberExpression' &&
          node.callee.object.type === 'Identifier' &&
          node.callee.object.name === 'console' &&
          node.callee.property.type === 'Identifier' &&
          node.callee.property.name === 'log'
        ) {
          context.report({
            node,
            messageId: 'noConsoleLog',
          });
        }
      },
    };
  },
})


