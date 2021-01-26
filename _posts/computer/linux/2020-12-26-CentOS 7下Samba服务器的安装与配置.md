---
title: CentOS 7下Samba服务器的安装与配置
author: IU
date: 2020-12-26 18:11:12 +0800
categories: [计算机,linux]
tags: [centOs,samba]
pin: false
toc: true
comments: true  
---

# 一、简介

Samba是一个能让Linux系统应用Microsoft网络通讯协议的软件，而SMB是Server Message Block的缩写，即为服务器消息块 ，SMB主要是作为Microsoft的网络通讯协议，后来Samba将SMB通信协议应用到了Linux系统上，就形成了现在的Samba软件。后来微软又把 SMB 改名为 CIFS（Common Internet File System），即公共 Internet 文件系统，并且加入了许多新的功能，这样一来，使得Samba具有了更强大的功能。

　　Samba最大的功能就是可以用于Linux与windows系统直接的文件共享和打印共享，Samba既可以用于windows与Linux之间的文件共享，也可以用于Linux与Linux之间的资源共享，由于NFS(网络文件系统）可以很好的完成Linux与Linux之间的数据共享，因而 Samba较多的用在了Linux与windows之间的数据共享上面。

　　SMB是基于客户机/服务器型的协议，因而一台Samba服务器既可以充当文件共享服务器，也可以充当一个Samba的客户端，例如，一台在Linux 下已经架设好的Samba服务器，windows客户端就可以通过SMB协议共享Samba服务器上的资源文件，同时，Samba服务器也可以访问网络中 其它windows系统或者Linux系统共享出来的文件。
Samba在windows下使用的是NetBIOS协议，如果你要使用Linux下共享出来的文件，请确认你的windows系统下是否安装了NetBIOS协议。

　　组成Samba运行的有两个服务，一个是SMB，另一个是NMB；SMB是Samba 的核心启动服务，主要负责建立 Linux Samba服务器与Samba客户机之间的对话， 验证用户身份并提供对文件和打印系统的访问，只有SMB服务启动，才能实现文件的共享，监听139 TCP端口；而NMB服务是负责解析用的，类似与DNS实现的功能，NMB可以把Linux系统共享的工作组名称与其IP对应起来，如果NMB服务没有启动，就只能通过IP来访问共享文件，监听137和138 UDP端口。

　　例如，某台Samba服务器的IP地址为192.168.126.15，对应的工作组名称为MYWORKGROUP，那么在Windows的IE浏览器输入下面两条指令都可以访问共享文件。其实这就是Windows下查看Linux Samba服务器共享文件的方法。
　　\\192.168.126.15\共享目录名称
　　\\MYWORKGROUP\共享目录名称

　　Samba服务器可实现如下功能：WINS和DNS服务； 网络浏览服务； Linux和Windows域之间的认证和授权； UNICODE字符集和域名映射；满足CIFS协议的UNIX共享等。

# 二、系统环境准备

**查看系统信息**

```sh
[root@localhost ~]# cat /etc/redhat-release
```

**查看yum源中SAMBA版本**

```sh
[root@localhost ~]# yum list | grep samba
```

**查看CentOS7IP地址**

```sh
[root@localhost ~]# ifconfig
或者
[root@localhost ~]# ip address
```

**关闭防火墙及关闭防火墙开机自启**

```sh
[root@localhost ~]# systemctl stop firewalld.service 
[root@localhost ~]# systemctl disable firewalld.service 
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.
Removed symlink /etc/systemd/system/basic.target.wants/firewalld.service.
```

**查看SeLinux状态**

```sh
[root@localhost ~]# sestatus
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   enforcing
Mode from config file:          error (Success)
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Max kernel policy version:      28
```

**临时关闭SeLinux**

```sh
[root@localhost ~]# setenforce 0
```

**查看SeLinux状态**

```sh
[root@localhost ~]# sestatus
SELinux status:                 enabled
SELinuxfs mount:                /sys/fs/selinux
SELinux root directory:         /etc/selinux
Loaded policy name:             targeted
Current mode:                   permissive
Mode from config file:          error (Success)
Policy MLS status:              enabled
Policy deny_unknown status:     allowed
Max kernel policy version:      28
```

**永久关闭SeLinux，需要重启机器**

修改配置文件/etc/selinux/config，将SELINU置为disabled

查看修改后：

```sh
[root@localhost ~]# cat /etc/selinux/config 

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
# SELINUX=enforcing
SELINUX=disabled
# SELINUXTYPE= can take one of three two values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected. 
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted 
```

**重启后，查看SeLinux状态**

```sh
[root@localhost ~]# sestatus
SELinux status:                 disabled
```

# 三、安装Samba服务

1、在可以联网的机器上使用yum工具安装，如果未联网，则挂载系统光盘进行安装。

```sh
[root@localhost ~]# yum install samba
```

有依赖关系的包samba-common、samba-winbind-clients、libsmbclient将自动安装上去。

2、查看安装状况

```sh
[root@localhost ~]# rpm -qa | grep samba
```

![image-20201226140850248](/assets/img/sample/computer/linux/image-20201226140850248.png)

Samba服务器安装完毕，会生成配置文件目录/etc/samba，/etc/samba/smb.conf是samba的核心配置文件。

3、查看SMB服务状态

```sh
[root@localhost ~]# service smb status
```

![image-20201226140738241](/assets/img/sample/computer/linux/image-20201226140738241.png)

4、启动SMB服务：

```sh
[root@localhost ~]# systemctl start smb
```

![image-20201226141020151](/assets/img/sample/computer/linux/image-20201226141020151.png)

5、设置开机自启动

```sh
[root@localhost ~]# systemctl enable smb
```

![image-20201226141037842](/assets/img/sample/computer/linux/image-20201226141037842.png)

# 四、配置Samba服务

1. 修改配置文件

    先备份配置文件

   ```sh
   [root@localhost ~]# cp -p /etc/samba/smb.conf    /etc/samba/smb.conf.orig
   ```

   修改配置

   ```
   [global]
           workgroup = SAMBA																				//定义工作组
           erver string = WZQ Samba Server Version %v     					//定义Samba服务器的简要说明
           netbios name = WZQSamba
           
           log file = /var/log/samba/log.%m                  //定义Samba用户的日志文件，%m代表客户端主机名
           
           security = user 
           map to guest = Bad User                                 //共享级别，用户不需要账号和密码即可访问
           printcap name = cups
           
           idmap config * : backend = tdb
           cups options = raw
   
   
   [public]                                                  //设置针对的是共享目录个别的设置，只对当前的共享资源起作用
           comment = Public Stuff                            //对共享目录的说明文件，自己可以定义说明信息
           path = /share                                     //用来指定共享的目录，必选项
           public = yes                                      //所有人可查看,等效于guest ok = yes		 
   ```

   ​	

2. 创建共享目录

   
   ```sh
   [root@localhost ~]# mkdir share
   ```
   
   由于要设置匿名用户可以下载或上传共享文件，所以要给/share目录授权为nobody权限。
   
   ```sh
   [root@localhost ~]# chown -R 1777 share重启smb服务
   ```
   
3. 重启服务

    ```sh
    [root@localhost ~]# systemctl restart smb
    ```

    

