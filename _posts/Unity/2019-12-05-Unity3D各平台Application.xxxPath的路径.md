---
title: "Unity3D各平台Application.xxxPath的路径"
date: 2019-12-05 00:35:40 +0800
tags: "Unity"
categories: [游戏开发]
pin: false
toc: false
comments: true
author: CK
---
常用的是以下四个路径：

Application.dataPath
		Application.streamingAssetsPath
		Application.persistentDataPath
		Application.temporaryCachePath

iOS:

|                                 |                                                              |
| ------------------------------- | ------------------------------------------------------------ |
| Application.dataPath            | /var/containers/Bundle/Application/app sandbox/xxx.app/Data  |
| Application.streamingAssetsPath | /var/containers/Bundle/Application/app sandbox/test.app/Data/Raw |
| Application.temporaryCachePath  | /var/mobile/Containers/Data/Application/app sandbox/Library/Caches |
| Application.persistentDataPath  | /var/mobile/Containers/Data/Application/app sandbox/Documents |

Android:

|                                 |                                                      |
| ------------------------------- | ---------------------------------------------------- |
| Application.dataPath            | /data/app/package name-1/base.apk                    |
| Application.streamingAssetsPath | jar:file:///data/app/package name-1/base.apk!/assets |
| Application.temporaryCachePath  | /storage/emulated/0/Android/data/package name/cache  |
| Application.persistentDataPath  | /storage/emulated/0/Android/data/package name/files  |

Windows:

|                                 |                                                              |
| ------------------------------- | ------------------------------------------------------------ |
| Application.dataPath            | 应用的 appname_Data/                                         |
| Application.streamingAssetsPath | 应用的 appname_Data/StreamingAssets                          |
| Application.temporaryCachePath  | C:\Users\username\AppData\Local\Temp\company name\product name |
| Application.persistentDataPath  | C:\Users\username\AppData\LocalLow\company name\product name |





  