---
title: "C++ 学习笔记"
description: ""
Summary: ""
tags: ["C++"]
categories: []

ShowCanonicalLink: true
canonicalLink: ""

searchHidden: false
draft: false
weight: 1000

date: "2023-02-28 23:20:19"

cover:
  image: ""
  alt: ""
  caption: ""
  hidden: true
---

## 基础

### 整数类型

这些类型里面除了只有 `signed` 和 `int` 的都可以省略 `signed` / `int`
例如 `short`, `short int`, `signed short`, `signed short int` 表示一个类型

| 类型                                                                     | 占用字节数 | 取值范围                                    |
| ------------------------------------------------------------------------ | ---------- | ------------------------------------------- |
| `signed char`                                                            | 1          | -128 到 127                                 |
| `unsigned char`                                                          | 1          | 0 到 255                                    |
| `short`, `short int`, `signed short`, `signed short int`                 | 2          | -32768 到 32767                             |
| `unsigned short`, `unsigned short int`                                   | 2          | 0 到 65535                                  |
| `int`, `signed`, `signed int`                                            | 4          | -2147483648 到 2147483647                   |
| `unsigned`, `unsigned int`                                               | 4          | 0 到 4294967295                             |
| `long`, `long int`, `signed long`, `signed long int`                     | 4          | 与 `int` 或 `long long` 相同                |
| `unsigned long`, `unsigned long int`                                     | 4          | 与 `unsigned` 或 `unsigned long long` 相同  |
| `long long`, `long long int`, `signed long long`, `signed long long int` | 8          | -9223372036854775808 到 9223372036854775807 |
| `unsigned long long`, `unsigned long long int`                           | 8          | 0 到 18446744073709551615                   |

### 浮点类型

| 类型          | 占用字节数 | 取值范围                                                                                   |
| ------------- | ---------- | ------------------------------------------------------------------------------------------ |
| `float`       | 4          | 1.175494351e-38 到 3.402823466e+38                                                         |
| `double`      | 8          | 2.2250738585072014e-308 到 1.7976931348623157e+308                                         |
| `long double` | 12         | 3.36210314311209350626267781732175260e-4932 到 1.18973149535723176508575932662800702e+4932 |

### 无效浮点数信息

在 C++中，浮点数类型的值可以是无效的，具体取决于浮点数类型的规范。以下是一些常见的无效浮点数值：

- NaN (Not a Number): 表示无效的计算结果，例如 `0.0 / 0.0`、`sqrt(-1)` 等，它可以用 `std::numeric_limits<T>::quiet_NaN()` 来表示。
- Inf (Infinity): 表示除以 0 或者取 log(0) 等无穷值的结果，它可以用 `std::numeric_limits<T>::infinity()` 来表示。
- -Inf (Negative Infinity): 表示除以 -0 或者取 `log(-0)` 等负无穷值的结果，它可以用 `-std::numeric_limits<T>::infinity()` 来表示。
- denormalized number: 非规格化数，它是一个非零的非规格化浮点数 W，不同于规格化数它的指数部分全是 0。在一些平台上，它可能会被截断成 0。

在 C++ 标准库中，可以使用 `std::numeric_limits<T>` 类模板来获取特定浮点数类型 `T` 的限制信息，例如 `std::numeric_limits<double>::quiet_NaN()` 就可以得到 `double` 类型的 `NaN`。

#### 无效浮点数操作

| 操作                    | 结果        |
| ----------------------- | ----------- |
| `±value/0`              | `±Infinity` |
| `±Infinity ± value`     | `±Infinity` |
| `±Infinity * value`     | `±Infinity` |
| `±Infinity / value`     | `±Infinity` |
| `0 / 0`                 | `NaN`       |
| `±Infinity / ±Infinity` | `NaN`       |
| `Infinity - Infinity`   | `NaN`       |
| `Infinity * 0`          | `NaN`       |

### 数字字面量

| 类型                 | 示例                     |
| -------------------- | ------------------------ |
| `int`                | `42`, `-123`             |
| `unsigned int`       | `42u`, `123U`            |
| `long`               | `123456L`, `-123L`       |
| `unsigned long`      | `123456ul`, `123ul`      |
| `long long`          | `123456789LL`, `-123LL`  |
| `unsigned long long` | `123456789ull`, `123ull` |
| `float`              | `3.14f`, `-2.5F`         |
| `double`             | `3.14`, `-2.5`           |
| `long double`        | `3.14L`, `-2.5L`         |

### 进制表示方式

