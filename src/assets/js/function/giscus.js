/** giscus 评论 js */
// 参数引入 see:https://gohugo.io/hugo-pipes/js/
import { conf } from "@params";

// see:https://giscus.app/
(() => {
  // giscus 加载状态 !1 == false
  let giscusiFrameIsLoad = !1;

  // 加载 giscus
  function loadGiscus(giscusComments) {
    const giscusScript = document.createElement("script");
    giscusScript.setAttribute("src", "https://giscus.app/client.js");
    for (const key in conf) {
      giscusScript.setAttribute(key, conf[key]);
    }
    giscusScript.setAttribute("data-theme", GetCurrentThemeColor());
    giscusScript.async = true;
    giscusComments.appendChild(giscusScript);

    // 加载完成记录
    giscusScript.addEventListener("load", () => {
      document.querySelector("iframe.giscus-frame").addEventListener("load", () => (giscusiFrameIsLoad = true));
    });
  }

  /**
   * giscus 评论系统消息发送封装
   * @param {object} message 消息内容
   * message{
   *      theme?: Theme;
   *      repo?: string;
   *      repoId?: string;
   *      category?: string;
   *      categoryId?: string;
   *      term?: string;
   *      description?: string;
   *      backLink?: string;
   *      number?: number;
   *      strict?: boolean;
   *      reactionsEnabled?: boolean;
   *      emitMetadata?: boolean;
   *      inputPosition?: InputPosition;
   *      lang?: AvailableLanguage;
   *  }
   */
  function giscusSendMessage(message) {
    const giscusIframe = document.querySelector("iframe.giscus-frame");
    if (!giscusIframe) return;
    // 已加载，发送消息
    if (giscusiFrameIsLoad) {
      giscusIframe.contentWindow.postMessage({ giscus: { setConfig: message } }, "https://giscus.app");
    } else {
      // 未加载时直接替换 giscusIframe 的链接
      // 在safari中不能使用向前断言`(?<=...)`正则表达式会出错
      // giscusIframe.src = giscusIframe.src.replace(/(?<=[?|&]theme=)\w+/, message.theme);
      // 所以使用下面的方法替换
      giscusIframe.src = giscusIframe.src.replace(/([?|&]theme=)(\w+)/, `$1${message.theme}`);
    }
  }

  const giscusComments = document.getElementById("giscusComments");
  if (giscusComments) {
    // 加载giscus
    loadGiscus(giscusComments);
    // 监听主题变化
    window.addEventListener("themeColorChange", () => giscusSendMessage({ theme: GetCurrentThemeColor() }));
  }
})();
