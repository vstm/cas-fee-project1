module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "off",
        "jsdoc/no-undefined-types": 1,
    },
    "globals": {
        "Handlebars": "readonly",
        "moment": "readonly",
        "__dirname": "readonly",
    },
    "plugins": [
      "jsdoc"
    ]
};
