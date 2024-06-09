# Linlccc.github.io

[个人博客](https://linlccc.com)

该项目使用 [Github Action](https://docs.github.com/en/actions) 自动部署 [Hugo](https://github.com/gohugoio/hugo) 生成的静态博客

## Clone

```git
git clone git@github.com:Linlccc/Linlccc.github.io.git
cd Linlccc.github.io
```

## 自动部署

- 推送 [src](src) 目录的更新
- 推送 [deploy-blog-to-github-pages](.github/workflows/deploy-blog-to-github-pages.yml) 文件的更新

## hugo 模板语法使用规范

### 获取参数

```go
// 按优先级递归获取参数
// 先获取页面的参数如果没有再获取站点参数
{{ .Param "title" }}

// 获取页面参数
{{ .Params.title }}

// 获取站点参数
{{ site.Params.title }}
```

## 主题 Readme

### Css

- [ ] normalize
- [ ] reset
- [ ] 按需引入 css
- [ ] 自定义样式
