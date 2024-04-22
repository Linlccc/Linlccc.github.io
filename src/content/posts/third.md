---
title: "这是第三个文章"
description: ""
Summary: ""
tags: ['test','3']
categories: []

searchHidden: false
draft: false
weight: 1000

date: "2023-02-21 17:27:50"

cover:
    image: ""
    alt: ""
    caption: ""
    hidden: true
---

## 这是第三个文章

### 这是第三个文章

## Introduction

This is **bold** text, and this is *emphasized* text.

Visit the [Hugo](https://gohugo.io) website!

### 下面是一张图片1

![图片](/images/posts/test/test_post_1.png)

### Code 01

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
