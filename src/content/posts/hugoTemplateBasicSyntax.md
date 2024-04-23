---
title: "hugo 模板基本语法"
description: ""
Summary: ""
tags: ['golang']
categories: []

ShowCanonicalLink: true
canonicalURL: ""

searchHidden: false
draft: false
weight: 2

date: "2023-02-22 17:57:49"

cover:
    image: ""
    alt: ""
    caption: ""
    hidden: true
---

## 概念

每一个模板都有一个名为 Page 数据对象\
Page 信息参考：[Page 信息参考](https://gohugo.io/variables/page/)

## 基础语法

### 访问变量

``` go
{{ .Titel }}            // 访问已存在的变量
{{ $address }}          // 访问自定义变量
```

### 声明变量与赋值

``` go
{{ $address := "http://www.baidu.com" }}    // 声明自定义变量并赋值
{{ $msg := `Line one.
Line two.` }}                               // 支持多行字符串
{{ $msg = "" }}                             // 将msg的值修改为空字符串
```

### 条件语句

条件语句 `if`/`with` 都以 `{{ end }}` 结束\
在hugo模板中，条件语句的条件可以是任何表达式，而不仅仅是布尔类型的表达式，以下情况会被认为是false：

- 空字符串 ""
- 空数组 []
- 空字典 map[]
- 空指针 nil
- 数值 0
- 布尔值 false

#### if

很多情况下建议使用 with 语句，而不是 if 语句，因为 with 语句可以重新绑定上下文，而 if 语句不能

``` go
{{ if .IsHome }} {{ end }}                           // 判断 IsHome 的值
{{ if eq .Title "Home" }} {{ end }}                  // 判断变量是否相等
{{ if ne .Title "Home"  }} {{ end }}                 // 判断变量是否不相等
{{ if and .IsHome .Params.show }} {{ end }}          // 判断多个条件是否同时满足
{{ if or .IsHome .Params.show }} {{ end }}           // 判断多个条件是否有一个满足
{{ if not .IsHome }} {{ end }}                       // 判断条件是否不满足
{{ if strings.Contains "hugo" "go" }} {{end}}        // 判断是否包含指定字符串

// 该示例和 with 的第一个示例做完全相同的事
{{ if isset .Params "title" }}
    <h4>{{ index .Params "title" }}</h4>
{{ end }}

// 但是 if 可是使用 else if 语句
{{ if (isset .Params "description") }}
    {{ index .Params "description" }}
{{ else if (isset .Params "summary") }}
    {{ index .Params "summary" }}
{{ else }}
    {{ .Summary }}
{{ end }}

// 使用 or/and , 只要 .Params.title 或者 .Params.caption 有一个存在，并且 .Params.attr 存在，就会执行该块
{{ if (and (or (isset .Params "title") (isset .Params "caption")) (isset .Params "attr")) }}
    <div class="caption {{ index .Params "attr" }}">
        {{ if (isset .Params "title") }}
            <h4>{{ index .Params "title" }}</h4>
        {{ end }}
        {{ if (isset .Params "caption") }}
            <p>{{ index .Params "caption" }}</p>
        {{ end }}
    </div>
{{ end }}
```

#### with

with在其范围内重新绑定上下文`.`

``` go
// 如果 .Params.title 为空，将跳过该块
{{ with .Params.title }}
    <h4>{{ . }}</h4>
{{ end }}

// 如果 Param 设置了 description，那么输出 Param 的 description，否则输出 Summary
{{ with .Param "description" }}
    {{ . }}
{{ else }}
    {{ .Summary }}
{{ end }}
```

### 函数调用

在hugo模板中，调用函数格式大致如下：{{ funcName arg1 arg2 ... }}\
模板中函数信息参考：[模板中函数信息](https://gohugo.io/functions/)

``` go
{{ add 1 2 }}                   // 调用 add 函数，计算 1+2，结果为3
{{ lt 1 2 }}                    // 调用 lt 函数，计算1<2，结果为true
```

### 迭代

迭代语句 `range` 以 `{{ end }}` 结束
使用 `range` 来迭代 `map`/`array`/`slice` 类型变量\
以下是 `range` 使用的几个示例

``` go
// 这里的上下文 . 是 $array 中的一个元素，要访问全局上下文，需要使用 $.
{{ range $array }}
    {{ . }}
{{ end }}

// 为数组元素的值声明变量
{{ range $elem_val := $array }}
    {{ $elem_val }}
{{ end }}

// 为数组元素的索引和值声明变量
{{ range $elem_index, $elem_val := $array }}
   {{ $elem_index }} -- {{ $elem_val }}
{{ end }}

// 为 map 元素的索引和值声明变量
{{ range $elem_key, $elem_val := $map }}
   {{ $elem_key }} -- {{ $elem_val }}
{{ end }}

// 传入的 map/array/slice 为空时，执行 else 语句
{{ range $array }}
    {{ . }}
{{else}}
// 只有在 $array 为空时才会执行
{{ end }}
```

#### 遍历其他示例

``` go
{{ range .Data.Pages }}                             // 遍历 Data.Pages
{{ range where .Data.Pages "Section" "posts" }}     // 遍历 Data.Pages，过滤 Section 为 posts 的数据
{{ range first 10 .Data.Pages }}                    // 遍历 Data.Pages，取前10条数据
{{ range last 10 .Data.Pages }}                     // 遍历 Data.Pages，取后10条数据
{{ range after 10 .Data.Pages }}                    // 遍历 Data.Pages，取第10条数据之后的数据
{{ range until 10 .Data.Pages }}                    // 遍历 Data.Pages，取第10条数据之前的数据
```

## cond

`cond CONTROL VAR1 VAR2`
如果 `CONTROL` 为真，则返回 `VAR1`，否则返回 `VAR2`

## 模板

模板位置始终从hugo目录中的layouts目录开始查找，如果没有找到，就会从主题目录中查找\
如果在主题目录中也没有找到，就会使用默认的模板

### 部分模板

使用 `partial` 函数引用部分模板，部分模板的位置为 `layouts/partials`。
语法如下：`{{ partial "<PATH>/<PARTIAL>.<EXTENSION>" . }}`

``` go
{{ partial "header.html" . }}           引用部分模板 layouts/partials/header.html
{{ partialCached "header.html" . }}     缓存引用部分模板 layouts/partials/header.html


```

#### 多变量部分模板示例

``` go
// 传入多个变量
{{ partial "header.html" (dict "curremtPage" . "param1" "1" "param2" "2" ) }}

// 模板中使用变量
{{ .curremtPage }} -> .
{{ .param1 }} -> "1"
{{ .param2 }} -> "2"
```

### 引用模板

使用 `template` 函数引用模板，`template` 函数用于在更旧的 Hugo 版本中包含部分模板。现在它只对调用内部模板有用。\
内部模板信息参考：[内部模板](https://gohugo.io/templates/internal/)\
查看可用的内部模板：[可用的内部模板](https://github.com/gohugoio/hugo/tree/master/tpl/tplimpl/embedded/templates)\
语法如下：`{{ template "_internal/<TEMPLATE>.<EXTENSION>" . }}`

``` go
{{ template "_internal/opengraph.html" . }}         引用内部模板 opengraph.html
{{ template "_internal/_default/rss.xml" . }}       引用内部模板 _default/rss.xml
```

## 空格符

模板会处理以下空白符

- 空格
- tab
- 回车
- 新行

``` go
<div>
  {{ .Title }}
</div>
// 输出
<div>
  Hello, World!
</div>

<div>
  {{- .Title -}}
</div>
// 输出
<div>Hello, World!</div>
```

## 杂项

``` go
// 使用名为"main"的块，如果没有定义该块，就会使用默认的块
{{ block "main" . }}{{ end }}

// 定义一个名称为"main"的块
{{ define "main" }}
  <h1>Posts</h1>
  {{ range .Pages }}
    <article>
      <h2>{{ .Title }}</h2>
      {{ .Content }}
    </article>
  {{ end }}
{{ end }}
```

## 资源

`resources` 是一个 Hugo 内置的模块，用于处理网站资源文件，例如图片、CSS、JavaScript 等。它包含了一系列的方法，可以用来获取、操作、组合和匹配资源文件。

- resources.Get: 获取指定路径的资源文件。
- resources.Match: 根据指定的 glob 模式匹配资源文件，返回一个资源列表。
- resources.Concat: 将多个资源文件合并为一个。
- resources.FromString: 从字符串中创建一个资源文件。
- resources.ExecuteAsTemplate: 将资源文件作为模板进行解析。
