// 参数引入 see:https://gohugo.io/hugo-pipes/js/
import { fuseOptions as confFuseOptions } from "@params";

// 搜索引擎 see: https://www.fusejs.io/
let fuse;

// fuse.js 默认搜索选项
const defaultFuseOptions = {
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
  ignoreLocation: false,
  // 忽略场范数
  ignoreFieldNorm: false,
  // 字段标准权重
  fieldNormWeight: 1,
  // 搜索键
  keys: ["title", "permalink", "summary", "content"],
};
// 融合默认选项和配置选项
const fuseOptions = { ...defaultFuseOptions, ...confFuseOptions };

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
