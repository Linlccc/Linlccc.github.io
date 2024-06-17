---
# 标题
title: "管理 SSH"
# 描述
description: ""
# 标签
tags:
  - ssh
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-04-22 20:06:55"
---

## 生成新的 SSH 密钥

- 在终端中输入以下指令以提供的电子邮件为标签创建`SSH`密钥

```Bash
ssh-keygen -t rsa -b 4096 -C "[email@example.com]"
```

- 根据提示输入密钥保存文件，可空保存到默认文件`C:\Users\[User]\.ssh\id_rsa`
- 根据提示输入两次密码（建议不设置密码，否者每次 push 都需要输入密码）

## 将 SSH 密钥添加到 ssh-agent

- 以管理员权限打开 `PowerShell` 启动 `ssh agent`:

```Bash
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent
```

- 将 SSH 私钥添加到 ssh-agent (无需管理员权限)

```Bash
ssh-add C:\Users\[User]\.ssh\id_rsa
```

## 移除 SSH 密钥

- 删除`C:\Users\[User]\.ssh\`文件夹中的两个密钥文件
- 从`ssh agent`中移除`ssh`密钥

```Bash
# 查看已加载的密钥列表
ssh-add -l
# 移除密钥
ssh-add -d C:\Users\[User]\.ssh\id_rsa
```
