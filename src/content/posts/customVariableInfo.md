---
title: "自定义变量信息"
description: ""
Summary: ""
tags: []
categories: []

ShowCanonicalLink: true
canonicalURL: ""

searchHidden: false
draft: true
weight: 1000

date: "2023-02-26 17:59:35"

cover:
    image: ""
    alt: ""
    caption: ""
    hidden: true
---

``` text
site.Params.env                 环境
site.Params.keywords            关键字
site.Params.description         站点描述
site.Params.meta                站点自定义元信息（数组）

site.Params.assets.disableScrollBarStyle    禁用滚动条样式
site.Params.assets.disableFingerprinting    禁用资源检查

site.Params.label.text         站点标签
site.Params.label.icon         站点标签图标


site.Params.ShowRssButtonInSectionTermList      显示rss按钮


Params.hiddenInHomeList       隐藏在首页列表中
```

### 问题

- [ ] 引用Highlight.js 的逻辑有问题，页面的disableHLJS没有站点的优先级高
