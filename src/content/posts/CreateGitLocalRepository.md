---
abbrlink: ''
categories:
- git
date: '2025-12-09T11:17:18.579+08:00'
tags:
- git
title: 创建 git 本地仓库
updated: '2025-12-09T11:17:18.579+08:00'
---
# 本地创建 Git 匿名读写仓库（基于 `git-daemon`）

本文档说明如何在本地使用 `git-daemon` 创建**匿名可读写**的 Git 仓库，适合内网测试或个人局域网使用。

> ⚠️ 安全提示：
> 
> - `git://` 协议**不支持认证和加密**，仅适合可信内网环境。
> - 任何能访问端口的客户端都可以读写仓库，请务必在**独立网络/测试环境**中使用。

---

## 一、环境准备

1. 已安装 [Git](https://git-scm.com/)
2. 将 Git 安装路径下的 `cmd` 目录加入 `PATH`（例如：`C:\Program Files\Git\cmd`）
3. 在 Windows 上建议以**普通用户**启动服务，避免使用管理员账户，确保该用户对仓库目录有读写权限

---

## 二、创建裸仓库（bare repository）

以 `f:/gitreps` 作为仓库存储目录为例：

```bash
mkdir f:/gitreps
cd /d f:/gitreps

git init --bare RepTest.git
```

说明：

- `--bare`：创建裸仓库，只包含 Git 元数据（无工作区），适合作为远程仓库。
- 生成的目录为：`f:/gitreps/RepTest.git`

---

## 三、允许 `git-daemon` 匿名访问

要让 `git-daemon` 能访问该仓库，必须在仓库根目录创建标记文件 `git-daemon-export-ok`。

### 3.1 进入仓库目录

```bash
cd /d f:/gitreps/RepTest.git
```

### 3.2 创建标记文件

#### 方式一：命令行直接创建（Windows）

```bash
type nul > .\git-daemon-export-ok
```

#### 方式二：手动创建

1. 在资源管理器中打开 `f:/gitreps/RepTest.git`
2. 新建一个空文件，命名为：`git-daemon-export-ok`（无扩展名）

说明：

- 存在该文件表示**允许通过 `git-daemon` 导出该仓库**。
- 若使用 `--export-all` 参数，即使没有该文件也可以导出，但仍建议创建以更明确地控制权限。

---

## 四、启动 `git-daemon` 服务

在命令行中执行（建议使用 PowerShell 或 `cmd`）：

```bash
git daemon ^
  --base-path=f:/gitreps ^
  --export-all ^
  --enable=receive-pack ^
  --reuseaddr ^
  --verbose
```

> 如果使用 `bash`（Git Bash），换行用 `\`：

```bash
git daemon \
  --base-path=f:/gitreps \
  --export-all \
  --enable=receive-pack \
  --reuseaddr \
  --verbose
```

### 4.1 参数说明

- `--base-path=f:/gitreps`
  - 设定仓库基础路径，客户端可通过：
    `git://<server-ip>/RepTest.git` 访问。
- `--export-all`
  - 忽略 `git-daemon-export-ok` 限制，导出该目录下所有仓库。
  - 若希望更细粒度控制，**可以去掉该参数**，仅依赖 `git-daemon-export-ok`。
- `--enable=receive-pack`
  - 允许客户端执行 `git push`（即支持**匿名写入**）。
- `--reuseaddr`
  - 允许端口重用，服务重启时不容易因端口占用失败。
- `--verbose`
  - 在控制台输出详细日志，便于调试。

### 4.2 端口与防火墙

- 默认监听端口：`9418`
- 在防火墙中放行 TCP 9418 端口（仅在内网可信环境中开放）

---

## 五、客户端使用方式

假设服务器 IP 为 `192.168.1.100`，仓库名为 `RepTest.git`。

### 5.1 克隆仓库

```bash
git clone git://192.168.1.100/RepTest.git
```

### 5.2 推送代码

1. 在本地仓库中添加远程地址（如果是已存在仓库）：
   
   ```bash
   git remote add origin git://192.168.1.100/RepTest.git
   ```
2. 推送分支（例如 `main`）：
   
   ```bash
   git push origin main
   ```

> 由于是匿名协议，不会出现用户名/密码提示。

---

## 六、常见问题与修复

### 6.1 Windows 中 `SO_KEEPALIVE` 错误

**报错信息示例：**

```text
unable to set SO_KEEPALIVE on socket: Input/output error
```

这是在 Windows 使用 `git-daemon` 时较常见的问题，通常出现在客户端执行 `git push` 过程中。

#### 解决方法

在**客户端**执行以下命令，关闭推送边带输出（sideband）：

```bash
git config --global sendpack.sideband false
```

说明：

- `sendpack.sideband` 控制客户端在发送数据时是否启用边带输出（进度条、详细信息等）。

参数意义：

- `true`（默认）：
  
  - 推送时会显示进度条和详细输出（大多数情况下都如此）。
- `false`：
  
  - 推送时**不显示进度条和边带信息**，输出更安静。
  - 对某些老旧或“非标准”的 Git 服务端／协议有更好兼容性（包括部分自建的 `git-daemon` 服务）。
- 恢复默认配置：
  
  ```bash
  git config --global --unset sendpack.sideband
  ```

#### 修改后操作

1. 关闭当前 `git-daemon` 服务（直接 Ctrl+C）
2. 重新启动 `git-daemon`
3. 在客户端重新执行 `git push` 测试

---

## 七、运行与维护建议

1. **运行账户**
   
   - 启动 `git-daemon` 的用户必须对仓库目录（如 `f:/gitreps`）有**读写权限**。
   - 不建议使用管理员账户，使用普通服务用户更安全。
2. **目录结构建议**
   
   ```text
   f:/gitreps/
     ├─ RepTest.git
     ├─ AnotherRepo.git
     └─ ...
   ```
   
   - 所有裸仓库统一存放在 `f:/gitreps` 下，便于统一维护。
3. **关闭服务**
   
   - 在运行 `git daemon` 的终端中按 `Ctrl + C` 即可停止服务。
   - 若需要以服务方式长期运行，可考虑：
     - 使用 Windows 任务计划程序 / [NSSM](https://nssm.cc/download) 等包装为服务；
     - 或使用 WSL/Linux 环境中以 systemd / supervisord 管理。
4. **安全控制**
   
   - 若只希望**只读匿名访问**，可以：
     - 去掉 `--enable=receive-pack` 参数，只保留拉取（`clone`/`fetch`）；
   - 若只允许部分仓库导出：
     - 去掉 `--export-all`；
     - 仅在需要导出的仓库中创建 `git-daemon-export-ok` 文件。

---

## 八、简要步骤汇总

1. 创建仓库目录
   
   ```bash
   mkdir f:/gitreps
   cd /d f:/gitreps
   ```
2. 初始化裸仓库
   
   ```bash
   git init --bare RepTest.git
   ```
3. 允许导出（可选但推荐）
   
   ```bash
   cd /d f:/gitreps/RepTest.git
   type nul > .\git-daemon-export-ok
   ```
4. 启动服务
   
   ```bash
   git daemon ^
     --base-path=f:/gitreps ^
     --export-all ^
     --enable=receive-pack ^
     --reuseaddr ^
     --verbose
   ```
5. 客户端克隆 / 推送
   
   ```bash
   git clone git://<server-ip>/RepTest.git
   git push origin main
   ```
6. 遇到 `SO_KEEPALIVE` 错误时，在客户端执行：
   
   ```bash
   git config --global sendpack.sideband false
   # 如需恢复：
   # git config --global --unset sendpack.sideband
   ```

---

