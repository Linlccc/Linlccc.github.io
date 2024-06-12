/** footer 部分 js */

// 锚点点击
(() => {
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
(() => {
  const goToTop = document.getElementById("topLink");
  if (goToTop) {
    window.addEventListener("scroll", () => {
      if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) goToTop.classList.add("show");
      else goToTop.classList.remove("show");
    });
  }
})();
