---
title: "CharacterMovement"
date: 2021-11-08 00:35:21
tags: "UE4"
categories: [UE4]
comments: false
---
<!-- more -->
# 'Rigidbody'移动和'Charactercontroller'移动区别

## 物体碰撞的条件

- 两个物体都必须带有碰撞器（Collider),其中一个必须带有刚体（Rigidbody) 或者 "Charactercontroller" 组件.
- 检测碰撞发生的方式，利用 碰撞器（Collider) 或者 触发器(Trigger)

> 触发器只需要在碰撞器组件中勾选 IsTrigger 属性

### 触发信息检测

        1. MonoBehaviour.OnTriggerEnter(Collider collider)  当进入触发器
        2. MonoBehaviour.OnTriggerExit(Collider collider)   当退出触发器
        3. MonoBehaviour.OnTriggerStay(Collider collider)   当逗留触发器

### 碰撞信息检测

        1.MonoBehaviour.OnCollisionEnter(Collision collision)   当进入碰撞器
        2.MonoBehaviour.OnCollisionExit(Collision collision)    当退出碰撞器
        3.MonoBehaviour.OnCollisionStay(Collision collision)    当逗留碰撞器

## 碰撞器是触发器的载体，而触发器只是碰撞器身上的一个属性

    - 当 IsTrigger = false 时，碰撞器根据物理引擎引发碰撞，产生碰撞的效果，可以调用 OnCollisionEnter/Stay/Exit 函数；
    - 当 IsTrigger = true 时，碰撞器被物理引擎所忽略，没有碰撞效果，可以调用 OnTriggerEnter/Stay/Exit 函数。（然而在charactercontroler控制的运动中运动物体的 IsTrigger = true 时照样可以发生碰撞）
