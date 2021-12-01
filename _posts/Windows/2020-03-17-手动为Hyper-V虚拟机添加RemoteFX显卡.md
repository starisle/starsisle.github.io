---
title: 修改右键菜单
date: 2020-03-17 15:07:42 +0800
categories: [搞机]
tags: [Windows,虚拟机]
pin: false
toc: false
comments: true  
author: CK
---
## 前言

Hyper-V是微软家的虚拟机平台，RemoteFX是应用于Hyper-V虚拟机的显卡虚拟化技术。
但是自 Win10 1809 以后，微软放弃了 RemoteFX，使用自带管理器无法创建RemoteFx显卡了。

但是使用命令还是可以正常使用的。

1.检查显卡可用性
用管理员身份打开PowerShewll

![[image-20200506152514125.png]]

示例输出
![[image-20200506152551011.png]]

`如果CompatibleForVirtualization为False则代表该显卡不支持RemoteFX，可以洗洗睡了`



开启显卡支持

Enable-VMRemoteFXPhysicalVideoAdapter [显卡名]

> 就是上面的"Name"项

为虚拟机添加显卡
Add-VMRemoteFx3dVideoAdapter [虚拟机名]

> 就是Hyper-V管理器里虚拟机的"名称"列





## 已知问题

添加RemoteFX虚拟GPU后再使用增强会话模式有概率卡死。
关闭方法如图