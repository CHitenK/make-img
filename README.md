# make-img
>>基于Node, KOA2, node-canvas, ReactHooks, Mongo搭建自定义生成分享图系统

>> dome： [http://chimke.cn:8082/](http://chimke.cn:8082/)

>> 详细说明参考博客：

## 目录说明
│  .gitignore
│  README.md
│  
├─make-img-console            系统代码
│  │  .babelrc
│  │  package-lock.json
│  │  package.json
│  │  webpack.config.js
│  │  
│  ├─build
│  │      
│  └─src
│      │  App.css
│      │  App.js
│      │  index.css
│      │  index.html
│      │  index.js
│      │  
│      ├─api
│      │      index.js
│      │      
│      ├─components
│      ├─layout
│      │      index.js
│      │      index.scss
│      │      left.js
│      │      
│      ├─route
│      │      index.js
│      │      
│      ├─store
│      │      config.js
│      │      edit.js
│      │      makeimg.js
│      │      
│      ├─utils
│      │      menu.js
│      │      request.js
│      │      tool.js
│      │      
│      └─views
│          ├─edit
│          │      bgnex.js
│          │      index.js
│          │      index.scss
│          │      normalImg.js
│          │      preview.js
│          │      text.js
│          │      
│          ├─list
│          │      editOpitions.js
│          │      index.js
│          │      index.scss
│          │      
│          ├─login
│          │      index.js
│          │      index.scss
│          │      
│          └─makeimg
│                  bgnex.js
│                  index.js
│                  index.scss
│                  normalImg.js
│                  preview.js
│                  text.js
│                  
└─serve                               koa 
    │  package-lock.json
    │  package.json
    │  serve.js
    │  
    ├─db
    │      index.js                  连接数据库配置
    │      makeimg_db.js
    │      
    ├─serve_modules
    │      make-img.js
    │      
    └─utils
            config.js
            

## 启动服务器

cd ./serve/

cnpm i 

node ./serve.js

## 启动本地

cd ./make-img-console

cnpm i

cnpm run dev

## 打包部署文件

cnpm run build