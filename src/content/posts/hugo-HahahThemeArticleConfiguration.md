---
# 标题
title: "Hugo-Hahah 主题文章配置"
# 描述
description: ""
# 标签
tags:
  - Hahah
  - Hugo
# 显示权重（越小显示越靠前）
weight: 100

# 撰写日期
date: "2024-06-17 21:19:58"
---

## 文章基础配置

```yaml
# 标题
title:
# 链接标题，在标题很长时用到
linkTitle:
# 描述
description:
# 摘要,如果为空自动截取文章内容
Summary:
# 隐藏摘要
hideSummary: false
# 权重
weight: 1000
# 是否是草稿
draft: false

# 日期
date: 2000-10-01 12:00:00
# 发布日期
publishDate: 2000-10-01 12:00:00
# 过期日期
expiryDate: 2000-10-01 12:00:00
# 最后修改日期，enableGitInfo 设置为true后会自动设置成 git 提交日期
lastmod: 2000-10-01 12:00:00

# 别名，用于重定向  (比如: /post/[aliases]/ 会重定向到当前页面)
aliases:
  - aaa

# 标签
tags:
  - tag1
  - tag2
# 语言
langs:
  - C++
# 关键字
keywords:
  - key1
  - key2
# 分类
categories:
  - category1
  - category2

# hugo 内置模板 Open Graph 的配置(一般用不到)
# 声音文件
audio:
  - "default.mp3"
# 图像文件
images:
  - post-cover.png
# 视频文件
videos:
  - video.mp4
```

## 模板查找配置

```yaml
# 布局，该设置会优先去找 test.html 模板
layout: test
# 类型，该设置会优先在 test 目录下去找模板
type: test
```

## 自定义配置

```yaml
# 作者
authors:
  - author1
  - author2

# 显示面包屑导航
ShowBreadCrumbs: true
# 隐藏元数据（比如作者、发布日期等）
hidemeta: false
# 显示文章阅读时间
ShowReadingTime: true
# 显示文章字数统计
ShowWordCount: true
# 显示作者
showAuthor: true
# 显示原文章信息，用于显示转载自哪里
showCanonicalLink: true
# 原文章链接
canonicalLink:
# 显示目录
showToc: true
# 打开目录
tocOpen: false
# 显示文章导航链接(上/下页)
showPostNavLinks: true

# 禁用分享功能
disableShare: false
# 禁用锚定标题
disableAnchoredHeadings: false
# giscus 评论信息
giscusCommentsInfo:
  enabled: true

# 在站内搜索结果中隐藏页面
searchHidden: true
# 从 home 页中隐藏，值只能是true/false
hiddenInHomeList: false

# 文章封面
cover:
  # 封面图片
  image: ""
  # 图片的替代文本
  alt: ""
  # 封面标题，描述
  caption: ""
  # 指示图片路径是否相对于当前文件
  relative: false
  # 在列表中隐藏封面
  hiddenInList: false
  # 在文章页面中隐藏封面
  hiddenInSingle: false

# 文章编辑链接信息
editPost:
  # 链接(示例链接指向githu的修改)
  url: https://github.com/[YourName]/[Repo]/edit/master/src/content
  # 将文件路径附加到编辑链接
  appendFilePath: true
  # 禁用编辑
  disabled: false
```
