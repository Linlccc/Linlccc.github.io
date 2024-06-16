---
title: "Watch out for pitfalls - Safari and positive lookbehind assertions"
description: ""
tags: ["safari", "regular expression"]
weight: 1000

date: "2023-02-24 15:21:11"
---

## regular expression

### 1. Safari handles positive lookbehind assertions in regular expressions, denoted by (?<=...), abnormally

```js
// The following code works fine in Chrome but throws an error in Safari.
"https://linlccc.com?theme=light".replace(/(?<=[?|&]theme=)\w+/, "dark");
// The solution is to use capturing groups and string replacement.
"https://linlccc.com?theme=light".replace(/([?|&]theme=)\w+/, "$1dark");

// Both of the execution results above are "https://linlccc.com?theme=dark"
```
