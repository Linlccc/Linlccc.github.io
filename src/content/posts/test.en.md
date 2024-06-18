---
title: "这是一篇测试文章(英文)"
linkTitle: "测试文章"
Description: "测试文章描述"
Summary: "测试文章摘要"
hideSummary: true
weight: 1
draft: true

date: 2023-02-21 10:21:18
expiryDate: 2024-10-01 12:00:00
publishDate: 2025-02-21 10:21:18
lastmod: 2025-02-21 10:21:18

aliases:
  - /posts/test1/
  - /posts/test2/

keywords:
  - keyword1
  - keyword2
tags:
  - tag1
  - tag2
categories:
  - category1
  - category2

authors:
  - author1
  - author2

ShowBreadCrumbs: false
hidemeta: true
ShowReadingTime: false
ShowWordCount: false
showAuthor: false
ShowCanonicalLink: true
canonicalLink: http://linlccc.com/posts/test/
showToc: false
tocOpen: false
showPostNavLinks: false

disableShare: true
disableAnchoredHeadings: true
giscusComments:
  enabled: false

searchHidden: false
hiddenInHomeList: false

cover:
  image: images/posts/test/test_post_1.png
  alt: "测试文章封面图片"
  caption: "测试文章封面描述文字"
  relative: false
  hiddenInList: true
  hiddenInSingle: true

editPost:
  url: https://github.com/Linlccc/Linlccc.github.io/edit/master/src/content
  appendFilePath: false
  disabled: true
---

![alt text](i1.png)

## 二级标题

### 三级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题题题题题题题题题题

`asjgfuaksgfuagskfbakjsfbkjasgkdgasukdgukasdukasukdhukahdkahsdhakshdasjgfuaksgfuagskfbakjsfbkjasgkdgasukdgukasdukasukdhukahdkahsdhakshd`

<h1 id="h1html" style="background: red;">h1html</h1>
<script>
    console.log("md输出");
</script>

段落正常字体
_段落斜体_
**段落粗体**
**_段落粗斜体_**

---

~~删除线~~
<u>下划线</u>

- 无序项

1. 有序项 1
2. 有序项 2
3. 有序项 3
   1. 嵌套项
   2. asd
   - 嵌套项

> 区块引用
>
> > 一层嵌套引用
> >
> > > 二层嵌套引用
> > >
> > > > > > > > > > > 十层嵌套引用.....

`printf("这是一个代码片段"); //代码片段`

```C
printf("这是一个代码块");
//代码块
```

| 左对齐         |      居中      |         右对齐 |
| :------------- | :------------: | -------------: |
| 这是一个单元格 | 这是一个单元格 | 这是一个单元格 |
| 这是一个单元格 | 这是一个单元格 | 这是一个单元格 |

[内联方式<code>123a</code>超链接](/posts/test/)

[引用方式超链接][引用式]

[引用式]: /posts/test/

|    图片方式    |                                                         图片                                                          |
| :------------: | :-------------------------------------------------------------------------------------------------------------------: |
|    图片内联    |         ![1](https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png "内联图片属性")         |
|    图片引用    |                                                    ![1][引用图片]                                                     |
| 图片内联超链接 | [![1](https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png "内联图片属性")](/posts/test/) |
| 图片引用超链接 |                                              [![1][引用图片]][引用链接]                                               |

[引用图片]: https://www.runoob.com/wp-content/uploads/2019/03/iconfinder_markdown_298823.png "引用图片属性"
[引用链接]: /posts/test/

\*\*使用转义字符\*\*

LaTeX\_($LaTeX: E=mc^2$)\_LaTex
$$LaTeX: E=mc^2$$

```chart
,数值一,数值二,数值三
类型1,5000,8000,4000
类型2,3000,1000,4000
类型3,5000,7000,6000
类型4,7000,2000,3000

type: column
title: 柱状图
x.title: 类型
x.suffix: 单位x
y.title: 数值
y.suffix: 单位y
```

```math
e^{i\pi} + 1 = 0 //(Just English Allow Here)
```

```mermaid
graph TD
A[开始A] --> B(过程B)
B --> C{判断条件C}
C -->|条件C1| D[结束D]
C -->|条件C2| E[结束E]
C -->|条件C3| F[结束F]
```

```mermaid
sequenceDiagram
A->>B: 是否已收到消息？
B-->>A: 已收到消息
```

```mermaid
gantt
title 甘特图
dateFormat  YYYY-MM-DD
section 项目A
任务1: duty1, 2018-01-01, 30d
任务2: 20d
section 项目B
任务3: 2018-01-01, 10d
任务4: after duty1, 20d
```

## 快捷键

