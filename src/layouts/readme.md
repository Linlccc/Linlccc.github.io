# 布局目录文件解释

## 标记解释

``` text
"#"   表示已修改
"@"   完全自己写
"^"   已经全部自写完成
"!"   空模板
```

## layouts

``` text
根目录
```

- 404.html
  - 404页面模板
- rebots.txt[@]
  - robots.txt 爬虫配置文件

### _default

``` text
布局模板目录
```

- archive.html[^]
  - 渲染归档页的模板，如：archives页面
- baseof.html[^]
  - 渲染所有页面的基础模板
- index.json
  - 站点json数据模板
- list.html[^]
  - 渲染列表页的模板，如：posts页面
- rss.xml
  - rss 模板
- search.html[^]
  - 搜索页面模板
- single.html[^]
  - 渲染单个页面的模板，如：文章页面
- terms.html[^]
  - 渲染分类和标签页面的模板

#### _makrup

``` text
标记模板目录
```

- render-image.html[^]
  - 文章内图片模板

### partials

``` text
局部模板目录
```

- anchored_heading.html
  - 文章内容的标题添加锚点模板
- author.html[^]
  - 渲染作者信息的模板
- breadcrumb.html
  - 渲染面包屑导航的模板
- comments.html[@]
  - 渲染评论的模板
- cover.html
  - 渲染封面的模板
- edit_post.html
  - 渲染文章编辑按钮的模板
- extend_footer.html[!]
  - 渲染页底的模板
- extend_head.html[!]
  - 渲染页头的模板
- footer.html[^]
  - 渲染页脚的模板
- GLOBAL_CUSTOM_EVENT.html
  - 全局自定义事件/对象
- head.html[^]
  - 页面head的模板
- header.html[^]
  - 渲染页眉的模板-
- home_info.html
  - 普通页面个人信息的模板
- index_profile.html
  - 个人主页模板
- post_canonical.html
  - 渲染文章原链接的模板
- post_meta.html[^]
  - 渲染文章元信息的模板
- post_nav_links.html
  - 渲染上一章/下一章导航的模板
- share_icons.html
  - 渲染分享按钮的模板
- social_icons.html
  - 渲染社交图标的模板
- svg.html
  - 所有图标
- toc.html
  - 文章目录模板
- translation_list.html
  - 文章中的语言列表

#### templates

``` text
模板目录
```

- opengraph.html
  - 设置网站的Open Graph信息 see:<https://ogp.me/>
- schema_json.html
  - 设置网站的JSON-LD信息 see:<https://json-ld.org/>
- twitter_cards.html
  - 设置网站的Twitter Cards信息 see:<https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary>

### shortcodes

``` text
简码目录
```

- collapse.html
  - 折叠内容
- figure.html
  - 图片
- inTextImg.html
  - 图片
- ltr.html
  - 文字
- rawhtml.html
  - 文字
- rtl.html
  - 文字
