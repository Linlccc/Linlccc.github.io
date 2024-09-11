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

## 管理远程连接记录

- 打开注册表
- 进入路径 `HKEY_CURRENT_USER\Software\Microsoft\Terminal Server Client\Default`
- 里面的信息都是远程连接记录

## Windows10 右下角时间显示秒数

- 方法1
  - 打开注册表
  - 进入路径 `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced`
  - 新建一个 `DWORD` 值，命名为 `ShowSecondsInSystemClock`
  - 将值设置为 1
  - 重启/注销计算机
- 方法2
  - 执行指令 `powershell.exe Set-ItemProperty -Path HKCU:\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced -Name ShowSecondsInSystemClock -Value 1 -Force`
