/** 单页面 js */
import { conf } from "@params";

// 目录激活
(() => {
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

// 复制按钮
(() => {
  const beforeCopyText = conf.copy;
  const afterCopyText = conf.copied;
  document.querySelectorAll(".codeBlock .codeCopy").forEach((codeCopyButton) => {
    // 获取code元素
    const codes = codeCopyButton.closest(".codeBlock").getElementsByTagName("code");
    const code = codes[codes.length - 1];
    if (!code) return;
    codeCopyButton.addEventListener("click", () => {
      // clipboard 只有在 window.isSecureContext(https) 时才能使用
      const clipboard = navigator.clipboard;
      if (clipboard) clipboard.writeText(code.textContent);
      else {
        // 清除当前选中
        const selection = window.getSelection();
        selection.removeAllRanges();
        // 选择元素
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.addRange(range);
        // 复制内容
        try {
          document.execCommand("copy");
        } catch (e) {}
        selection.removeAllRanges();
      }
      // 复制后
      codeCopyButton.innerHTML = afterCopyText;
      setTimeout(() => (codeCopyButton.innerHTML = beforeCopyText), 2000);
    });
  });
})();
