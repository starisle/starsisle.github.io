---
title: "Unity Vector3"
date: 2021-11-08 00:35:35
tags: "Unity"
categories: [Unity]
comments: false
---
<!-- more -->
# Unity Vector3

#### public static [Vector3](Vector3.html) **Project**([Vector3](Vector3.html) **vector**, [Vector3](Vector3.html) **onNormal**);

##### 描述

```
将一个向量投影到另一个向量上。

如果`onNormal`几乎为零，该函数将返回零向量。
```

![](E:\MD\Resources\Vector3\Vec3ProjectDiagram.png)





#### public static float **Dot**([Vector3](Vector3.html) **lhs**, [Vector3](Vector3.html) **rhs**);

##### 描述

```
两个向量的点积。

点积是一个浮点值，等于两个向量的大小相乘在一起，然后乘以它们之间的夹角的余弦值。

对于 **normalized** 向量，如果点指向完全相同的方向，则返回1；如果它们指向完全相反的方向，则返回-1；如果向量垂直，则返回0。
```



#### public static void **OrthoNormalize**(ref [Vector3](Vector3.html) **normal**, ref [Vector3](Vector3.html) **tangent**);

##### 描述

使向量归一化并彼此正交。

规范化`normal`。进行规范化`tangent`并确保与之正交`normal`（即它们之间的角度为90度）。

#### public static [Vector3](Vector3.html) **SmoothDamp**([Vector3](Vector3.html) **current**, [Vector3](Vector3.html) **target**, ref [Vector3](Vector3.html) **currentVelocity**, float **smoothTime**, float **maxSpeed** = Mathf.Infinity, float **deltaTime** = Time.deltaTime);

## 参数

| current         | The current position.                                        |
| --------------- | ------------------------------------------------------------ |
| target          | The position we are trying to reach.                         |
| currentVelocity | The current velocity, this value is modified by the function every time you call it. |
| smoothTime      | Approximately the time it will take to reach the target. A smaller value will reach the target faster. |
| maxSpeed        | Optionally allows you to clamp the maximum speed.            |
| deltaTime       | The time since the last call to this function. By default Time.deltaTime. |

## 描述

随着时间的流逝，矢量逐渐朝着期望的目标变化。

该矢量通过某些类似于弹簧阻尼器的函数进行平滑，该函数永远不会过冲。最常见的用途是平滑跟随摄像机。