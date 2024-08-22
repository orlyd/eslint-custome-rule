module.exports= {
  meta: {
    type: "problem",//TODO: Add type value: "problem"/"suggestion"/"layout"
    messages: {
      noConsoleLog: 'Unexpected console.log statement.',
    },
    docs: {
      description: 'Disallow the use of console.log',
      recommended: "error",//TODO: Add recommended value: "error"/"warn"/"off"
    },
    fixable:"code"
  },
  create(context) {
    return {
      CallExpression(node) {
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
}
