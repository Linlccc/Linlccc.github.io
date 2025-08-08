---
abbrlink: Rx.NET
categories: []
date: '2025-08-08T14:57:40.226+08:00'
tags:
- C#
- Reactive
title: Reactive 响应式编程原理（Rx.NET）
updated: '2025-08-08T15:10:36.918+08:00'
---
本文系统梳理 .NET Reactive Extensions（Rx.NET）的核心机制，助你彻底理解 Observable、Observer、操作符、Sink 及数据流的创建与执行全过程。

---

## 一、Reactive 的核心理念

Reactive 的核心思想是“声明式的数据流 + 自动变化传播”。在 Rx.NET 中，最基础的两个接口是：

- **IObservable<T>**：可观察对象，相当于“数据流”或”事件流“的源头，能够不断向订阅者推送数据。
- **IObserver<T>**：观察者，负责接收 IObservable 推送的数据，需实现 OnNext（新值）、OnError（异常）、OnCompleted（结束）三个方法。

类比：IObservable 像广播站，IObserver 就是收音机，订阅频道后，任何新消息都会被主动推送。

---

## 二、Reactive 的创建过程

### 1. Observable 链的构建

通常从数据源（如属性变化、事件、定时器等）创建 Observable，再通过链式操作符（如 `Select`、`Where`、`Throttle`、`Switch` 等）不断组合加工事件流。

每加一个操作符，其实就是创建一个新的 Observable，把前一个嵌套进来，最终形成一条“嵌套的 Observable 链”。

示例代码：

```csharp
ReactiveObject obj = ...;

var source = Observable.FromEventPattern<PropertyChangedEventHandler, PropertyChangedEventArgs>(
    h => obj.PropertyChanged += h,
    h => obj.PropertyChanged -= h
);
var nameChanged = source
    .Where(e => e.EventArgs.PropertyName == "Name")
    .Select(e => ((MyType)e.Sender).Name);
```

每一层 Observable 都持有上游 Observable 的引用，形成链式结构。

### 2. 订阅时创建 Sink（观察者）链

只有调用 `.Subscribe()` 时，才会触发实际的“订阅”流程。此时 Rx 从链条最下游（你写的 Subscribe 回调）开始，逐层向上为每一层 Observable 构建 Sink（观察者），每层 Sink 负责本层的数据处理逻辑，并持有下游 Sink 的引用。

每一层 Observable 会把自身的 Sink 传递给上游，最终形成一条 Observer（Sink）链。

这一过程类似“责任链模式”——每一层 Sink 包装下游 Sink，收到数据先执行自己的逻辑，再决定是否传递。

### 3. 管理订阅句柄

每当 Observable 被订阅，会返回一个 `IDisposable`，可用来随时取消订阅，释放资源。这有效防止内存泄漏和事件未解绑等问题。

---

## 三、Reactive 的执行过程

### 1. 数据源推送

当最上游的数据源（如属性变化事件）发生时，Observable 会通过 OnNext/OnError/OnCompleted 方法，将事件推送给它的 Sink。

### 2. 逐层处理与传递

每一层 Sink（观察者）收到数据后，先执行本层定义的逻辑（如筛选、映射、过滤等），然后（如果需要）把处理结果继续推送给下游 Sink。常见操作有：

- **过滤**（Where）：只传递满足条件的数据
- **映射**（Select）：对数据进行转换
- **合并/切换**（Merge/Switch）：组合多个流
- **节流**（Throttle/Debounce）：限制事件推送频率

### 3. 最终回调触发

最终，数据会流到最下游 Sink（即你在 Subscribe 注册的回调）。只要数据未被拦截或过滤掉，你就能收到最终结果。

---

## 四、流程图示意

### 构建、订阅与执行

```
Observable 源
   │（链式构建）
   ▼
Observable1 → Observable2 → ... → ObservableN（最下游）
                                           │（订阅时反向构建）
                                           ▼
Sink0（最上游）← Sink1 ← ... ← SinkN-1 ← SinkN(用户回调)
  │（数据推送）
  ▼
Sink0（最上游）→ Sink1 → ... → SinkN-1 → SinkN(用户回调)
```

- **链式操作符**：Observable 链从源头到下游逐步包装。
- **订阅时反向构建 Sink 链**：每一层 Sink 向上层注册自己。
- **数据正向流动**：数据源变化后，数据从上游流向下游，层层处理，最终推给用户回调。

### 取消订阅

```
订阅后返回 SinkN（最下游 Sink），它是可释放对象。释放流程如下：

SinkN(用户回调)
   │释放：解除对用户回调的引用，并调用 SinkN-1 的释放
   ▼
SinkN-1
   │释放：解除对下游 Sink(SinkN) 的引用，并调用上游 Sink(SinkN-2) 的释放
   ▼
  ...
   │
   ▼
Sink0（最上游 Sink）释放后，最上游 Observable 解除对数据源的监听（如事件解绑、定时器停止）
```

---

## 五、其它重要概念

- **Subject**：既是 Observable，又是 Observer。常用于事件桥接或手动推送数据。
- **Scheduler**：控制事件流在哪个线程/上下文中执行，如 UI 线程、后台线程等。
- **ConnectableObservable**：支持手动启动数据流（如 Publish/Replay 创建的流）。
- **Cold vs Hot Observable**：冷流每次订阅独立推送，热流所有订阅者共享推送。

---

## 六、典型应用场景

- UI 事件响应（如按钮点击、文本输入）
- 数据流组合与依赖（如表单校验、实时搜索联动）
- 异步操作链式处理（如网络请求、文件读取等）
- 复杂状态管理与自动变更同步

---

## 七、总结

Rx 的机制本质是**声明式描述异步事件流**，通过链式操作符组合，用订阅建立数据流通路。其核心在于**嵌套 Observable、反向 Sink 链、正向数据推送、可取消订阅**。

理解了 Observable 链与 Sink 链的建立与运行过程，就能真正掌握 Reactive 编程的精髓。

---
