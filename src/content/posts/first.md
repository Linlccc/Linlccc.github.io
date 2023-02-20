---
# 将文件名的 '-' 替换成 ' ',并将每个单词的首字母大写
title: "测试：第一个测试文章"
# 时间
date: "2023-02-17 11:07:01"
# 最后修改
lastmod: "2023-02-17 11:07:01"
# 草稿
draft: false
# 权重
weight: 1
# 别名
aliases: []
# 标签
tags: ['ff',"pos"]
# 作者
author: ''
# 显示目录
showToc: true
# 打开目录
TocOpen: false
# 隐藏元数据（比如作者、发布日期、分类等）
hidemeta: false
# 开启评论功能
comments: true
# 页面描述
description: "aaaaaaaaaaaa"
# 页面的规范 URL
canonicalURL: "https://canonical.url/to/page"
# 禁用代码高亮
disableHLJS: false
# 禁用分享功能
disableShare: false
# 隐藏摘要
hideSummary: false
# 在站内搜索结果中隐藏页面
searchHidden: false
# 显示文章阅读时间
ShowReadingTime: true
# 显示面包屑导航
ShowBreadCrumbs: true
# 显示文章导航链接
ShowPostNavLinks: true
# 显示文章字数统计
ShowWordCount: true
# 在文章分类页面显示 RSS 订阅按钮
ShowRssButtonInSectionTermList: true
# 使用 Hugo 自动生成的目录
UseHugoToc: true

# 文章封面
cover:
    # 封面图片
    image: '/images/image_12.png'
    # 图片的替代文本
    alt: "aa"
    # 在封面下方显示的文字描述
    caption: "ttttt"
    # 指示图片路径是否相对于当前文件
    relative: false
    # 在文章隐藏封面
    hidden: true

# 文章编辑链接信息
editPost:
    # 链接地址
    URL: "https://github.com/Linlccc/Linlccc.github.io/content"
    # 链接文本
    Text: "edit"
    # 将文件路径附加到编辑链接
    appendFilePath: true
---
"{{if pipeline}} T1 {{end}}"

## Introduction

This is **bold** text, and this is *emphasized* text.

Visit the [Hugo](https://gohugo.io) website!

### 下面是一张图片

![图片](/images/image_12.png)

### Code 1

~~~ C#
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
~~~

| 账户 | 密码 | 备注 |
| ---- | ---- | ---- |
| asdasd | asdasd | aaa |
| asdasd | asdasd | aaa |
| asdasd | asdasd | aaa |

### Code 2

~~~ CSharp
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
~~~
