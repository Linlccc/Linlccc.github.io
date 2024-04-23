---
######################################################################
# 当前文件是 papermod 主题的文章模板文件，当前文件没有任何作用，仅作为参考 #
# see https://gohugo.io/content-management/front-matter/             #
######################################################################

# 将文件名的 '-' 替换成 ' ',并将每个单词的首字母大写
title: "{{ replace .Name "-" " " | title }}"
# 页面描述(显示在网站文章标题下面)
description: ""
# 摘要(显示列表中的文章详情,如果为空则显示文章前 70 个字)
Summary: ""
# 作者,可以是多个(数组)
author: ""
# 标签
tags: []
# 分类
categories: []

# 隐藏摘要
hideSummary: false
# 在站内搜索结果中隐藏页面
searchHidden: true
# 权重
weight: 1000
# 草稿
draft: true
# 别名, 用于重定向  (比如: /post/[aliases]/ 会重定向到当前页面)
aliases: []
# 禁用代码高亮(用 params.assets.disableHLJS 变量来配置，使用时只要一个禁用就会禁用)
disableHLJS: false
# 在文章分类页面显示 RSS 订阅按钮
ShowRssButtonInSectionTermList: true
# 使用 Hugo 自动生成的目录
UseHugoToc: true

# 显示面包屑导航
ShowBreadCrumbs: true
# 隐藏元数据（比如作者、发布日期、分类等）
hidemeta: false
# 显示文章阅读时间
ShowReadingTime: true
# 显示文章字数统计
ShowWordCount: true
# 显示原文章信息，用于显示转载自哪里
ShowCanonicalLink: true
# 原文章链接
canonicalURL: ""
# 显示目录
showToc: true
# 打开目录
TocOpen: false
# 显示文章导航链接(上一篇/下一篇)
ShowPostNavLinks: true
# 禁用分享功能
disableShare: false
# 开启评论功能
comments: false

# 时间
date: "{{ (time .Date).Format "2006-01-02 15:04:05" }}"
# 最后修改
lastmod: "{{ (time .Date).Format "2006-01-02 15:04:05" }}"

# 文章封面
cover:
    # 封面图片
    image: ""
    # 图片的替代文本
    alt: ""
    # 在封面下方显示的文字描述(只有在文章内补隐藏才有用)
    caption: ""
    # 指示图片路径是否相对于当前文件(没用)
    relative: false
    # 在文章隐藏封面
    hidden: true

# 文章编辑链接字段
editPost:
    # 链接地址
    URL: "https://github.com/Linlccc/Linlccc.github.io/edit/master/src/content/"
    # 链接文本
    Text: "编辑"
    # 将文件路径附加到编辑链接
    appendFilePath: true
---
