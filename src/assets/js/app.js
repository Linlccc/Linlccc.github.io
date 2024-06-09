// 媒体主题浅色
const MediaColor_Light = window.matchMedia("(prefers-color-scheme: light)");

// theme-color 的 meta 元素
const Meta_ThemeColor = document.querySelector("meta[name=theme-color]");
// html 元素
const El_Root = document.documentElement;
const El_Header = document.getElementById("header");

// 主题颜色
const ThemeColor = {
  Auto: "auto",
  Light: "light",
  Dark: "dark",
};

// 主题颜色更换触发器
const triggerThemeColorChange = new CustomEvent("themeColorChange", {
  detail: () => {
    // 计算当前主题
    let color = ThemeColor.Light;
    if (El_Root.classList.contains(ThemeColor.Auto)) color = MediaColor_Light.matches ? ThemeColor.Light : ThemeColor.Dark;
    else if (El_Root.classList.contains(ThemeColor.Dark)) color = ThemeColor.Dark;
    return color;
  },
});

// 监听系统颜色变化
MediaColor_Light.addEventListener("change", (e) => {
  if (!El_Root.classList.contains(ThemeColor.Auto)) return;
  // 触发主题变化
  window.dispatchEvent(triggerThemeColorChange);
});
// 监听 html 元素的 class 变化
new MutationObserver((mutationsList, observer) => {
  // 触发主题变化
  window.dispatchEvent(triggerThemeColorChange);
}).observe(El_Root, { attributes: true, attributeFilter: ["class"] });

/* ----------------下面全部都是功能实现---------------- */

// 监听主题颜色变化
(function () {
  window.addEventListener("themeColorChange", (e) => {
    // theme-color meta 颜色跟随主题颜色
    Meta_ThemeColor.setAttribute("content", getComputedStyle(El_Root).getPropertyValue("--background-100"));
  });
})();

// header 显示/隐藏
(function () {
  // 滚动标准
  const scrollStandard = 20;
  // 是否首次加载 !!1 == true
  let isFirstLoad = !!1;
  // 最后一次位置
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    // 第一次不处理
    if (isFirstLoad) {
      isFirstLoad = false;
      return;
    }

    // 当前位置
    const scrollTop = document.documentElement.scrollTop;
    // 滚动距离不达标不处理
    if (Math.abs(scrollTop - lastScrollTop) < scrollStandard) return;
    // 是否向下滚动
    const isScrollDown = scrollTop > lastScrollTop;

    // 向下滚动时隐藏
    if (isScrollDown) El_Header.classList.add("hide");
    else El_Header.classList.remove("hide");

    // 重置滚动位置
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });
})();

// 记录/加载菜单滚动位置(考虑直接写到html中，避免屏闪)
(function () {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.scrollLeft = localStorage.getItem("menuScrollPosition");
    menu.addEventListener("scroll", () => localStorage.setItem("menuScrollPosition", menu.scrollLeft));
  }
})();

// 主题切换（该功能由配置控制）
(function () {
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      // 计算切换后的主题颜色
      let themeColor = ThemeColor.Light;
      if (El_Root.classList.contains(ThemeColor.Auto)) themeColor = MediaColor_Light.matches ? ThemeColor.Dark : ThemeColor.Light;
      else if (El_Root.classList.contains(ThemeColor.Light)) themeColor = ThemeColor.Dark;
      // 设置主题颜色
      El_Root.className = themeColor;
      // 持久化
      localStorage.setItem("themeColor", themeColor);
    });
  }
})();

// 锚点点击
(function () {
  // 计算滚动是否需要动画
  const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      // 禁止默认处理
      e.preventDefault();
      // 计算目标元素
      const id = anchor.getAttribute("href").substr(1);
      const elTarget = document.querySelector(`[id='${decodeURIComponent(id)}']`);

      // header 信息
      const headerHeight = El_Header.getBoundingClientRect().height;
      const headerIsShow = !El_Header.classList.contains("hide");
      // 计算移动距离
      let moveY = Math.ceil(elTarget.getBoundingClientRect().y);
      // (向上移动 || (header显示 && 移动距离小于header)) 留出header位置
      if (moveY < 0 || (headerIsShow && moveY <= headerHeight)) moveY -= headerHeight;
      if (moveY == 0) return;
      window.scrollBy({ top: moveY, behavior: behavior });

      // 添加历史记录
      if (id == "top") history.replaceState(null, null, " ");
      else history.pushState(null, null, `#${id}`);
    });
  });
})();

// 回到顶部功能
(function () {
  const goToTop = document.getElementById("topLink");
  if (goToTop) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) goToTop.classList.add("show");
      else goToTop.classList.remove("show");
    });
  }
})();

// 目录激活
(function () {
  const toc = document.getElementById("toc");
  if (toc) {
    // 目录内容
    const tocLi = toc.getElementsByTagName("li");
    // 目录相应的锚点内容
    const anchors = Array.from(document.getElementsByClassName("anchor")).map((a) => a.parentNode);
    // 最后的滚动位置
    let lastScrollTop = 0;
    // 当前激活索引
    let currentIndex = -1;
    window.addEventListener("scroll", () => {
      // 不足以显示侧边目录，不处理
      if (window.innerWidth < 1280) return;
      // 计算是否向下滚动
      const scrollTop = document.documentElement.scrollTop;
      const isScrollDown = scrollTop > lastScrollTop;
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      // 计算激活起始位置
      const startY = El_Header.classList.contains("hide") ? 0 : El_Header.getBoundingClientRect().height;
      // 计算当前激活锚点索引
      const activeAnchorIndex = anchors.findIndex((a, i) => {
        // 有当前索引时，根据滚动方向跳过不必要计算的
        if (currentIndex != -1) {
          if (isScrollDown && i < currentIndex) return;
          else if (!isScrollDown && i > currentIndex) return;
        }
        let y = Math.ceil(a.getBoundingClientRect().y);
        return y >= startY && y < startY + 50;
      });
      // 没有找到激活索引 || 激活索引就是当前激活目录，不处理
      if (activeAnchorIndex == -1 || tocLi[activeAnchorIndex].classList.contains("active")) return;
      currentIndex = activeAnchorIndex;
      // 打开目录
      toc.setAttribute("open", "");
      // 修改激活状态
      for (let i = 0; i < tocLi.length; i++) {
        if (i == activeAnchorIndex) tocLi[i].classList.add("active");
        else tocLi[i].classList.remove("active");
      }
    });
  }
})();
