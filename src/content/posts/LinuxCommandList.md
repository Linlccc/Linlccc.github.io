---
# 标题
title: "Linux 命令大全"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: ["linux"]
# 类别
categories: []

# 是否是草稿
draft: false
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-05-05 01:46:07"

# 封面
cover:
    # 封面图片
    image: "/images/posts/LinuxCommandList/linuxCommandList.png"
---

## 系统指令

~~~ Bash
# 显示系统信息：内核版本、机器类型等
uname
# 显示正在运行的Linux内核的发行版本
uname -r
# 显示当前时间、系统运行时间、用户和负载平均值
uptime
# 显示系统主机名
hostname
# 显示当前主机的ip地址
hostname -i
# 查看系统最近一次的重启时间以及重启之前的系统登录信息
last reboot
# 显示当前日期和时间
date
# 设置系统时间与日期
timedatectl
# 快速查看当前/指定年份日历
cal
# 显示目前登入系统的用户信息
w
# 显示当前用户的用户名
whoami
# 显示名为"username"的用户的信息
finger username
~~~

## 文件命令

~~~ Bash
# 以长格式列出所有文件的详细信息
ls -al
# 显示当前工作目录的路径
pwd
# 创建一个名为 dir1 的新目录
mkdir dir1
# 删除名为 file1 的文件
rm file1
# 强制删除名为 file2 的文件
rm -f file2
# 递归删除目录 dir1 及其内容
rm -r dir1
# 强制删除目录 dir1 及其内容
rm -rf dir1
# 复制 file1,创建或覆盖 file2
cp file1 file2
# 将 dir1 复制到 dir2,包括子目录
cp -r dir1 dir2
# 将 file1 重命名或移动到 file2
mv file1 file2
# 创建名为 linkName 到 fileName 的符号链接
ln -s /oath/to/fileName linkName
# 创建一个名为 file1 的空文件
touch file1
# 创建/覆盖 file1,等得标准输入
cat > file1
# 逐页显示们 file1 的内容
more file1
# 显示 file1 的前十行
head file1
# 显示 file1 的最后十行
tail file1
# 使用对称密码对 file1 进行加密,需要提供密码短语
gpg -c file1
# 解密 file2.gpg,提示输入密码
gpg file2.gpg
# 统计文件中的字数、行数和字符数
wc
# 使用管道或文件提供的参数执行命令
xargs
~~~

## 用户管理

~~~ Bash
# 显示用户的UID、GID、组
id
# 显示最后登录用户的列表
last
# 显示当前登录的用户
who
# 创建一个名为 Admin 的新用户组
groupadd admin
# 创建一个名为 Sam 的新用户组
adduser Sam
# 删除名为 Sam 的用户
userdel Sam
# 修改现有用户的属性
usermod
~~~

## 硬件

~~~ Bash
# 内核会将开机过程信息存储在环形缓冲区中
dmesg
# 显示 CPU 的详细信息
cat/proc/cpuinfo
# 显示详细的系统内存使用信息
cat/proc/meminfo
# 列出系统的详细硬件配置
lshw
# 列出所有可用的块设备的信息
lsblk
# 显示系统内存使用情况
free -m
# 以树状格式详细显示 PCI 设备信息
lspci -tv
# 以树状格式详细显示 USB 设备信息
lsusb -tv
# 显示系统 BIOS 中的硬件信息
dmidecode
# 显示磁盘 /dev/sda 的信息
hdparm -i /dev/sda
# 用于检查设备 /dev/sda 是否存在坏块,并显示检测进度
badblocks -s /dev/sda
~~~

## 登录

~~~ Bash
# 向指定主机名发起 SSH 连接
ssh user@hostname
# 使用特定端口发起 SSH 连接
ssh -p portNumber user@hostname
# 通过 telnet 连接到主机的默认端口 23
Connect to the host via telnet default port 23
# 通过l elnet 默认端口23连接到主机
telnet host
~~~

## 安装包

~~~ Bash
# 使用 RPM 包管理器安装 pkgName.rpm 包
rpm -i pkgName.rpm
# 卸载指定的 RPM 包
rpm -e pkgName
# 使用 DNF 安装指定的包，
dnf install pkgName
# 使用 Pacman 安装指定的包
pacman -S
~~~

## 安装源（编译）

