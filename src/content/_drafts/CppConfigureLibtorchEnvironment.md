---
description: ''
title: C++ 配置 libtorch 环境
---
## 下载 LibTorch

- 从 [LibTorch](https://pytorch.org/) 下载对应系统的 C++ 版本
- 下载完成后解压文件，如解压到`C:\libtorch`（以下都将以此为libtorch目录）

## 配置环境变量

确保程序在运行时可以找到`LibTorch`动态链接库，将`lib`目录添加到环境变量

1. 在系统搜索查找“编辑系统环境变量”->”环境变量“
2. 在“系统变量”中，找到`Path`变量，点击“编辑”，添加LibTorch的库目录路径`C:\libtorch\lib`

## vs2022 中的配置

> 如果在配置环境变量之前启动了需要重启

创建一个 C++ 控制台项目
