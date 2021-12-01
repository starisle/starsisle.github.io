---
title: "设置npm的registry"
date: 2020-04-20 15:07:42+0800
categories: [开发]
tags: [NodeJS]
pin: false
toc: false
comments: true
author: CK
---

## 1  原npm地址

```bash
npm config set registry http://registry.npmjs.org
```

## 2  设置国内镜像

#### 通过 Config 命令

```bash
npm config set registry https://registry.npm.taobao.org npm info underscore
```

#### 命令行指定

```bash
npm --registry https://registry.npm.taobao.org info underscore
```
