---
title: css
icon: css
order: 5
category:
  - css
---

# css ❤️‍🔥

## css 技巧

### 小技巧 1: 构建一个响应式和可访问的导航栏菜单，使用 HTML CSS JS

flex 布局是 css3 中新增的布局方式，可以轻松地在容器中对齐和分配空间。

### 小技巧 2: 使用 CSS 变量

CSS 变量可以让你在整个样式表中重用值，方便维护和修改。例如：

```css
:root {
  --primary-color: #11121a;
  --hover-color: #272832;
  --accent-color: #0071ff;
}
```

### 小技巧 3: 响应式设计

使用媒体查询来创建适应不同屏幕尺寸的布局。例如：

```css
@media screen and (max-width: 700px) {
  nav {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: min(15em, 100%);
    z-index: 10;
    transition: right 300ms ease-in-out;
  }
  nav.show {
    right: 0;
  }
}
```

### 小技巧 4: 使用 `:focus` 伪类

为可访问性添加样式，确保用户在使用键盘导航时能够看到焦点。例如：

```css
.skip-link:focus {
  opacity: 1;
  pointer-events: auto;
  outline: 3px solid #ffffff;
}
```

### 小技巧 5: 使用 `calc()` 函数

`calc()` 函数允许你在 CSS 中进行动态计算，适用于响应式设计。例如：

```css
.container {
  width: calc(100% - 20px);
  padding: 10px;
}
```

### 小技巧 6: 使用 `transition` 和 `transform`

使用 `transition` 和 `transform` 可以创建平滑的动画效果。例如：

```css
.button {
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: var(--accent-color);
  transform: scale(1.05);
}
```

### 小技巧 7: 使用 `grid` 布局

CSS Grid 是一种强大的布局系统，可以创建复杂的布局。例如：

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
```

```html
// about.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" defer></script>
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <button
      id="open-sidebar-button"
      onclick="openSidebar()"
      aria-label="open sidebar"
      aria-expanded="false"
      aria-controls="navbar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40px"
        viewBox="0 -960 960 960"
        width="40px"
        fill="#c9c9c9"
      >
        <path
          d="M165.13-254.62q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.86q7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.87q-7.22 7.12-17.9 7.12H165.13Zm0-200.25q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13H165.13Zm0-200.26q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.87q7.22-7.12 17.9-7.12h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.86q-7.22 7.13-17.9 7.13H165.13Z"
        />
      </svg>
    </button>

    <nav id="navbar">
      <ul>
        <li>
          <button
            id="close-sidebar-button"
            onclick="closeSidebar()"
            aria-label="close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#c9c9c9"
            >
              <path
                d="m480-444.62-209.69 209.7q-7.23 7.23-17.5 7.42-10.27.19-17.89-7.42-7.61-7.62-7.61-17.7 0-10.07 7.61-17.69L444.62-480l-209.7-209.69q-7.23-7.23-7.42-17.5-.19-10.27 7.42-17.89 7.62-7.61 17.7-7.61 10.07 0 17.69 7.61L480-515.38l209.69-209.7q7.23-7.23 17.5-7.42 10.27-.19 17.89 7.42 7.61 7.62 7.61 17.7 0 10.07-7.61 17.69L515.38-480l209.7 209.69q7.23 7.23 7.42 17.5.19 10.27-7.42 17.89-7.62 7.61-17.7 7.61-10.07 0-17.69-7.61L480-444.62Z"
              />
            </svg>
          </button>
        </li>
        <li class="home-li"><a href="index.html">Home</a></li>
        <li>
          <a href="about.html" class="active-link" aria-current="page">About</a>
        </li>
        <li><a class="accent-link" href="login.html">Login</a></li>
      </ul>
    </nav>

    <div id="overlay" onclick="closeSidebar()" aria-hidden="true"></div>

    <main>
      <h1>About</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        perferendis amet odio nostrum, in architecto voluptatum nihil incidunt.
        Mollitia enim, dolorum laborum voluptas voluptate modi ipsam quam.
        Similique repellat perspiciatis accusantium sed assumenda modi maiores
        id deleniti dolor obcaecati, ea asperiores amet corporis porro
        reiciendis quos qui laborum. Architecto, perferendis?
      </p>
    </main>
  </body>
</html>