| 进制    | 表示方式             | 示例    |
| ------- | -------------------- | ------- |
| 二进制  | 以 `0b` 或 `0B` 开头 | `0b110` |
| 八进制  | 以 `0` 开头          | `017`   |
| 10 进制 | 直接输入数字         | `123`   |
| 16 进制 | 以 `0x` 或 `0X` 开头 | `0x1A`  |

### sizeof 运算符

1. `sizeof(type)`：获取类型 `type` 的大小，返回 `size_t` 类型的值。
2. `sizeof expression`：获取表达式 `expression` 的大小，返回 `size_t` 类型的值。
3. `sizeof...`：获取模板参数包中元素的个数，返回 `size_t` 类型的值。这个用法通常用于可变参数模板。

```c++
// 获取类型的大小
std::cout << "sizeof(int): " << sizeof(int) << '\n';

// 获取表达式的大小
int arr[] = {1, 2, 3};
std::cout << "sizeof(arr): " << sizeof(arr) << '\n';

// 获取模板参数包中元素的个数
template<typename... Ts>
void foo(Ts... args) {
  std::cout << "sizeof...(args): " << sizeof...(args) << '\n';
}
foo(1, 'a', 3.14);  // 输出 "sizeof...(args): 3"
```

### 数值的上下限

`std::numeric_limits<T>` 类模板提供了获取数值类型 T 的上下限的方法

```c++
// 在整数类型中 min 和 lowest 都是相同的，都是最小值
// 获取 int 类型的上限
std::numeric_limits<int>::max();
// 获取 int 类型的下限
std::numeric_limits<int>::min();
// 以下方法也可以获取下限
std::numeric_limits<int>::lowest();

// 在浮点数类型中，min 和 lowest 不同，min 得到的是最小的正整数，lowest 得到的才是最小的值
// 获取 float 类型的上限（3.40282e+38）
std::numeric_limits<float>::max();
// 获取 float 类型的最小的正整数（1.17549e-38）
std::numeric_limits<float>::min();
// 获取 float 类型的下限（-3.40282e+38）
std::numeric_limits<float>::lowest();
```

### char 、 wchar_t 、 char8_t 、 char16_t 、 char32_t

以上几种都是原生字符类型，用于表示数字、字母、符号等字符。

1. `char`:

   - 占用一个字节（8 位）
   - 用于表示单个 8 位字符，即 ASCII 码表中的字符，范围是 0~127
   - 在 C++ 中使用最为广泛，可以用于表示 ANSI 编码和 UTF-8 编码的字符，建议在表示 ASCII 字符时使用。

2. `wchar_t`:

   - 在不同平台上占用的字节数不同，通常为 2 个字节（16 位）或 4 个字节（32 位）
   - 用于表示单个 Unicode 字符，范围是所有 Unicode 字符
   - 在处理 Unicode 字符或多语言环境下有更好的应用场景，建议在需要处理 Unicode 字符时使用。
   - 在些跨平台代码是不建议使用，因为不同平台上的 `wchar_t` 占用的字节数不同。

3. `char8_t`:

   - 占用一个字节（8 位）
   - 用于表示单个 8 位字符，范围是所有 Unicode 字符中的 ASCII 码表部分，即 0~127
   - 用于表示 UTF-8 编码的字符，建议在需要处理 UTF-8 编码的字符时使用。

4. `char16_t`:

   - 占用两个字节（16 位）
   - 用于表示单个 Unicode 字符，范围是所有 Unicode 字符
   - 用于表示 UTF-16 编码的字符，建议在需要处理 UTF-16 编码的字符时使用。

5. `char32_t`:
   - 占用四个字节（32 位）
   - 用于表示单个 Unicode 字符，范围是所有 Unicode 字符
   - 用于表示 UTF-32 编码的字符，建议在需要处理 UTF-32 编码的字符时使用。

### 变量初始化赋值

在 C++中初始化赋值有三种方式

- 建议平时使用花括号表示法，避免隐式类型转换，如果类型不匹配会报错，以达到更好的代码可读性和可维护性
- 赋值表示法和函数表示法在初始化时不会进行类型检查，如果类型不匹配会进行隐式类型转换（缩窄转换）
- 赋值表示法和函数表示法在进行缩窄转换时，大多数编译器会发出数据丢失的警告

```c++
int i = 0;  // 赋值表示法
int j(0);   // 函数表示法
int k{0};   // 花括号表示法
int l{};    // 这里是默认赋值为0
```

### 显示类型转换

