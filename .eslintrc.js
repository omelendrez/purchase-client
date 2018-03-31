module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends":
    ["eslint:recommended", "plugin:vue/essential"]
  ,
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2017
  },
  "plugins": ["vue"],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};
