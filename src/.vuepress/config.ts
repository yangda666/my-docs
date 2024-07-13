import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "coder-yang",
  description: "成为伟大的前端工程师",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
