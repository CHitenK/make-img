# make-img

>>基于Node, KOA2, node-canvas, ReactHooks, Mongo搭建自定义生成分享图系统


>> 网址： [http://chimke.cn:8082/](http://chimke.cn:8082/)

>> 详细说明参考博客：

## 自定义生成分享图效果图：

### 简单生成的图片 
>> [http://chimke.cn:8082/api/makeimg?id=MKI1598282872607](http://chimke.cn:8082/api/makeimg?id=MKI1598282872607)

### 传参生成的图片 
>> [http://chimke.cn:8082/api/makeimg?id=MKI1598350477880&n=7098](http://chimke.cn:8082/api/makeimg?id=MKI1598350477880&n=7098)

### 配置化传参生成的图片

>>[http://chimke.cn:8082/api/makeimg?id=MKI1598930966762&pro_img=https://pic.e111.com.cn/group1/M00/04/11/Cg1F-V8Wtj2AOUcKAAdMbvce1R8535.png_750.png&daren=https://api.crossplus.topgoods.mobi/weixin/imageCtrl/getminiqrQr?scene=208190,2525,&page=pages/index/productDetail/productDetail&width=300&pfChannelId=36&pro_name=【小罐尝鲜】MeadJohnson美赞臣港版NeuroPro智睿HMO奶粉3段(1-3岁)400g/罐&pro_price=12.93](http://chimke.cn:8082/api/makeimg?id=MKI1598930966762&pro_img=https://pic.e111.com.cn/group1/M00/04/11/Cg1F-V8Wtj2AOUcKAAdMbvce1R8535.png_750.png&daren=https://api.crossplus.topgoods.mobi/weixin/imageCtrl/getminiqrQr?scene=208190,2525,&page=pages/index/productDetail/productDetail&width=300&pfChannelId=36&pro_name=【小罐尝鲜】MeadJohnson美赞臣港版NeuroPro智睿HMO奶粉3段(1-3岁)400g/罐&pro_price=12.93)


## 目录说明
```
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
    │      index.js                  连接数据库
    │      makeimg_db.js
    │      
    ├─serve_modules
    │      make-img.js
    │      
    └─utils
            config.js

```                

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