~~~ Bash
# 检查系统兼容性并生成用于软件安装的 makefile
./configure
# 按照 makefoile 中的指令编译代码
make
# 将编译后的代码安装到指定的系统位置
make install
~~~

## 目录遍历

~~~ Bash
# 切换到父目录
cd ..
# 将当前目录更改为用户的主目录
cd
# 将当前目录更改为"/mnt"
cd /mnt
~~~

## 流程相关

~~~ Bash
# 显示当前进程的快照
ps
# 显示运行中的 tolnet 进程的详细信息
ps aux  | grep telnet
# 显示进程的内存映射
pmap
# 显示运行任务的动态实时视图
top
# 终止具有 PID 1234 的进程
kill 1234
# 终止所有名为'proc' 的进程
killall proc
# 终止具有指定名称的进程
pkill processName
# 在后台恢复暂停的作业
bg
# 将暂停的作业带到前台
fg
# 将作业编号为'n' 的作业移到前台运行
fg n
# 列出所有打开的文件和进程
lsof
# 更改具有给定 PID 的进程的优先级
renice 19 PID
# 显示firefox 进程的进程ID
pgrep firefox
# 显示运行中的进程树
pstree
~~~

## 网络

~~~ Bash
# 显示所有网络接口及其信息
ip addr show
# 将 IP 地址 192.168.0.1 分配给eth0接口
ip address add 192.168.0.1/24 dev eth0
# 显示网络接口及其配置
ifconfig
# 发送 ICMP 数据包,测量与 host 之问的往返时间
ping host
# 检索并显示域名的注册信息
whois domain
# 查询 DNS,提供域名的 DNS 信息
dig domain
# 将 IP 地址解析为主机名,显示 DNS 信息
dig -x host
# 对域名进行 IP 查找
host gexample.com
# 从指定路径下载文件
wget flePath
# 显示各种与网络相关的信息和统计数据
netstat
~~~

## 磁盘使用情况

~~~ Bash
# 显示所有已挂载文件系统可读的磁盘空问使用情况
df -h
# 显示所有已挂载文件系统的 inode 使用情况
df -i
# 列出所有驱动器上的分区及其信息
fdisk -l
# 显示 /dir1 目录的总磁盘使用大小的摘要,以可读方式呈现
du -sh/dir1
# 显示所有已挂载文件系统及其属性的列表
findmnt
# 将设备挂载到指定的文件系统挂载点上
mount devicePath mountPoint
~~~

## 压缩/存档

~~~ Bash
# 创建一个名为 backup.tar 的 tar 归档文件,其中包含 /home/ubuntu 目录的内容
tar -cf backup.tar/home/ubuntu
# 从 backup.tar 归档文件中提取文件
tar -xf backup.tar
# 创建一个名为 backup.tar.gz 的压缩 tar 归档文件,其中包含 /home/ubuntu 目录的内容
tar -zcvf backup.tar.gz/home/ubuntu
# 将文件 file1 压缩为 file1.gz,并删除原始文件
gzip file1
~~~

## 日志文件传输

~~~ Bash
# 将们 file.txt 复制到远程主机的指定目录
scp file.txt remoteuser@remoteHost:/remote/diroctory
# 将源目录的内容同步到目标目录,保留属性
rsync -a /home/ubuntu/backup/
# 同步本地目录到远程,保留属性
rsync -a /var/www/web/user@remoteHost:/backup/webBackup/
~~~

## 搜索

~~~ Bash
# 在文件中搜索给定的模式
grep pattern file
# 在 dir1 目录及其子目录中递归搜索指定的 pattern
grep -r pattern dir1
# 使用预建的数据库查找名为 file 的文件
locate file
# 递归搜索 /home 目录中名为 index 的文件
find /homeName index
# 在 /home 目录中查找大小超过 10000k 的文件
find /homeSize +10000k
~~~

## 文件权限

~~~ Bash
# 设置文件/data的权限为所有者读/写,组和其他人只读
chmod 644 /data/
# 将目录 /dir1 的权限设置为对所有者可读可写/可执行,对组和其他用户可读/可执行
chmod 755 /dir1
# 将文件 filename 的所有者更改为 bob 并将所属组更改为 devops
chown bob:devops filename
# 更改目录的所有者和所属组
chown ownername
~~~
