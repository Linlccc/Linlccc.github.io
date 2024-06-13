/** 公共 js */

/* 主题变化处理 */
(() => {
  // 主题颜色更换触发器
  const triggerThemeColorChange = new CustomEvent("themeColorChange", {});
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
})();
// 监听主题颜色变化
(() => {
  window.addEventListener("themeColorChange", () => {
    // theme-color meta 颜色跟随主题颜色
    Meta_ThemeColor.setAttribute("content", getComputedStyle(El_Root).getPropertyValue("--background-100"));
  });
})();
// 读取持久化主题颜色
(() => {
  const themeColor = localStorage.getItem(ThemeColorKey);
  themeColor && (document.documentElement.className = themeColor);
  // 手动一次加载移动 theme_color 的属性
  Meta_ThemeColor.setAttribute("content", getComputedStyle(El_Root).getPropertyValue("--background-100"));
})();
