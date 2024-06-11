// 参数引入 see:https://gohugo.io/hugo-pipes/js/
// 这里得到的参数名全是小写
import { fuseOptions as confFuseOptions } from "@params";

// 搜索引擎 see: https://www.fusejs.io/
let fuse;
const El_Input = document.getElementById("searchInput");
const El_Result = document.getElementById("searchResults");

// fuse.js 默认搜索选项
const fuseOptions = {
  // 是否区分大小写
  isCaseSensitive: false,
  // 是否包含分数
  includeScore: false,
  // 是否排序
  shouldSort: true,
  // 包含匹配项
  includeMatches: false,
  // 查找所有匹配项
  findAllMatches: false,
  // 最小匹配字符长度
  minMatchCharLength: 1,
  // 位置
  location: 0,
  // 阈值
  threshold: 0.6,
  // 距离
  distance: 100,
  // 使用扩展搜索
  useExtendedSearch: false,
  // 忽略位置
  ignoreLocation: true,
  // 忽略字段规范
  ignoreFieldNorm: false,
  // 字段标准权重
  fieldNormWeight: 1,
  // 搜索键
  keys: ["title", "permalink", "summary", "content"],
};
// 融合默认选项和配置选项
for (const key in fuseOptions) {
  const lowerKey = key.toLowerCase();
  lowerKey in confFuseOptions && (fuseOptions[key] = confFuseOptions[lowerKey]);
}

// 请求搜索数据
fetch("../index.json")
  .then((response) => {
    if (!response.ok) throw new Error("Network response was not ok " + response.statusText);
    return response.json();
  })
  .then((data) => (fuse = new Fuse(data, fuseOptions)))
  .catch((error) => console.error("An exception occurred when requesting search data:", error));

window.test = (a) => {
  return fuse.search(a);
};

// 防抖
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// 搜索框输入
El_Input.addEventListener(
  "input",
  debounce(() => {
    console.log(1);
    if (!fuse) return;
    const result = fuse.search(El_Input.value.trim());
    if (result.length == 0) {
      El_Result.innerHTML = "";
      return;
    }
    // 结果html列表
    let resultSet = "";
    for (const item of result) resultSet += `<li><a class="fuseResult" href="${item.item.permalink}">${item.item.title}&nbsp;»</a></li>`;
    El_Result.innerHTML = resultSet;
  }, 200),
);
// × 点击
El_Input.addEventListener("search", () => {
  El_Input.value = "";
});

// 按键监听
window.addEventListener("keydown", (e) => {
  if (El_Result.childNodes.length == 0) return;
  const ae = document.activeElement;
  let focusEl = null;
  switch (e.key) {
    // 向下
    case "ArrowDown":
      e.preventDefault();
      if (ae == El_Input || !ae.classList.contains("fuseResult")) focusEl = El_Result.firstChild.lastChild;
      else focusEl = ae.parentElement.nextSibling.lastChild;
      break;
    // 向上
    case "ArrowUp":
      e.preventDefault();
      if (ae == El_Input || ae.parentElement == El_Result.firstChild) focusEl = El_Input;
      else focusEl = ae.parentElement.previousSibling.lastChild;
      break;
    // 向右
    case "ArrowRight":
      ae.click();
      break;
    case "Escape":
      El_Input.value = "";
      El_Input.dispatchEvent(new Event("input"));
      break;
    default:
      break;
  }
  focusEl?.focus();
});
