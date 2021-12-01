---
title: "Python enumerate() 函数"
date: 2020-01-09 19:52:03 +0800
categories: [开发]
tags: [Python]
pin: false
toc: false
comments: true
author: CK
---

# Python enumerate() 函数

## 描述

> enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在 for 循环当中。

## 语法

> enumerate(sequence, [start=0])

## 参数

- sequence -- 一个序列、迭代器或其他支持迭代对象。
- start -- 下标起始位置。

## 返回值

> 返回 enumerate(枚举) 对象。

**for循环:**

```python
    i = 0
    seq = ['one', 'two', 'three']
    for element in seq:
        print i, seq[i]
        i +=1
```

**结果：**

``` text
    0 one
    1 two
    2 three
```

```python
    seq = ['one', 'two', 'three']
    for i, element in enumerate(seq):
        print i, element
```

**结果：**

``` text
    0 one
    1 two
    2 three
```
