---
abbrlink: ''
categories: []
date: '2025-08-13T15:57:46.233+08:00'
tags:
- cpu
- arch
title: 面向开发者的 CPU 架构速查
updated: '2025-12-09T11:19:10.252+08:00'
---
# x86、x86_64/x64/amd64、arm、arm64 架构速查

导读：最常用用户侧 CPU 架构一页通，覆盖别名、兼容性、生态命名、构建与发布要点

## 1. 架构与别名

- x86（32 位）
  - 别名：i386、i686、IA‑32
  - 典型场景：老旧 PC、极简系统、特定嵌入式存量
- x86_64 / x64 / amd64（64 位）
  - 三者同义：windows 常用 x64；Linux 常用 x86_64/amd64；macOS 常用 x86_64
  - 典型场景：PC/笔记本/服务器主流
- arm（32 位，ARMv6/ARMv7）
  - 子集：armel（软浮点）、armhf（硬浮点，需 VFPv3/NEON）
  - 典型场景：老手机/路由器/树莓派 2 及更早
- arm64（64 位，ARMv8+）
  - 别名：aarch64
  - 典型场景：Apple Silicon、Android/服务器 ARM、树莓派 3/4/5、新一代笔电与云

> 速记：x86_64 = x64 = amd64；arm64 = aarch64；x86 ≠ x86_64；arm ≠ arm64

## 2. 生态命名速查

- 操作系统
  - Windows：x86、x64、arm64
  - macOS：x86_64、arm64；universal2（x86_64+arm64）
  - Debian/Ubuntu：i386、amd64、armhf、arm64
  - RHEL/CentOS/Fedora/openSUSE：i686（少见）、x86_64、aarch64
  - Alpine：x86、x86_64、armhf、aarch64
- 容器平台字符串
  - linux/386、linux/amd64
  - linux/arm/v7、linux/arm/v6、linux/arm64
