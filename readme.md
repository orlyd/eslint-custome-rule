# ESLint Custom Rule Creation

## Step-by-Step Guide

This tutorial walks you through the process of enhancing a basic ESLint rule and exporting it as a module. By the end, you’ll be able to package your rule as a real plugin, ready for publishing.

### 1. Setting Up the New Module

First, let’s set up the foundation for your custom plugin.

1. Create a new directory for your plugin.
2. Initialize it with Yarn and TypeScript.

```bash
mkdir custom-plugin
cd custom-plugin
yarn init
yarn add -D typescript eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
yarn run tsc --init
yarn run tsc
```

3. Update your `tsconfig.json` with the following options:

```json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true
  }
}
```

### 2. Enhancing the Rule

The `typescript-eslint` library offers several utilities that help make your rule more readable and maintainable. Let’s convert your existing `noConsoleLog.js` to a TypeScript file and move it to your plugin folder.

#### Using Rule Creator

Start by using the `RuleCreator` utility:

```typescript
const createRule = ESLintUtils.RuleCreator(name => `https://example.com/rule/${name}`);
```

This utility allows you to link your rule name to a documentation URL, returning a function that accepts a rule module object.

Now, wrap your existing rule with the `createRule` function:

```typescript
export const noConsoleLog = createRule({
  name: 'no-console-log',
  // ...rest of the rule
});
```

#### Understanding the `create` Function

The `context` parameter in the `create` function is a typed object that includes the `messageId` (`noConsoleLog` in this case) and any options you may have:

```typescript
TSESLint.RuleContext<'noConsoleLog', []>
```

Similarly, the AST (Abstract Syntax Tree) nodes are also typed:

```typescript
CallExpression(node: TSESTree.CallExpression)
```

Your enhanced rule might look like this:

```typescript
export const noConsoleLog: RuleModule<'noConsoleLog'> = createRule({
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
      CallExpression(node: TSESTree.CallExpression) {
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
});
```

**Note:** ESLint rules operate by analyzing specific AST nodes. Using TypeScript types ensures clarity and correctness in your references.

### 3. Creating `index.ts`

To properly reference your rule, create an `index.ts` file:

```typescript
import { noConsoleLog } from './noConsoleLog';

const plugin = {
  rules: {
    'noConsoleLog': noConsoleLog,
  }
};

export = plugin;
```

### 4. Building the Plugin

Your plugin is now ready to be built. Run `tsc` to compile the TypeScript files:

```bash
yarn run tsc
```

### 5. Adjusting the ESLint Config File

With `typescript-eslint` in use, you can convert your ESLint config file, add recommended rules, and include your custom plugin:

```typescript
import tseslint from 'typescript-eslint';
import customPlugin from 'custom-plugin';

export default tseslint.config({
  languageOptions: {
    parser: tseslint.parser,
  },
  files: ['*.ts'],
  plugins: {
    customPlugin,
  },
  rules: {
    'customPlugin/noConsoleLog': 'error',
  },
});
```

After this, you can remove any old rule files like `eslintPluginExample.js`.

### 6. Testing the Plugin

Finally, install your new plugin in the root project and test it:

```bash
cd ../
yarn add --dev file:custom-plugin
yarn lint
```

