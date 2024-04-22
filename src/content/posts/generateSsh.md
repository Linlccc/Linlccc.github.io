---
# 标题
title: "生成 SSH"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: [ssh]
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
date: "2024-04-22 20:06:55"

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

## 生成新的 SSH 密钥

- 在终端中输入以下指令以提供的电子邮件为标签创建`SSH`密钥

~~~ cmd
ssh-keygen -t rsa -b 4096 -C "[email@example.com]"
~~~

- 根据提示输入密钥保存文件，可空保存到默认文件`C:\Users\[User]\.ssh\id_rsa`
- 根据提示输入两次密码

## 将 SSH 密钥添加到 ssh-agent

- 以管理员权限打开 `PowerShell` 启动 `ssh agent`:

~~~ cmd
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
~~~

- 将 SSH 私钥添加到 ssh-agent (无需管理员权限)

~~~ cmd
ssh-add C:\Users\[User]\.ssh\id_rsa
~~~
