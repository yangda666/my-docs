---
title: react源码实现
icon: react
order: 3
headerDepth: 1
category:
  - react源码
---

# react Diff 算法

## 两种情况

1. 更新后为单节点

- 更新前为单节点
  A1 -> A2
  A1 -> B1
- 更新前为多节点
  A1B1 -> A1

只有在 `key` 与 `type` 相同时 才能复用当前节点 其他情况都不能复用

实现思路：

- 找出比较节点的 `key` 与 `type` 相同则复用

- 删除其他不能复用的兄弟节点

![alt text](./images/singleDiff.png)

代码实现

```tsx
// 单节点
function reconcilerSingleElement(
  returnFiber: FiberNode,
  currentFiber: FiberNode | null,
  element: ReactElementType
) {
  // 1. 查看是否可以复用fiber currentFiber 与 wip 的fiber 做对比
  const key = element.key;
  while (currentFiber !== null) {
    // update
    if (currentFiber.key === key) {
      // key 相同
      if (element.$$typeof === REACT_ELEMENT_TYPE) {
        if (currentFiber.type === element.type) {
          // 当前节点的key 与 type 相同
          // 复用 fiber
          const existing = useFiber(currentFiber, element.props);
          existing.return = returnFiber;
          // 当前节点可复用 删除剩下的兄弟节点
          deleteRemainingChildren(returnFiber, currentFiber.sibling);
          return existing;
        }
        // type 不同 说明没有可复用的节点 删除所有旧的节点
        deleteRemainingChildren(returnFiber, currentFiber);
        break;
      } else {
        if (__DEV__) {
          console.warn("还未实现的reconciler", element);
          break;
        }
      }
    } else {
      // key 不同删除当前的节点 并继续遍历
      deleteChild(returnFiber, currentFiber);
      currentFiber = currentFiber.sibling;
    }
  }
  // 创建fiber
  const fiber = createFiberFormElemnt(element);
  fiber.return = returnFiber;
  return fiber;
}
```

2. 更新后为多节点

## 三种情况

- a）节点的位置没有变化

```jsx
  // 更新前
  <ul>
    <li key="1" className="before">1</li>
    <li key="2">2</li>
  </ul>

  // 更新后
  <ul>
    <li key="1"  className="after">1</li>
    <li key="2">2</li>
  </ul>
```

- b）节点的增加或删除

```jsx
    // 更新前
    <ul>
      <li key="1">1</li>
      <li key="2">2</li>
      <li key="3">3</li>
    </ul>

    // 删除
    <ul>
      <li key="1">1</li>
      <li key="2">2</li>
    </ul>

    //增加
    <ul>
      <li key="1">1</li>
      <li key="2">2</li>
      <li key="3">3</li>
      <li key="4">4</li>
    </ul>
```

- c）节点的移动

```jsx
    // 更新前
    <ul>
      <li key="1">1</li>
      <li key="2">2</li>
      <li key="3">3</li>
    </ul>

    // 移动
    <ul>
      <li key="1">1</li>
      <li key="3">3</li>
      <li key="2">2</li>
    </ul>
```

### 实现思路：

- 两轮遍历，

  1. 第一轮遍历尝试复用所有节点
     此情况最为常见，节点的位置没有变化(作为性能优化)
     第一轮遍历后有一下三种情况

  - 新节点遍历完毕， 删除剩余的老节点
  - 老节点遍历完毕， 新增剩余的新节点
  - 新老节点有剩余， 处理节点的移动

  2. 处理节点的移动 情况

  - 将所有未处理的 `oldFiber` 存入 带 `Map` 的结构中

  ```tsx
  function mapRemainingChildren(
    currentFirstChild: Fiber
  ): Map<string | number, Fiber> {
    // Add the remaining children to a temporary map so that we can find them by
    // keys quickly. Implicit (null) keys get added to this set with their index
    // instead.
    const existingChildren: Map<string | number, Fiber> = new Map();

    let existingChild: null | Fiber = currentFirstChild;
    while (existingChild !== null) {
      if (existingChild.key !== null) {
        existingChildren.set(existingChild.key, existingChild);
      } else {
        existingChildren.set(existingChild.index, existingChild);
      }
      existingChild = existingChild.sibling;
    }
    return existingChildren;
  }
  ```

  - 第二轮遍历 剩下 `newChildren`
    1. 如何判断节点的移动
       判断的方法是 lastPlaceIndex 变量
    ```ts
    function placeChild(
      newFiber: Fiber,
      lastPlacedIndex: number,
      newIndex: number
    ): number {
      newFiber.index = newIndex;
      if (!shouldTrackSideEffects) {
        // During hydration, the useId algorithm needs to know which fibers are
        // part of a list of children (arrays, iterators).
        newFiber.flags |= Forked;
        return lastPlacedIndex;
      }
      const current = newFiber.alternate;
      if (current !== null) {
        const oldIndex = current.index;
        if (oldIndex < lastPlacedIndex) {
          // This is a move.
          newFiber.flags |= Placement;
          return lastPlacedIndex;
        } else {
          // This item can stay in place.
          return oldIndex;
        }
      } else {
        // This is an insertion.
        newFiber.flags |= Placement;
        return lastPlacedIndex;
      }
    }
    ```

