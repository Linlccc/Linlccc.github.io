---
date: 2024-05-07 03:52:05
description: ""
lastmod: "2024-06-16T23:33:27.623+08:00"
tags:
  - Javascript
langs:
  - Javascript
title: 常用js
weight: 1000
---

## 防抖

```js
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 测试
function task(arg) {
  console.log("run task" + arg);
}
const debounceTask = debounce(task, 1000);
window.addEventListener("scroll", () => debounceTask(11));
```

## 节流

```js
function throttle(fn, delay) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last < delay) return;
    last = now;
    fn.apply(this, args);
  };
}

// 测试
function task() {
  console.log("run task");
}
const throttleTask = throttle(task, 1000);
window.addEventListener("scroll", throttleTask);
```
