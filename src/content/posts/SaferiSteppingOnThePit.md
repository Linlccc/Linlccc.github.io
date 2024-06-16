---
title: "踩坑记--Safari之正向后行断言"
description: ""
tags: ["safari", "正则表达式"]
weight: 1000

date: "2023-02-24 15:21:11"
---

## 正则表达式

### 1. Safari 处理正则表达式中的正向后行断言时(?<=...)，异常

```js
// 以下代码在 Chrome 中正常，但在 Safari 中会报错
"https://linlccc.com?theme=light".replace(/(?<=[?|&]theme=)\w+/, "dark");
// 解决方案，使用捕捉组+替换字符串的方式
"https://linlccc.com?theme=light".replace(/([?|&]theme=)\w+/, "$1dark");

// 以上两个执行结果都是 "https://linlccc.com?theme=dark"
```
