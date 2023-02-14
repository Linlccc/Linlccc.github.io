# Github 托管项目

## [个人博客](https://linlccc.com)

该项目使用[Github Action](https://docs.github.com/en/actions)自动部署[Hugo](https://github.com/gohugoio/hugo)生成的静态博客

### 自动部署

- 推送 [src](src) 目录的更新
- 推送 [deploy-blog-to-github-pages](.github/workflows/deploy-blog-to-github-pages.yml) 文件的更新

## 拉取

~~~ git
git clone git@github.com:Linlccc/Linlccc.github.io.git
cd Linlccc.github.io
git submodule update --init --recursive
~~~