- 语言/工具链
  - Go：386、amd64、arm（GOARM=5/6/7）、arm64
  - Node 预编译：win-x64、win-arm64、linux-x64、linux-arm、linux-arm64、darwin-x64、darwin-arm64
  - Python wheels：win_amd64、win_arm64、manylinux_x86_64、manylinux_aarch64、macosx_arm64、macosx_universal2
  - .NET [RID](https://learn.microsoft.com/zh-cn/dotnet/core/rid-catalog#windows-rids)：win-x64/x86/arm64、linux-x64/arm/arm64、linux-musl-x64/arm64、osx-x64/arm64
- 包
  - APT（Advanced Package Tool） .deb：
    - 适用发行版：Debian、Ubuntu 及衍生（Linux Mint、Pop!_OS、elementaryOS 等）
    - 架构命名：i386、amd64、armhf、arm64
  - RPM（The Redhat Package Manager）.rpm：
    - 适用发行版：RHEL、CentOS、Fedora、openSUSE
    - 架构命名：i686、x86_64、aarch64
  - APK（Alpine Package Keeper） .apk：
    - 适用发行版：Alpine Linux
    - 架构命名：x86、x86_64、armhf、armv7、aarch64
  - AppImage
    - 跨发行版的通用包格式
    - 架构标记：x86-64、armhf、aarch64

## 3. 差异简述

- x86（32 位）vs x86_64
  - 64 位提供更多通用寄存器（16 个）与更大地址空间，常使计算密集场景更快
  - 代价是指针变大导致内存占用增加（结构体膨胀、缓存压力）
- arm（32 位）vs arm64
  - arm64 统一 A64 指令集与更强的寄存器文件，NEON/FP 支持更一致
  - arm（32 位）在极低内存/旧硬件仍有价值，但新项目应优先 arm64
- x86_64 vs arm64（同代）
  - 桌面/服务器两者性能取决于具体微架构与功耗封装；arm64 近年在能效上优势明显（Apple/云端）
  - 生态成熟度与软件兼容 x86_64 仍占优，但差距快速缩小

## 4. 兼容性与运行

- 64 位 CPU 运行 32 位程序
  - x86_64 CPU：硬件可跑 32 位；是否可用取决于 OS 是否提供兼容层与 32 位库
    - Windows：WoW64 支持 x86 应用（64 位 Windows 上跑 32 位程序）
    - Linux：可通过 multilib 或安装 i386 兼容库运行 32 位应用
    - macOS：自 10.15 起移除 32 位用户态支持
  - ARM64 CPU：多数 SoC 支持 aarch32，但 OS 不一定开放用户态
    - Android：新设备逐步转向纯 64 位（仅 arm64-v8a）
    - iOS/macOS（ARM64）：不支持 ARM 32 位应用
- 跨架构运行（非本机 ISA）
  - macOS：[Rosetta](https://zh.wikipedia.org/wiki/Rosetta) 2 可在 arm64 上翻译运行 x86_64 应用（不支持 x86 32 位）
  - Windows on ARM64：提供 x86/x64 模拟层；支持 ARM64EC 与 x64 组件混合
  - Linux：qemu-user + binfmt_misc 可实现透明跨架构运行（性能与系统调用模式相关，视场景波动较大）
- 调用约定(ABI)与二进制兼容
  - x86_64（[System V](https://zh.wikipedia.org/wiki/UNIX_System_V)）与 Windows x64 调用约定不同，二进制不可互换
  - ARM 32 位软(armel)/硬(armhf)浮点 ABI 不兼容，库与可执行不能混用
  - 同一架构不同 C 运行库(glibc/musl) 不可混用（Alpine 常用 musl）

## 5. 构建与发布要点

- x86_64 微架构级别（选基线的实用标尺）
  - v1：SSE2
  - v2：SSE3/SSSE3/SSE4.1/SSE4.2/POPCNT（覆盖面广，推荐默认）
  - v3：+ AVX/AVX2/BMI1/BMI2/FMA（可做优化变体）
  - v4：+ AVX-512F/…（覆盖窄，慎作默认）
  - 建议：主包 v2，另发 v3 优化；使用 AVX2+ 时做运行时能力检测或多版本分发
- 平台最低兼容基线
  - x86_64：默认选 x86-64-v2；另提供 v3 优化（AVX2/FMA 等）
  - arm64：ARMv8‑A 为默认；使用 CRC/crypto/atomics 等扩展需标注最低 CPU（如 v8.1）
  - Linux glibc：manylinux2014（glibc ≥ 2.17）常作最低；可另发 musl 静态版
- OS 注意点
  - Windows：同时产出 x64 与 arm64（必要时加 x86）；可考虑 ARM64EC 便于与 x64 组件混合
  - Linux：以旧 glibc 基线构建；提供 musl 静态二进制作为补充
  - macOS：优先 universal2；设置最低版本 x86_64≥10.13/10.14、arm64≥11.0
- 运行时保护
  - 使用 AVX/NEON 时做 CPU 能力检测或多版本分发

## 6. 发布矩阵建议

- windows
  - x64
  - arm64
- linux（不同发行版可能需要不同的架构命名）
  - amd64
  - arm64
- macos
  - universal2(x86_64+arm64)，或单独发布一下两个
  - x86_64
  - arm64

按需添加

- windows
  - x86
  - arm
- linux
  - 386
  - arm/v7（armhf）
  - arm/v6（armel）

## 7. 常见误区

- “x86 是 64 位”：x86 通常指 32 位；64 位应叫 x86_64/x64/amd64
- “arm 是 arm64”：arm 多指 32 位；arm64/aarch64 才是 64 位
- “x86_64/amd64/x64 不同”：三者同义，仅生态叫法不同
- “armel 与 armhf 可混用”：软/硬浮点 ABI 不兼容
- “任何 64 位系统都能跑 32 位程序”：取决于 OS 是否提供兼容层（macOS 已移除，Android 正在收紧）
- “Alpine 的二进制可在所有 Linux 运行”：未必，Alpine 使用 musl，glibc 系统无法直接运行其动态链接二进制
- “发布单一 AVX2 版本可覆盖所有 x86_64”：老 CPU 无 AVX2 会崩溃，需降级路径或多版本分发
