---
title: "FairyGui Events"
date: 2021-05-26 20:25:42 +0800
categories: [游戏开发]
tags: [FairyGui,UI]
pin: false
toc: false
comments: false
author: CK
------

```js
	Events.STATE_CHANGED="fui_state_changed";
	Events.XY_CHANGED="fui_xy_changed";
	Events.SIZE_CHANGED="fui_size_changed";
	Events.SIZE_DELAY_CHANGE="fui_size_delay_change";
	Events.CLICK_ITEM="fui_click_item";
	Events.SCROLL="fui_scroll";
	Events.SCROLL_END="fui_scroll_end";
	Events.DROP="fui_drop";
	Events.FOCUS_CHANGED="fui_focus_changed";
	Events.DRAG_START="fui_drag_start";
	Events.DRAG_MOVE="fui_drag_move";
	Events.DRAG_END="fui_drag_end";
	Events.PULL_DOWN_RELEASE="fui_pull_down_release";
	Events.PULL_UP_RELEASE="fui_pull_up_release";
    Events.GEAR_STOP="fui_gear_stop";
```

## GList

```js
	removeChildren()    //删除所有子级。
    addItemFromPool()   //添加项目到列表，与"从池获取"添加子项相同。
    addChild(GObject child)  //将子项添加到组件。它将在最前面的位置。
    addChildAt(GObject child,int index)  //将子项添加到组件指定位置。
    selectNone()    //删除选择。
```

## GTextInput

输入文本在文本改变时有通知事件：

```js
//Unity/Cry
aTextInput.onChanged.Add(onChanged);

//AS3
aTextInput.addEventListener(Event.CHANGE, onChanged);

//Egret
aTextInput.addEventListener(Event.CHANGE, this.onChanged, this);

//Laya
aTextInput.on(laya.events.Event.INPUT, this, this.onChanged);
```

在获得焦点和失去焦点时有通知事件：

```js
//Unity
aTextInput.onFocusIn.Add(onFocusIn);
aTextInput.onFocusOut.Add(onFocusOut);

//AS3
aTextInput.addEventListener(FocusEvent.FOCUS_IN, onFocusIn);
aTextInput.addEventListener(FocusEvent.FOCUS_OUT, onFocusOut);

//Egret
aTextInput.addEventListener(FocusEvent.FOCUS_IN, this.onFocusIn, this);
aTextInput.addEventListener(FocusEvent.FOCUS_OUT, this.onFocusOut, this);

//Laya
aTextInput.on(laya.events.Event.FOCUS, this, this.onFocusIn);
aTextInput.on(laya.events.Event.BLUR, this, this.onFocusOut);
```

如果要主动设置焦点，可以用

```
aTextInput.RequestFocus();
```

如果输入文本设置了单行，则当用户按回车键时会派发一个事件（注意，仅在PC上有效。在手机上的键盘按Done不属于支持范围内，引擎一般没有提供和手机键盘交互的接口）：

```
//Unity
aTextInput.onSubmit.Add(onSubmit);
```