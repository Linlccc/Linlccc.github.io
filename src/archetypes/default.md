---
# 标题
title: "{{ replace .Name "-" " " | title }}"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: []
# 类别
categories: []

# 是否显示转载链接
ShowCanonicalLink: false
# 转载链接
canonicalURL: ""

# 是否从搜索中隐藏
searchHidden: false
# 是否是草稿
draft: false
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "{{ (time .Date).Format "2006-01-02 15:04:05" }}"

# 封面
cover:
    # 封面图片
    image: ""
    # 图片异常时显示的文字
    alt: ""
    # 封面描述文字（只在内容页显示）
    caption: ""
    # 是否隐藏封面（只控制内容页）
    hidden: true
---
