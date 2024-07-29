---
title: "react"
icon: "react"
order: 4
headerDepth: 1
---

## 1. 在 react 中 hook 为什不能在 条件判断中使用

在 react 我们要知道 hook 为什不能在条件判断中使用我们要了解 react 的更新流程，react 的 FunctionComponent 的 Fiber 的数据结构 与 hook 的结构

```ts
// hook的数据结构
export type Hook = {
  // 当前计算出的值
  memoizedState: any;
  // 初始值
  baseState: any;
  baseQueue: Update<any, any> | null;
  queue: any;
  // 下一个hook的指针
  next: Hook | null;
};
// fiber 的结构
export type Fiber = {

  // fiber的类型标记
  tag: WorkTag,

  // Unique identifier of this child.
  key: null | string,

  // The value of element.type which is used to preserve the identity during
  // reconciliation of this child.
  elementType: any,

  // The resolved function/class/ associated with this fiber.
  type: any,

  // element节点
  stateNode: any,

  // 父fiber
  return: Fiber | null,

  // Singly Linked List Tree Structure.
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,
  // The ref last used to attach this node.
  // I'll avoid adding an owner field for prod and model that as functions.
  ref:
    | null
    | (((handle: mixed) => void) & {_stringRef: ?string, ...})
    | RefObject,

  refCleanup: null | (() => void),
  // Input is the data coming into process this fiber. Arguments. Props.
  pendingProps: any, // This type will be more specific once we overload the tag.
  memoizedProps: any, // The props used to create the output.
  // A queue of state updates and callbacks.
  updateQueue: mixed,
  // 在FC中存储的是第一个Hook指针的链表
  memoizedState: any,
  // Dependencies (contexts, events) for this fiber, if it has any
  dependencies: Dependencies | null,
  mode: TypeOfMode,
  // Effect
  flags: Flags,
  subtreeFlags: Flags,
  deletions: Array<Fiber> | null,
  lanes: Lanes,
  childLanes: Lanes,
  ...

```

首先我们看下我们 beginWork 主要对函数组件做了些什么 主要执行了 `updateFunctionComponent`

```tsx
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  ...
  switch (workInProgress.tag) {
    ...
    case FunctionComponent: {
      const Component = workInProgress.type;
      const unresolvedProps = workInProgress.pendingProps;
      const resolvedProps =
        disableDefaultPropsExceptForClasses ||
        workInProgress.elementType === Component
          ? unresolvedProps
          : resolveDefaultPropsOnNonClassComponent(Component, unresolvedProps);
      return updateFunctionComponent(
        current,
        workInProgress,
        Component,
        resolvedProps,
        renderLanes
      );
    }
    ...
  }
  ...
}
```

在 updateFunctionComponent 中 执行 renderWithHooks

```tsx
function updateFunctionComponent(
  current: null | Fiber,
  workInProgress: Fiber,
  Component: any,
  nextProps: any,
  renderLanes: Lanes,
) {
  ...
    nextChildren = renderWithHooks(
      current,
      workInProgress,
      Component,
      nextProps,
      context,
      renderLanes,
    );
  ...
  // React DevTools reads this flag.
  workInProgress.flags |= PerformedWork;
  reconcileChildren(current, workInProgress, nextChildren, renderLanes);
  return workInProgress.child;
}
```

我们继续看下 renderWithHooks 中干了些什么，我们是怎么在函数中保存我们 hook 状态的

```tsx
export function renderWithHooks<Props, SecondArg>(
  current: Fiber | null,
  workInProgress: Fiber,
  Component: (p: Props, arg: SecondArg) => any,
  props: Props,
  secondArg: SecondArg,
  nextRenderLanes: Lanes,
): any {
  renderLanes = nextRenderLanes;

  // 将 fiber 节点 存储一份为 currentlyRenderingFiber 全局变量中
  currentlyRenderingFiber = workInProgress;

 ...

  // 我们将 fiber 中的 memoizedState， updateQueue，lanes  置空了
  workInProgress.memoizedState = null;
  workInProgress.updateQueue = null;
  workInProgress.lanes = NoLanes;

  // The following should have already been reset
  // currentHook = null;
  // workInProgressHook = null;


  if (__DEV__) {
    ...
  } else {
    // 为 React 在 Update 阶段和 mount 阶段绑定不同 hook 的实现
    ReactSharedInternals.H =
      current === null || current.memoizedState === null
        ? HooksDispatcherOnMount
        : HooksDispatcherOnUpdate;
  }

  // In Strict Mode, during development, user functions are double invoked to
  // help detect side effects. The logic for how this is implemented for in
  // hook components is a bit complex so let's break it down.
  //
  // We will invoke the entire component function twice. However, during the
  // second invocation of the component, the hook state from the first
  // invocation will be reused. That means things like `useMemo` functions won't
  // run again, because the deps will match and the memoized result will
  // be reused.
  //
  // We want memoized functions to run twice, too, so account for this, user
  // functions are double invoked during the *first* invocation of the component
  // function, and are *not* double invoked during the second incovation:
  //
  // - First execution of component function: user functions are double invoked
  // - Second execution of component function (in Strict Mode, during
  //   development): user functions are not double invoked.
  //
  // This is intentional for a few reasons; most importantly, it's because of
  // how `use` works when something suspends: it reuses the promise that was
  // passed during the first attempt. This is itself a form of memoization.
  // We need to be able to memoize the reactive inputs to the `use` call using
  // a hook (i.e. `useMemo`), which means, the reactive inputs to `use` must
  // come from the same component invocation as the output.
  //
  // There are plenty of tests to ensure this behavior is correct.
  const shouldDoubleRenderDEV =
    __DEV__ &&
    debugRenderPhaseSideEffectsForStrictMode &&
    (workInProgress.mode & StrictLegacyMode) !== NoMode;

  shouldDoubleInvokeUserFnsInHooksDEV = shouldDoubleRenderDEV;
  let children = __DEV__
    ? callComponentInDEV(Component, props, secondArg)
    : Component(props, secondArg);
  shouldDoubleInvokeUserFnsInHooksDEV = false;

  // Check if there was a render phase update
  if (didScheduleRenderPhaseUpdateDuringThisPass) {
    // Keep rendering until the component stabilizes (there are no more render
    // phase updates).
    children = renderWithHooksAgain(
      workInProgress,
      Component,
      props,
      secondArg,
    );
  }
  ...

  // 清空一些全局变量 如 currentlyRenderingFiber = null
  finishRenderingHooks(current, workInProgress, Component);

  return children;
}
```

我们在函数调用能够保存上次执行的状态就在 这些 hook 中，
