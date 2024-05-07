---
# 标题
title: "ES6 常用代码块"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: ["javasrcipt"]
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-05-07 16:28:47"

# 原文章链接
canonicalURL: "https://github.com/xieyezi/website-2022/blob/master/docs/front-end/ES6-20%E4%B8%AA%E7%BB%8F%E5%B8%B8%E4%BD%BF%E7%94%A8%E7%9A%84%E6%8A%80%E5%B7%A7.md"
---
## ES6 20个经常使用的技巧

### 打乱数组顺序

```js
let arr = ['😄', 67, true, false, '55']
arr = arr.sort(() => 0.5 - Math.random())
console.log(arr)
// [ '😄', '55', 67, false, true ]
```

### 删除数字之外的所有字符

```js
const str = 'xieyezi 23213 is 95994 so hansome 223333'
const numbers = str.replace(/\D/g, '')
console.log(numbers)
// 2321395994223333
```

### 反转字符串或者单词

```js
const sentence = 'xieyezi js so handsome, lol.'
const reverseSentence = reverseBySeparator(sentence, "")
console.log(reverseSentence);
// .lol ,emosdnah os sj izeyeix

const reverseEachWord = reverseBySeparator(reverseSentence, " ")
console.log(reverseEachWord)
// izeyeix sj os ,emosdnah .lol

function reverseBySeparator(string, separator) {
  return string.split(separator).reverse().join(separator)
}
```

### 将十进制转换为二进制文件或十六进制数

```js
const num = 45
num.toString(2)
num.tostring(16)
```

### 合并多个对象

```js
const city = {
  name: 'Chongqing',
  population: '1,234,567,890'
}
const location = {
  longitude: '116.4',
  latitude: '39.9'
}
const fullCity = { ...city, ...location }
console.log(fullCity)
// {
//   name: 'Chongqing',
//   population: '1,234,567,890',
//   longitude: '116.4',
//   latitude: '39.9'
// }
```

### `===` 和 `==` 的区别

```js
// ==   ->  类型转换 (浅比较)
// ===  ->  无类型转换 (严格比较)

0 == false // true
0 === false // false
1 == "1" // true
1 === "1" // false
null == undefined // true
null === undefined // false
```

### 解构赋值

```js
const forest = {
  location: 'Sweden',
  animals: 3,
  animalsTypes: ['Lions', 'Tigers', 'Bears'],
};

const { location, animals, animalsTypes } = forest;
const [lions, tigers, bears] = animalsTypes;

console.log(location); // Sweden
console.log(animals); // 3
console.log(lions); // Lions
console.log(tigers); // Tigers
console.log(bears); // Bears
```

### 交换变量的值

```js
let bears = 'bears'
let tigers = 'tigers'
[bears, tigers] = [tigers, bears]
console.log(bears) // tigers
console.log(tribes) // bears

```

### 判断回文字符串

```js
const isRevervse = (str1, str2) => {
  const normalize = (str) =>
    str.toLowerCase()
    .normalize('NFD')
    .split('')
    .reverse()
    .join('')
  return normalize(str1) === str2
}
console.log(isRevervse('anagram', 'margana')) // true
console.log(isRevervse('rac', 'car')) // true
```

> 回文字符串: 正着写和反着写都一样的字符串 (特别感谢[@浮生阁阁主](https://juejin.cn/user/3998255455678968)勘误)

### 判断两个字符串是否为互相排列

```js
const isAnagram = (str1, str2) => {
  const normalize = (str) =>
    str.toLowerCase()
    .normalize('NFD')
    .split('')
    .sort()
    .join('')
  return normalize(str1) === normalize(str2)
}
console.log(isAnagram('anagram', 'nagaram')) // true
console.log(isAnagram('rat', 'car')) // false
console.log(isAnagram('heArT', 'traEH')) // true
```

> 判断两个字符串是否为互相排列: 给定两个字符串,一个是否是另一个的排列

### 可选链操作符

```js
const player = {
  name: 'xieyezi',
  rating: 1000,
  click: () => {
    return 'click'
  },
  pass: (teammate) => {
    return `Pass to ${teammate}`
  },
}
console.log(player?.name) // xieyezi
console.log(player?.click?.()) // click
console.log(player?.teammate?.()) // undefined
```

### 三目运算符

```js
// condition ? expression if true : expression if false
const oxygen = 10
const diver = (oxygen < 10 ) ? 'Low oxygen' : 'High oxygen'
console.log(diver) // High oxygen
```

### 从数组中随机选择一个值

```js
const elements = [24, 'You', 777, 'breaking', 99, 'full']
const random = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randomElement = random(elements)
console.log(randomElement) // 777
```

### 冻结对象

```js
const octopus = {
  tentacles: 8,
  color: 'blue',
}
Object.freeze(octopus)
octopus.tentacles = 10 // Error, 不会改变
console.log(octopus) // { tentacles: 8, color: 'blue'}
```

### 删除数组重复的元素

```js
const animals = ['bears', 'lions', 'tigers', 'bears', 'lions']
const unique = (arr) => [...new Set(arr)]

console.log(unique(animals)) // [ 'bears', 'lions', 'tigers' ]
```

### 保留指定位小数

```js
const num = 0.123456789
const fixed2 = num.toFixed(2)
const fixed3 = num.toFixed(3)

console.log(fixed2) // 0.12
console.log(fixed3) // 0.123
```

### 清空数组

```js
const numbers = [1, 2, 3, 4, 5]
numbers.length = 0

console.log(numbers) // []
```

### 从 `RGB` 转换为 `HEX`

```js
const rgbToHex = (r, g, b) => {
  const toHex = (num) => {
    const hex = num.toString(16)
    return hex.length === 1 ? `0${hex}` : hex
  }
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}
console.log(rgbToHex(46, 32, 67)) // #2e2043
```

### 从数组中获取最大值和最小值

```js
const nums = [1, 2, 3, 4, 5, -3, 99, -45, -1]
const max = Math.max(...nums)
const min = Math.min(...nums)
console.log(max) // 99
console.log(min) // -45
```

### 空值合并运算符

```js
const nullval = null
cost emptyString = ''
const someNum = 13

const a = nullval ?? 'A default'
const b = emptyString ?? 'B default'
const c = SomeNum ?? 'C default'

console.log(a) // A default
console.log(b) // '' // empty string != undefined or null
console.log(c) // 13
```

### 过滤数组中值为 `false` 的值

```js
const nums = [1, 0 , undefined, null, false];
const truthyNums = nums.filter(Boolean);
console.log(truthyNums) // [1]
```
