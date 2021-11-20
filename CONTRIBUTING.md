## Prettier

### How to run the prettier?
```
npm run prettier
```

### What's in the prettier config file
```
{
    "trailingComma": "es5",
    "tabWidth": 2,
    "semi": true,
    "singleQuote": true
}
```

## ESLint

### How to run lint?
```
npm run lint
```
### How to run lint --fix?
```
npm run lint:fix
```

### What's in the lint config file
```
{
    "env": {
        "commonjs": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 13
    },
    "rules": {
        "semi": ["error", "always"]
    }
}
```

## IDE Integration

In settings.json
```
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "eslint.validate": [
        "javascript"
    ]
}
```

### How to run tester

without  coverage
```
npm run test
```

with coverage
```
npm run test-coverage
```

