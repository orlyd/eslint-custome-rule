import tseslint from 'typescript-eslint';
import customPlugin from 'custom-plugin';


export default tseslint.config(
  { 
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
  }
);
