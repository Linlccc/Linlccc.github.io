---
abbrlink: ''
categories: []
date: '2024-09-11T13:39:28.321+08:00'
tags:
- Windows
title: Windows 之奇技淫巧
updated: '2024-09-11T13:49:37.966+08:00'
---
## 启动开机自动解锁

- Ctrl + R 打开运行，输入 `Control Userpasswords2`或 `netplwiz`
- 取消选中 "要使用本计算机，用户必须输入用户名和密码"
  - 如果没有该选项执行以下操作
  - 打开注册表
  - 进入路径 `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\PasswordLess\Device`
  - 将 `DevicePasswordLessBuildVersion` 的值修改成 `0`
  - 然后重新执行以上操作

## 启动程序不提示管理员允许

* 按下 Win 键输入 `用户账户控制设置`
* 将通知修改成 "从不通知"

## 修改 Windows 右键菜单

- 执行以下指令然后重启计算机
- 修改成 windows10 样式

  ```bash
  reg add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
  ```
- 修改成 windows11 样式

  ```bash
  reg delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f
  ```
