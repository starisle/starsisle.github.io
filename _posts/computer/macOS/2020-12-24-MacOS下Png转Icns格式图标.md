---
title: MacOS下 Png 转 Icns 格式图标
author: IU
date: 2020-12-24 12:12:20 +0800
categories: [计算机,macOS]
tags: [MacOS]
pin: false
toc: true
comments: true  
---

## 第一步

准备一张1024*1024的png图，然后打开终端进入图片所在的文件夹执行
创建一个 png.iconset 的文件夹（手动创建也可以）

```terminal
    mkdir png.iconset
```

## 第二步

执行命令

```terminal
    sips -z 16 16 name.png --out png.iconset/icon_16x16.png
    sips -z 16 16 name.png --out png.iconset/icon_16x16.png
    sips -z 32 32 name.png --out png.iconset/icon_16x16@2x.png
    sips -z 32 32 name.png --out png.iconset/icon_32x32.png
    sips -z 64 64 name.png --out png.iconset/icon_32x32@2x.png
    sips -z 128 128 name.png --out png.iconset/icon_128x128.png
    sips -z 256 256 name.png --out png.iconset/icon_128x128@2x.png
    sips -z 256 256 name.png --out png.iconset/icon_256x256.png
    sips -z 512 512 name.png --out png.iconset/icon_256x256@2x.png
    sips -z 512 512 name.png --out png.iconset/icon_512x512.png
    sips -z 1024 1024 name.png --out png/icon_512x512@2x.png
```

16 16 图片 width 和 height

name.png 图片名

--out 存的位置/文件名

执行完后共计生成不同大小的10张图片

## 最后一步

执行以下命令，生成一个 favicon.icns 的文件

```terminal
iconutil -c icns pngpic.iconset -o favicon.icns
```
