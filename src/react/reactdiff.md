---
title: react性能优化
icon: reactDiff
headerDepth: 1
category:
  - react
---

# 性能优化

- 什么是性能优化
  命中「性能优化」的组件可以不通过 reconcile 生成 wip.child，而是直接复用上次更新生成的 wip.child。
- React 中性能优化的策略有哪些
  - bailout 策略
    如果`状态` 没有改变则复用上次更新生成的 wip.child。
  - eagerState 策略
    计算更新后的状态，如果与跟新前的状态相同，这不会开启后续的调度流程，所以也不会再有 render
- 什么时候才会命中性能优化
  什么才会导致组件的变化 我们根据 `UI=f(state)` 我们可以知道 `UI` 的变化是与`状态`有关而`状态`来源有哪些呢，也就是变化的部分

  - state
  - props
  - context

- 性能优化思路

  - 将「变化的部分」与「不变的部分」分离。
  - 命中性能优化的组件的子组件（而不是他本身）不需要 render。
    未优化的情况

  ```tsx
  import { useEffect, useRef, useState } from "react";
  import "./App.css";
  function BigComp() {
    let newData = performance.now();
    while (performance.now() - newData < 2000) {}
    console.log("子组件 render");
    return <p>大组件</p>;
  }
  function App() {
    const [num, setNum] = useState(0);
    console.log("父组件 render");
    return (
      <div>
        <p>{num}</p>
        <button
          onClick={() => {
            console.log("click");
            setNum((num) => num + 1);
          }}
        >
          加一
        </button>
        <BigComp />
      </div>
    );
  }
  export default App;
  ```

  从代码中有两个组件一个父组件 <App/> 组件， 还有一个耗时 2 秒的任务的子组件 <BigComp/>。我们不尽进行任何的性能优化时我们可以看到每次点击`加一`按钮就会有卡顿现象`{num}` 没有及时更新在页面上。因为有<BigComp/>占用主线程执行一些耗时任务。那我们需要进行组件的优化

  1.  将「变化的部分」与「不变的部分」分离。

  - 情况一

    ```tsx
    import { useEffect, useRef, useState } from "react";
    import "./App.css";

    function BigComp() {
      let newData = performance.now();
      while (performance.now() - newData < 2000) {}
      console.log("子组件render");
      return <p>大组件</p>;
    }

    function Num({ children }) {
      const [num, setNum] = useState(0);
      return (
        <>
          <p>{num}</p>
          <button
            onClick={() => {
              console.log("click");
              setNum((num) => num + 1);
            }}
          >
            加一
          </button>
        </>
      );
    }

    function App() {
      return (
        <div>
          <Num />
          <BigComp />
        </div>
      );
    }

    export default App;
    ```

    从代码中有三个组件一个父组件 <App/> 组件，还有一个<Num/>, 还有一个耗时 2 秒的任务的子组件 <BigComp/>。我们将变化的组件与不变的组件进行分离，我们可以看到每次点击`加一`，按钮就不会有`{num}`的卡顿现象，也不再打印出 `子组件render`。说明我们命中了组件的性能优化并没有重新触发组件的 render;

  - 情况二

    如果我们 `num` 变化需要跟新 `div` 节点的 `data-title` 的属性值我们要怎么做呢，这样我们就不能将<BigComp />拆解出去，再不使用 React 的性能优化的 hook 我们要怎么解决呢。

    ```tsx
    import { useEffect, useRef, useState } from "react";
    import "./App.css";

    function BigComp() {
      let newData = performance.now();
      while (performance.now() - newData < 2000) {}
      console.log("子组件render");
      return <p>大组件</p>;
    }

    function NumWrapper({ children }) {
      const [num, setNum] = useState(0);
      return (
        <div data-title={num}>
          <p>{num}</p>
          <button
            onClick={() => {
              console.log("click");
              setNum((num) => num + 1);
            }}
          >
            加一
          </button>
          {children}
        </div>
      );
    }

    function App() {
      return (
        <NumWrapper>
          <BigComp />
        </NumWrapper>
      );
    }

    export default App;
    ```

    从代码中有三个组件一个父组件` <App/>` 组件，还有一个`<NumWrapper>`,他接受一个`children` 作为他的子组件, 还有一个耗时 2 秒的任务的子组件 `<BigComp/>`。我们在`<App/>`组件中将 是将组件 `<BigComp/>` 放在`<NumWrapper/>`组件中，将`<BigComp/>`作为 children 传递给` <NumWrapper />`，我们可以看到每次点击`加一`按钮，也不会有`{num}`的卡顿现象，也不再打印出 `子组件render`。说明我们命中了组件的性能优化并没有重新触发组件的 render; 为什么会出现这种情况，为什么和我们不优化时的情况不一样呢，其实这个情况是因为我们将 `<BigComp /> `作为 props 传递到<NumWrapper/>中，当组件重新 `render` 时 `<BigComp/>` 的渲染不在 `<NumWrapper />` 中定义 所以不会触发`<BigComp/>`的重新 `render`。

- 总结
  一般在我们项目开发中遇到组件的性能瓶颈时，我们可以找到耗费性能的组件的父组件使用 将「变化的部分」与「不变的部分」分离，使其能够命中 react 的性能优化，减少 render。
