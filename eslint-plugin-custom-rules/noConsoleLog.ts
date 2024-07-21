//Example of custom rule to disallow the use of console.log
// import { TSESTree } from "@typescript-eslint/utils";

// module.exports= {
//   meta: {
//     type: "problem",
//     messages: {
//       noConsoleLog: "Unexpected console.log statement."
//     },
//     docs: {
//       description: "Disallow the use of console.log",
//       recommended: "error"
//     },
//     fixable:"code"
//   },
//   create(context:any) {
//     return {
//       FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
//         node.body.body.forEach((node: TSESTree.Node) => {
//           if (node.type === "ExpressionStatement") {
//             const expression: TSESTree.CallExpression=node.expression as TSESTree.CallExpression;
//             if (
//               expression.callee.type === "MemberExpression" &&
//               expression.callee.object.type === "Identifier" &&
//               expression.callee.object.name === "console" &&
//               expression.callee.property.type === "Identifier" &&
//               expression.callee.property.name === "log"
//             )
//        {
//           context.report({
//             node,
//             messageId: "noConsoleLog",
//             fix: (fixer:any) => fixer.insertTextBefore(node, "if (__DEV__) ")
//           });
//         }
//       }
//     })
//       }
//     };
//   }
// };