|        功能        |       键位       |
| :----------------: | :--------------: |
| 新建 Markdown 笔记 |    Ctrl+Alt+D    |
|        粗体        |      Ctrl+B      |
|        斜体        |      Ctrl+I      |
|       删除线       |      Ctrl+T      |
|       下划线       |      Ctrl+U      |
|       分隔线       | Ctrl + Shift + - |
|      编号列表      | Ctrl + Shift + O |
|    项目符号列表    | Ctrl + Shift + W |
|    插入待办事项    | Ctrl + Shift + C |
|       代码块       |   Ctrl+Shift+L   |
|   插入日期和时间   | Alt + Shift + D  |
|        撤销        |      Ctrl+Z      |
|    在笔记内搜索    |      Ctrl+F      |

## Test

TTTTTTT

### 下面是一张图片

![图片](/images/posts/test/test_post_1.png)

### Code 1

```js
// 语法结构
while (条件) {
  需要执行的代码;
}

// 该循环永远不会结束，这可能导致浏览器崩溃。
while (true) {
  console.log("加菲猫！");
}

const arr = ["1", "2", undefined, "3", "", "4"];
let i = 0;
while (arr[i]) {
  console.log(arr[i]);
  i = i + 1;
}
// 输出: 1
// 输出: 2

const arr = ["1", "2", "3", "4"];
let i = 0;
while (arr[i]) {
  console.log(arr[i]);
  i = i + 1;
}
```

### Code 2

```C# {.hide asdfff=asdfff close=asfasg}
static void Web()
{
    // 加载配置
    string webConfigFile = "WebConfig.json";
    WebConfig webConfig;
    if (!File.Exists(webConfigFile))
    {
        webConfig = new();
        webConfig.Port = 8082;
        File.WriteAllText(webConfigFile, JsonConvert.SerializeObject(webConfig, Formatting.Indented));
    }
    else webConfig = JsonConvert.DeserializeObject<WebConfig>(File.ReadAllText(webConfigFile))!;

    Serve.Run(RunOptions.Default
        .Silence()
        .AddComponent<ServeServiceComponent>().UseComponent<ServeApplicationComponent>()
        .ConfigureServices(services =>
        {
            services.AddJwt();
            services.AddJsonOptions(configure => configure.JsonSerializerOptions.Converters.AddDateTimeTypeConverters("yyyy-MM-dd HH:mm:ss.fff"));
        })
        .ConfigureBuilder(builder =>
        {
            builder.WebHost.UseUrls($"http://*:{webConfig.Port}");
        })
        .Configure(app =>
        {
            app.UseInject(option =>
            {
                option.ConfigureSwaggerUI(ui =>
                {
                    ui.RoutePrefix = "swagger";
                });
            });

            app.UseAuthentication();
            app.UseAuthorization();
        }));

    //Serve.Run($"http://*:{webConfig.Port}", silence: true, additional: services =>
    //{
    //    services.AddJsonOptions(configure => configure.JsonSerializerOptions.Converters.AddDateTimeTypeConverters("yyyy-MM-dd HH:mm:ss.fff"));
    //});
}
```

### Table

| 账户   | 密码   | 备注 |
| ------ | ------ | ---- |
| asdasd | asdasd | aaa  |
| asdasd | asdasd | aaa  |
| asdasd | asdasd | aaa  |

### Code 3

{{< highlight lang="csharp" opt="linenos=true,hl_lines=8 15-17,linenostart=199" isOpen=false >}}
static void Web(1)
{
// 加载配置
string webConfigFile = "WebConfig.json";
WebConfig webConfig;
if (!File.Exists(webConfigFile))
{
webConfig = new();
webConfig.Port = 8082;
File.WriteAllText(webConfigFile, JsonConvert.SerializeObject(webConfig, Formatting.Indented));
}
else webConfig = JsonConvert.DeserializeObject<WebConfig>(File.ReadAllText(webConfigFile))!;
Serve.Run(RunOptions.Default
.Silence()
.AddComponent<ServeServiceComponent>().UseComponent<ServeApplicationComponent>()
.ConfigureServices(services =>
{
services.AddJwt();
services.AddJsonOptions(configure => configure.JsonSerializerOptions.Converters.AddDateTimeTypeConverters("yyyy-MM-dd HH:mm:ss.fff"));
})
.ConfigureBuilder(builder =>
{
builder.WebHost.UseUrls($"http://*:{webConfig.Port}");
        })
        .Configure(app =>
        {
            app.UseInject(option =>
            {
                option.ConfigureSwaggerUI(ui =>
                {
                    ui.RoutePrefix = "swagger";
                });
            });
            app.UseAuthentication();
            app.UseAuthorization();
        }));
    //Serve.Run($"http://\*:{webConfig.Port}", silence: true, additional: services =>
//{
// services.AddJsonOptions(configure => configure.JsonSerializerOptions.Converters.AddDateTimeTypeConverters("yyyy-MM-dd HH:mm:ss.fff"));
//});
}
{{< / highlight >}}
