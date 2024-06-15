/** 全局属性 */

// 媒体主题浅色
const MediaColor_Light = window.matchMedia("(prefers-color-scheme: light)");

// theme-color 的 meta 元素
const Meta_ThemeColor = document.querySelector("meta[name=theme-color]");
// html 元素
const El_Root = document.documentElement;
const El_Header = document.getElementById("header");

// 主题颜色持久化Key
const ThemeColorKey = "themeColor";
// 主题颜色
const ThemeColor = {
  Auto: "auto",
  Light: "light",
  Dark: "dark",
};
// 获取当前主题
function GetCurrentThemeColor() {
  let color = ThemeColor.Light;
  if (El_Root.classList.contains(ThemeColor.Auto)) color = MediaColor_Light.matches ? ThemeColor.Light : ThemeColor.Dark;
  else if (El_Root.classList.contains(ThemeColor.Dark)) color = ThemeColor.Dark;
  return color;
}