### 举例

```tsx
  // 更新前
    <ul>
      <li key="1">1</li>
      <li key="2">2</li>
      <li key="3">3</li>
    </ul>

    // 移动
    <ul>
      <li key="1">1</li>
      <li key="3">3</li>
      <li key="2">2</li>
    </ul>
```

第一轮遍历开始
1（前） 与 1（后），可以复用， oldFiber.index = 0, lastPlaceIndex = 0
3（后） 与 (2) 前 ，不可复用， 跳出第一轮循环， lastPlaceIndex = 0
此时是 oldFiber 与 newChildren 都有剩余 将老节点 存放在 Map 中 以 `key` 或 `fiber.index` 做索引 以`fiber`做 `value`,
结构如下：

```tsx
{
  "2": FiberNode,
  "3": FiberNode,
}
```

开启第二轮遍历: 遍历剩余`newChildren`
"3" 在 map 中找到，可以复用 oldFiber.index = 2, 因为 oldFiber.index > lastPlaceIndex 所以 3 的位置不变，则 lastPlaceIndex = 2
"2" 在 map 中找到，可以复用 oldFiber.index = 1, 因为 oldFiber.index < lastPlaceIndex 所以 2 的位置变化，则 lastPlaceIndex = 2
第二轮遍历结束
最后 2 背标记移动 由于 2 对应的 fiber 没有 sibling 在 commitPlacement 方法中不存在 befoe 所以执行`parentNode.appendChild` 方法，对应的 dom 元素被添加父节点的最后

实现

```ts
function commitPlacement(finishedWork: Fiber): void {
  if (!supportsMutation) {
    return;
  }

  if (supportsSingletons) {
    if (finishedWork.tag === HostSingleton) {
      // Singletons are already in the Host and don't need to be placed
      // Since they operate somewhat like Portals though their children will
      // have Placement and will get placed inside them
      return;
    }
  }
  // Recursively insert all host nodes into the parent.
  const parentFiber = getHostParentFiber(finishedWork);

  switch (parentFiber.tag) {
    case HostSingleton: {
      if (supportsSingletons) {
        const parent: Instance = parentFiber.stateNode;
        const before = getHostSibling(finishedWork);
        // We only have the top Fiber that was inserted but we need to recurse down its
        // children to find all the terminal nodes.
        insertOrAppendPlacementNode(finishedWork, before, parent);
        break;
      }
      // Fall through
    }
    case HostComponent: {
      const parent: Instance = parentFiber.stateNode;
      if (parentFiber.flags & ContentReset) {
        // Reset the text content of the parent before doing any insertions
        resetTextContent(parent);
        // Clear ContentReset from the effect tag
        parentFiber.flags &= ~ContentReset;
      }

      const before = getHostSibling(finishedWork);
      // We only have the top Fiber that was inserted but we need to recurse down its
      // children to find all the terminal nodes.
      insertOrAppendPlacementNode(finishedWork, before, parent);
      break;
    }
    case HostRoot:
    case HostPortal: {
      const parent: Container = parentFiber.stateNode.containerInfo;
      const before = getHostSibling(finishedWork);
      insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent);
      break;
    }
    default:
      throw new Error(
        "Invalid host parent fiber. This error is likely caused by a bug " +
          "in React. Please file an issue."
      );
  }
}

function insertOrAppendPlacementNode(
  node: Fiber,
  before: ?Instance,
  parent: Instance
): void {
  const { tag } = node;
  const isHost = tag === HostComponent || tag === HostText;
  if (isHost) {
    const stateNode = node.stateNode;
    if (before) {
      insertBefore(parent, stateNode, before);
    } else {
      appendChild(parent, stateNode);
    }
  } else if (
    tag === HostPortal ||
    (supportsSingletons ? tag === HostSingleton : false)
  ) {
    // If the insertion itself is a portal, then we don't want to traverse
    // down its children. Instead, we'll get insertions from each child in
    // the portal directly.
    // If the insertion is a HostSingleton then it will be placed independently
  } else {
    const child = node.child;
    if (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      let sibling = child.sibling;
      while (sibling !== null) {
        insertOrAppendPlacementNode(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}
```
