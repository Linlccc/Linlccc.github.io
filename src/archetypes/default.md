---
# 将文件名的 '-' 替换成 ' ',并将每个单词的首字母大写
title: "{{ replace .Name "-" " " | title }}"
# 时间
date: "{{ (time .Date).Format "2006-01-02 15:04:05" }}"
# 最后修改
lastmod: "{{ (time .Date).Format "2006-01-02 15:04:05" }}"
# 草稿
draft: true
# 权重
weight: 1
# 别名
aliases: []
# 标签
tags: []
# 作者
author: ""
# 显示目录
showToc: true
# 打开目录
TocOpen: false
# 隐藏元数据（比如作者、发布日期、分类等）
hidemeta: false
# 开启评论功能(没用)
comments: false
# 页面描述
description: ""
# 页面的规范 URL
canonicalURL: "{{ .Site.BaseURL }}"
# 禁用代码高亮
disableHLJS: false
# 禁用分享功能
disableShare: false
# 隐藏摘要
hideSummary: false
# 在站内搜索结果中隐藏页面
searchHidden: true
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
    image: "<image path/url>"
    # 图片的替代文本
    alt: "<alt text>"
    # 在封面下方显示的文字描述
    caption: "<text>"
    # 指示图片路径是否相对于当前文件
    relative: false
    hidden: true

# 文章编辑链接字段
editPost:
    # 链接地址
    URL: "https://github.com/Linlccc/Linlccc.github.io/content"
    # 链接文本
    Text: "编辑"
    # 将文件路径附加到编辑链接
    appendFilePath: true
---
