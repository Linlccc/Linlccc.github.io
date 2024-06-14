---
#################################
# 当前文件没有任何作用，仅作为参考 #
#################################

##################
# hugo 文章默认配置
see:https://gohugo.io/content-management/front-matter/
##################
# 标题，将文件名的 '-' 替换成 ' ',并将每个单词的首字母大写
title: { { replace .Name "-" " " | title } }
# 链接标题，在标题很长时用到
linkTitle: 链接标题
# 描述
description: 描述
# 摘要,如果为空自动截取文章内容
Summary:
# 隐藏摘要
hideSummary: false
# 权重
weight: 1000

# 日期
date: { { (time .Date).Format "2006-01-02 15:04:05" } }
# 发布日期
publishDate: { { (time .Date).Format "2006-01-02 15:04:05" } }
# 过期日期
expiryDate: { { (time .Date).Format "2006-01-02 15:04:05" } }
# 最后修改日期，enableGitInfo 设置为true后会自动设置成 git 提交日期
lastmod: { { (time .Date).Format "2006-01-02 15:04:05" } }

# 是否是草稿
draft: false

# 别名，用于重定向  (比如: /post/[aliases]/ 会重定向到当前页面)
aliases:
  - aaa

# 关键字
keywords:
  - key1
  - key2
# 标签
tags:
  - tag1
  - tag2
# 分类
categories:
  - category1
  - category2

# hugo 内置模板 Open Graph 的配置
# 声音文件
audio:
  - "default.mp3"
# 图像文件
images:
  - post-cover.png
# 视频文件
videos:
  - video.mp4

########################################
# 模板查找配置,查找模板的更目录都是 layouts
########################################
# 布局，该设置会优先去找 test.html 模板
layout: test
# 类型，该设置会优先在 test 目录下去找模板
type: test

#################
# 以下是自定义配置
#################

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

# 显示原文章信息，用于显示转载自哪里
showCanonicalLink: true
# 原文章链接
canonicalLink:

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
  # 链接
  url: https://github.com/Linlccc/Linlccc.github.io/edit/master/src/content
  # 将文件路径附加到编辑链接
  appendFilePath: true
  # 禁用编辑
  disabled: false
---
