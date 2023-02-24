---
title: "SaferiSteppingOnThePit"
description: "Safari 踩坑记"
Summary: ""
tags: ['safari']
categories: []

ShowCanonicalLink: true
canonicalURL: ""

searchHidden: false
draft: false
weight: 1000

date: "2023-02-24 15:21:11"

cover:
    image: ""
    alt: ""
    caption: ""
    hidden: true
---

## 正则表达式

### 1. Safari 处理正则表达式中的前向肯定断言时(?<=...)，异常

```js
// 一下代码在 Chrome 中正常，但在 Safari 中会报错
"https://linlccc.com?theme=light".replace(/(?<=[?|&]theme=)\w+/, "dark");
// 解决方案，使用捕捉组+替换字符串的方式
"https://linlccc.com?theme=light".replace(/([?|&]theme=)\w+/, "$1dark");
```
