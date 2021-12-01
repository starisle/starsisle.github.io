---
title: "Debian Ubuntu CentOS 网络重装一键脚本"
date: 2021-07-15 19:02:33 +0800
categories: [服务器]
tags: [Linux]
pin: false
toc: false
comments: true
author: CK
---

```shell
wget --no-check-certificate -O AutoReinstall.sh https://git.io/AutoReinstall.sh && bash AutoReinstall.sh
```

# 支持重装的系统

- Ubuntu 18.04/16.04
- Debian 9/10
- CentOS 6
- CentOS 7 （DD方式）
- 自定义DD镜像

# 特性 / 优化

- 自动获取IP地址、网关、子网掩码
- 自动判断网络环境，选择国内/外镜像，解决速度慢的问题
- 懒人一键化，无需复杂的命令
- 解决萌咖脚本中一些导致安装错误的问题
- CentOS 7 镜像抛弃LVM，回归ext4，减少不稳定因素

# 注意

默认密码：Pwd@CentOS
或者：MoeClub.org
或者：Pwd@Linux
更改密码使用：passwd命令

- **安装后请尽快修改密码**，Linux系统建议启用密钥登陆。
- OpenVZ / LXC 架构系统不适用