---
title: hexo+git+nginx 云服务器搭建
date: 2020-03-17 08:07:42 +0800
categories: [博客]
tags: [hexo]
pin: false
toc: true
comments: true  
---


# 安装nginx

### 执行以下命令查看是否安装git

```shell
git --version 

//如果未安装执行以下命令 

sudo apt-get install git
```

# 单独创建一个用户来管理git

```shell
adduser git 
passwd git // 设置密码
su git // 切换用户
cd /home/git/
mkdir -p projects/hexoBlog // 创建文件来放置hexo静态工程
mkdir repos && cd repos //创建文件放置git仓库
git init --bare hexoBlog.git // 创建一个裸露的仓库
cd hexoBlog.git/hooks
vi post-receive //创建hook钩子函数(git提交时自动部署)

hook钩子函数内容:
#!/bin/sh
git --work-tree=/home/git/projects/hexoBlog --git-dir=/home/git/repos/hexoBlog.git checkout -f
```

## 修改权限

```shell
chmod +x post-receive
exit // 退出到 root 登录
chown -R git:git /home/git/repos/hexoBlog.git // 添加权限
```

## git搭建完成

```shell
git clone git@119.28.41.16:/home/git/repos/hexoBlog.git
```

# 重启 Nginx 服务

```shell
sudo service nginx restart
```
