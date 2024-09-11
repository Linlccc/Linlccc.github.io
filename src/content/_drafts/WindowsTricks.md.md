---
abbrlink: ''
categories: []
date: '2024-09-11T13:39:28.321+08:00'
tags:
- Windows
title: Windows 之奇技淫巧
updated: '2024-09-11T13:39:28.321+08:00'
---
## 启动开机自动解锁

- Ctrl + R 打开运行，输入 `Control Userpasswords2`或 `netplwiz`
- 取消选中 "要使用本计算机，用户必须输入用户名和密码"
  - 如果没有该选项执行以下操作
  - 打开注册表
  - 进入路径 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\PasswordLess\Device`
  - 将 `DevicePasswordLessBuildVersion` 的值修改成 `0`
  - 然后重新执行以上操作
