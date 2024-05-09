---
# 标题
title: "VsCode 常用扩展推荐"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: ["VsCode", "Extensions"]
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-05-08 09:05:43"
---

## 基础扩展

### `Chinese (Simplified)`

- [插件](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans)

```txt
VS Code 的中文（简体）语言包
```

### `vscode-icons`

- [插件](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

```txt
图标
```

## XML，Json，TOML 扩展

### `JSON Crack`

- [插件](https://marketplace.visualstudio.com/items?itemName=AykutSarac.jsoncrack-vscode)

```txt
Json 数据可视化
```

### `Even Better TOML`

- [插件](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)

```txt
 TOML 语言支持
```

### `Markdown All in One`

- [插件](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one#keyboard-shortcuts)

```txt
Markdown 快捷键等支持
```

### `Markdown Preview Enhanced`

- [插件](https://marketplace.visualstudio.com/items?itemName=shd101wyy.markdown-preview-enhanced)

```txt
Markdown 预览
```

### `markdownlint`

- [插件](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)

```txt
Markdown 语法检查
```

## C# 扩展

### `.NET Install Tool`

- [插件](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-runtime)

```txt
此扩展安装和管理不同版本的 .NET SDK 和运行时
```

### `C#`

- [插件](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csharp)
- 依赖
  - .NET Install Tool

```txt
C# 的基本语言支持
```

### `C# Dev Kit`

- [插件](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit)
- 依赖
  - .NET Install Tool
  - C#

```txt
帮助 C# 开发人员更快、更快速地编写、调试和维护其代码

ps: 此扩展依赖以上两个扩展，直接安装该扩展即可
```

## Js 扩展

### `EsLint`

- [插件](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [中文官网](https://zh-hans.eslint.org/)
- [规则参考](https://eslint.org/docs/latest/rules/)

```txt
JavaScript 语法检查工具

规则配置：
  "off" 或 0 - 关闭规则
  "warn" 或 1 - 启用并视作警告（不影响退出）
  "error" 或 2 - 启用并视作错误（触发时退出代码为 1）
```

- 常用规则

```json
rules:
{
  // 箭头函数的参数始终使用括号
  "arrow-parens": ["error", "always"],
  // 大括号与代码不在同一行
  "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
  // 多行末尾逗号
  "comma-dangle": ["error", "always-multiline"],
  // 逗号前后的空格
  "comma-spacing": "error",
  // 缩进为2个空格，switch case的缩进为1个空格
  "indent": ["error", 2, { "SwitchCase": 1 }],
  // 在JSX中使用双引号
  "jsx-quotes": ["error", "prefer-double"],
  // 使用双引号
  "quotes": ["error", "double"],
  // 使用分号
  "semi": ["error", "always"],
  // 大括号内始终有空格
  "object-curly-spacing": ["error", "always"],
  // 对象属性引号根据需要添加
  "quote-props": ["error", "as-needed"],
  // 函数圆括号前不添加空格
  "space-before-function-paren": ["error", "never"],
  // 最大行长度为80个字符
  "max-len": ["error", { "code": 80 }]
}
```

### `Regex Previewer`

- [插件](https://marketplace.visualstudio.com/items?itemName=chrmarti.regex)

```txt
正则表达式测试
在js文件中输入正则表达式按下 Ctrl+Alt+M` 即可快速测试
```

### `Turbo Console Log`

- [插件](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)

```txt
在变量上按下 Ctrl+Alt+L` 快速添加 console.log 代码
```

### `Path Intellisense`

- [插件](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)

```txt
自动完成路径文件名
```

### `Vue - Official`

- [插件](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

```txt
Vue 支持
```

## Web

### `Live Server`

- [插件](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

```txt
启动具有静态和动态页面实时重新加载功能的开发本地服务器
```

### `Thunder Client`

- [插件](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

```txt
API 客户端
```

## 格式化扩展

### `Prettier`

- [插件](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [官网](https://prettier.io/)

```txt
支持 JavaScript · TypeScript · Flow · JSX · JSON · CSS · SCSS · Less · HTML · Vue · Angular HANDLEBARS · Ember · Glimmer · GraphQL · Markdown · YAML 代码格式化
```

- 常用规则

```json
// ps: 以下规则可在 .prettierrc.json 文件中配置,在 prettierrc 中时不能有注释
{
  // 是否始终在箭头函数的参数周围使用括号
  "arrowParens": "always",
  // 是否大括号与代码在同一行上
  "bracketSameLine": false,
  // 是否在大括号内添加空格
  "bracketSpacing": true,
  // 是否使用分号作为语句结束符
  "semi": true,
  // 是否启用实验性的三元运算符格式化
  "experimentalTernaries": false,
  // 是否使用单引号
  "singleQuote": false,
  // 在JSX中是否使用单引号
  "jsxSingleQuote": false,
  // 对象属性是否需要引号
  "quoteProps": "as-needed",
  // 是否在多行对象、数组末尾添加逗号
  "trailingComma": "all",
  // 是否将JSX元素的每个属性放在单独的行上
  "singleAttributePerLine": false,
  // HTML空白符的敏感度
  "htmlWhitespaceSensitivity": "css",
  // 是否在Vue文件中缩进脚本和样式
  "vueIndentScriptAndStyle": false,
  // 是否在Markdown文件中保留文本换行符
  "proseWrap": "preserve",
  // 是否在文件开头插入格式化的特殊字符串以启用格式化
  "insertPragma": false,
  // 每行代码的最大字符数
  "printWidth": 80,
  // 是否要求格式化的文件包含特殊的格式化字符串才会被格式化
  "requirePragma": false,
  // 制表符的宽度
  "tabWidth": 2,
  // 是否使用制表符而不是空格进行缩进
  "useTabs": false,
  // 嵌入式语言的格式化方式
  "embeddedLanguageFormatting": "auto"
}
```

## Ai 扩展

### `Fitten Code`

- [插件](https://marketplace.visualstudio.com/items?itemName=FittenTech.Fitten-Code#fitten-code-%E4%BD%A0%E7%9A%84%E4%B8%93%E4%B8%9A-ai-%E4%BB%A3%E7%A0%81%E5%8A%A9%E6%89%8B)

```txt
AI 代码助手
```

## Hugo 扩展

### `Hugo Snippets`

- [插件](https://marketplace.visualstudio.com/items?itemName=fivethree.vscode-hugo-snippets)

```txt
Hugo 代码片段
使用时键入 h- 即可ktivai 代码片段
```

### `Hugo Themer`

- [插件](https://marketplace.visualstudio.com/items?itemName=eliostruyf.vscode-hugo-themer)

```txt
鼠标悬停在 partial 或 partialCached 引用上时，显示引用的部分文件的完整路径
按 F12 跳转到引用的部分文件
```