| 类型转换方式       | 示例                         | 建议使用方式           |
| ------------------ | ---------------------------- | ---------------------- |
| C 风格类型转换     | `(float) x`                  | 不建议使用             |
| 静态/强制类型转换  | `static_cast<float>(x)`      | 建议使用               |
| 重新解释类型的转换 | `reinterpret_cast<float>(x)` | 转换指针类型时建议使用 |
| 旧式的类型转换     | `float(x)`                   | 不建议使用             |

### 格式化字符串 `std::format`

`std::format` 是 C++20 中的新特性，它提供了一种新的字符串格式化方式。该特性可以用来将多种类型的值格式化为字符串，并且支持多种格式控制符，可以更加灵活地控制输出格式。
这里列出格式说明符的一般形式：`{[arg_id][:[[fill]align][sign]["#"]["0"][width]["." precision]["L"][type]]}`

- `arg_id`：表示参数的索引, 从 0 开始
- `fill`：指定填充字符，可以是任意字符。如果省略，则默认为空格。

  ```c++
  std::format("|{:<10}|", "hello");   // |hello     |
  std::format("|{:*<10}|", "hello");  // |hello*****|
  ```

- `align`：指定对齐方式，可以是以下几种：

  - `<`：左对齐。
  - `>`: 右对齐。
  - `^`: 居中对齐。

  ```c++
  std::format("|{:<10}|", "hello");  // |hello     |
  std::format("|{:>10}|", "hello");  // |     hello|
  std::format("|{:^10}|", "hello");  // |  hello   |

  ```

- `sign`：指定符号显示方式，可以是以下几种：

  - `+`：显示正号和负号。
  - `-`：只显示负号。
  - ``（空格）：在正数前面加空格，负数前面加负号（默认）。

  ```c++
  std::format("|{:+}|", 10);    // |+10|
  std::format("|{:+}|", -10);   // |-10|
  std::format("|{:-}|", -10);   // |-10|
  std::format("|{: }|", 10);    // | 10|
  std::format("|{: }|", -10);   // |-10|
  ```

- `#`：指定转换类型，可以是以下几种：

  - `b` 或 `B`：二进制。
  - `o` 或 `O`：八进制。
  - `x` 或 `X`：十六进制。
  - `e` 或 `E`：科学计数法。
  - `f` 或 `F`：浮点数（默认）。
  - `g` 或 `G`：自动选择 f 或 e。
  - `a` 或 `A`：十六进制浮点数。

  ```c++
  std::format("|{:#x}|", 255);         // |0xff|
  std::format("|{:#X}|", 255);         // |0xFF|
  std::format("|{:#b}|", 255);         // |0b11111111|
  std::format("|{:#o}|", 255);         // |0377|
  std::format("|{:.2e}|", 123.456);    // |1.23e+02|
  std::format("|{:.2f}|", 123.456);    // |123.46|
  std::format("|{:.2g}|", 123.456);    // |1.2e+02|
  ```

- `width`：指定输出宽度，如果输出的字符串宽度小于指定的宽度，则会在左侧或右侧填充指定字符。
- `.precision`：指定浮点数输出的精度，即小数点后保留的位数

### 常用转义字符

| 转义字符 |            含义            |
| :------: | :------------------------: |
|    \n    | 换行符（windows 中是\r\n） |
|    \r    |           回车符           |
|    \t    |         垂直制表符         |
|    \v    |         水平制表符         |
|    \\    |           反斜杠           |
|    \'    |           单引号           |
|    \"    |           双引号           |

### 常用预处理指令

| 预处理指令 |                                含义                                |
| :--------: | :----------------------------------------------------------------: |
|    #if     |  用于条件编译，如果条件为真，则编译后面的代码，否则跳过后面的代码  |
|   #ifdef   |  用于条件编译，如果宏定义了，则编译后面的代码，否则跳过后面的代码  |
|  #ifndef   | 用于条件编译，如果宏没有定义，则编译后面的代码，否则跳过后面的代码 |
|   #else    |  用于条件编译，如果条件为假，则编译后面的代码，否则跳过后面的代码  |
|   #endif   |            用于条件编译，结束条件编译，与 #if 配对使用             |
|  #define   |     用于定义宏，可以用于条件编译，也可以用于替换代码中的字符串     |
|   #undef   |                用于取消宏定义，与 #define 配对使用                 |
|   #error   |                   用于输出错误信息，编译时会报错                   |
|   #line    |                  用于指定行号，与 #file 配对使用                   |
|   #file    |                 用于指定文件名，与 #line 配对使用                  |
|  #pragma   |             用于指定编译器的行为，如指定编译器忽略警告             |
