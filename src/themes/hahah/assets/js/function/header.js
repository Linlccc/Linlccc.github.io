/** header 部分 js */

// header 显示/隐藏
(() => {
  // 滚动标准
  const scrollStandard = 20;
  // 是否首次加载 !0 == true
  let isFirstLoad = !0;
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
(() => {
  const menu = document.getElementById("menu");
  if (menu) {
    menu.scrollLeft = localStorage.getItem("menuScrollPosition");
    menu.addEventListener("scroll", () => localStorage.setItem("menuScrollPosition", menu.scrollLeft));
  }
})();

// 主题切换
(() => {
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
      localStorage.setItem(ThemeColorKey, themeColor);
    });
  }
})();
