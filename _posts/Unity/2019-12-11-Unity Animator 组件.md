---
title: "Unity Animator 组件"
date: 2019-12-11 10:46:17 +0800
tags: "Unity"
categories: [Unity]
comments: false
---

1. Controller：使用的 Animator Controller 文件。
2. Avatar：使用的骨骼文件。
3. Apply Root Motion：绑定该组件的 GameObject 的位置是否可以由动画进行改变（如果存在改变位移的动画）。
4. Update Mode：更新模式：Normal 表示使用 Update 进行更新，Animate Physics 表示使用 FixUpdate 进行更新（一般用在和物体有交互的情况下），Unscale Time 表示无视 timeScale 进行更新（一般用在 UI 动画中）。
5. Culling Mode：剔除模式：
    - Always Animate：表示即使摄像机看不见也要进行动画播放的更新，
    - Cull Update Transform：表示摄像机看不见时停止动画播放但是位置会继续更新，
    - Cull Completely：表示摄像机看不见时停止动画的所有更新。