// index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Home</title>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js" defer></script>
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <button
      id="open-sidebar-button"
      onclick="openSidebar()"
      aria-label="open sidebar"
      aria-expanded="false"
      aria-controls="navbar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="40px"
        viewBox="0 -960 960 960"
        width="40px"
        fill="#c9c9c9"
      >
        <path
          d="M165.13-254.62q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.86q7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.87q-7.22 7.12-17.9 7.12H165.13Zm0-200.25q-10.68 0-17.9-7.27-7.23-7.26-7.23-17.99 0-10.74 7.23-17.87 7.22-7.13 17.9-7.13h629.74q10.68 0 17.9 7.27 7.23 7.26 7.23 17.99 0 10.74-7.23 17.87-7.22 7.13-17.9 7.13H165.13Zm0-200.26q-10.68 0-17.9-7.26-7.23-7.26-7.23-18t7.23-17.87q7.22-7.12 17.9-7.12h629.74q10.68 0 17.9 7.26 7.23 7.26 7.23 18t-7.23 17.86q-7.22 7.13-17.9 7.13H165.13Z"
        />
      </svg>
    </button>

    <nav id="navbar">
      <ul>
        <li>
          <button
            id="close-sidebar-button"
            onclick="closeSidebar()"
            aria-label="close sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40px"
              viewBox="0 -960 960 960"
              width="40px"
              fill="#c9c9c9"
            >
              <path
                d="m480-444.62-209.69 209.7q-7.23 7.23-17.5 7.42-10.27.19-17.89-7.42-7.61-7.62-7.61-17.7 0-10.07 7.61-17.69L444.62-480l-209.7-209.69q-7.23-7.23-7.42-17.5-.19-10.27 7.42-17.89 7.62-7.61 17.7-7.61 10.07 0 17.69 7.61L480-515.38l209.69-209.7q7.23-7.23 17.5-7.42 10.27-.19 17.89 7.42 7.61 7.62 7.61 17.7 0 10.07-7.61 17.69L515.38-480l209.7 209.69q7.23 7.23 7.42 17.5.19 10.27-7.42 17.89-7.62 7.61-17.7 7.61-10.07 0-17.69-7.61L480-444.62Z"
              />
            </svg>
          </button>
        </li>
        <li class="home-li">
          <a class="active-link" aria-current="page" href="index.html">Home</a>
        </li>
        <li><a href="about.html">About</a></li>
        <li><a class="accent-link" href="login.html">Login</a></li>
      </ul>
    </nav>

    <div id="overlay" onclick="closeSidebar()" aria-hidden="true"></div>

    <main>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
        perferendis amet odio nostrum, in architecto voluptatum nihil incidunt.
        Mollitia enim, dolorum laborum voluptas voluptate modi ipsam quam.
        Similique repellat perspiciatis accusantium sed assumenda modi maiores
        id deleniti dolor obcaecati, ea asperiores amet corporis porro
        reiciendis quos qui laborum. Architecto, perferendis?
      </p>
    </main>
  </body>
</html>
```

````js
const openButton = document.getElementById("open-sidebar-button");
const navbar = document.getElementById("navbar");

const media = window.matchMedia("(width < 700px)");

media.addEventListener("change", (e) => updateNavbar(e));

function updateNavbar(e) {
  const isMobile = e.matches;
  console.log(isMobile);
  if (isMobile) {
    navbar.setAttribute("inert", "");
  } else {
    // desktop device
    navbar.removeAttribute("inert");
  }
}

function openSidebar() {
  navbar.classList.add("show");
  openButton.setAttribute("aria-expanded", "true");
  navbar.removeAttribute("inert");
}

function closeSidebar() {
  navbar.classList.remove("show");
  openButton.setAttribute("aria-expanded", "false");
  navbar.setAttribute("inert", "");
}

updateNavbar(media)```css

@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap");
:root {
  --primary-color: #11121a;
  --hover-color: #272832;
  --accent-color: #0071ff;
  --text-color: #c9c9c9;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-family: Poppins, "Segoe UI", sans-serif;
  color: var(--text-color);
  scroll-behavior: smooth; /*For bookmark links*/
}
body {
  min-height: 100vh;
  min-height: 100dvh;
  background-color: var(--primary-color);
}
main {
  padding: min(5em, 7%);
}
main p {
  margin-top: 0.35em;
}
nav {
  background-color: var(--primary-color);
  border-bottom: 1px solid var(--hover-color);
}
nav ul {
  list-style: none;
  display: flex;
}
nav .home-li {
  margin-right: auto;
}
nav li {
  display: flex;
}
nav a {
  display: flex;
  text-decoration: none;
  color: var(--text-color);
  padding: 1em 2em;
  transition: background-color 150ms ease;
}
nav a:hover {
  background-color: var(--hover-color);
}
nav a.active-link {
  border-bottom: 2px solid var(--text-color);
}
nav a.accent-link {
  background-color: var(--accent-color);
}
#open-sidebar-button {
  display: none;
  background: none;
  border: none;
  padding: 1em;
  margin-left: auto;
  cursor: pointer;
}
#close-sidebar-button {
  display: none;
  background: none;
  border: none;
  padding: 1em;
  cursor: pointer;
}
#overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  inset: 0;
  z-index: 9;
  display: none;
}
.skip-link {
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
  background-color: var(--accent-color);
  color: #ffffff;
  padding: 12px 24px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  transition: opacity 0.3s ease;
}

.skip-link:focus {
  opacity: 1;
  pointer-events: auto;
  outline: 3px solid #ffffff;
}
@media screen and (max-width: 700px) {
  #open-sidebar-button,
  #close-sidebar-button {
    display: block;
  }
  nav {
    position: fixed;
    top: 0;
    right: -100%;
    height: 100vh;
    width: min(15em, 100%);
    z-index: 10;
    border-left: 1px solid var(--hover-color);
    transition: right 300ms ease-in-out;
  }
  nav.show {
    right: 0;
  }
  nav.show ~ #overlay {
    display: block;
  }
  nav ul {
    width: 100%;
    flex-direction: column;
  }
  nav a {
    width: 100%;
    padding-left: 2.5em;
  }
  nav a.active-link {
    border-bottom: none;
  }
  nav .home-li {
    margin-right: unset;
  }
}
```;
````
