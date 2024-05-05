---
# 标题
title: "Nginx基础配置"
# 描述
description: ""
# 摘要
Summary: ""
# 标签
tags: ["nginx"]
# 显示权重（越小显示越靠前）
weight: 1000

# 撰写日期
date: "2024-05-05 19:57:58"
---

## 具体配置可见

[NGINX 配置](https://tsejx.github.io/devops-guidebook/server/nginx)
[NGINX 备忘清单](https://wangchujiang.com/reference/docs/nginx.html)

## Web服务器

~~~ nginx
# http
server {
  listen 80;
  server_name _;
  location / {
    root /data;
    index index.html index.htm;
  }
}

# https
server {
  listen 443 ssl;
  server_name _;
  ssl_certificate /path/to/certificete.crt;
  ssl_certificate_key /path/to/private-key.key;
  location / {
    root /data;
    index index.html index.htm;
  }
}
~~~

## 反向代理

~~~ nginx
server {
  listen 80;
  server_name _;
  location / {
    proxy_pass http://192.168.241.11;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
~~~

## 负载均衡

~~~ nginx
upstream web {
  ip_hash
  #会话保持
  server 192.168.241.22;
  server 192.168.241.23;
}
server {
  listen 80;
  server_name _;
  location / {
    proxy_pass http://web;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
~~~

## 重定向

~~~ nginx
# 老域名跳转新域名
server {
  listen 80;
  server_name old.cxk.cn;
  location / {
    rewrite ^/(.*)$ https://new.cxk.cn/$1;
  }
}

# 路径重定向
server {
  listen 80;
  server_name old.cxk.cn;
  location / {
    rewrite ^/old.cxk.cn/(.*)$ /new-path/$1;
  }
}
~~~

## 防盗链

~~~ nginx
server {
  listen 80;
  server_name _;
  location ~* \.(gif|jpg|jpeg|png) {
    valid_referers none blocked *.cxk.cn;
    if ($invalid_referer) {
      return 403;
    }
  }
}
~~~

## 手机端重定向PC

~~~ nginx
server {
  listen 80;
  server_name _;
  location / {
    if ($http_user_agent ~* '(android|iphone|ipad)') {
      return ^/(.*)$ https://yd.cxk.cn/$1;
    }
  }
}
~~~

## 基于请求路径转发不同服务

~~~ nginx
server {
  listen 80;
  server_name _;
  location / {
    proxy_pass http://192.168.241.11;
    proxy_set_header Host $host;
    proxy_set_header X-Real_IP $remote_addr;
  }
  location /beijing {
    proxy_pass http://192.168.241.22;
    proxy_set_header Host $host;
    proxy_set_header X-Real_IP $remote_addr;
  }
  location /nanjing {
    proxy_pass http://192.168.241.23;
    proxy_set_header Host $host;
    proxy_set_header X-Real_IP $remote_addr;
  }
}
~~~
