const Router = require("koa-router");
const router = new Router();
const MakeImg = require("../db/makeimg_db");
const { success, error } = require("../utils/config")
const { createCanvas, loadImage } = require("canvas");
const Moment = require('moment')
// ------------------------------------ 接口 ---------------------------------------
// 生成图片
router.get("/api/makeimg", async (content, next) => {
  const query = content.query;
  const dbData = await find({ id: query.id });
  const options = dbData[0];
  if (!options.id) {
    content.response.body = error;
    return false;
  }
  const { bgData, normalOpt, textOpt } = options;
  const handledData = handleCodeUrl(content.request.url, query, [...normalOpt, ...textOpt])
  const canvas = createCanvas(bgData.width, bgData.height, "jpg");
  const ctx = canvas.getContext("2d");
  // 绘制底框
  if (bgData.isBgColor == 2 && bgData.bgImgSrc) { // 底图
    const bgImgSrc = await loadImage(bgData.bgImgSrc);
    ctx.drawImage(bgImgSrc, 0, 0, bgData.width, bgData.height);
    ctx.save();
  } else { // 底色
    let bgColor = ""
    bgImgSrc = bgData.bgImgSrc;
    bgColor = bgData.isTransmit
    ? "#" + query[bgData.transmitName]
    : bgData.bgColor;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, bgData.width, bgData.height);
    ctx.save();
  }
  // 绘制常规图片
  for (let i = 0; i < normalOpt.length; i++) {
    const item = normalOpt[i];
    let src  = ''
    if (item.isTransmit) {
      src = handledData.key === item.transmitName && handledData.imgUrl ? handledData.imgUrl : query[item.transmitName] || item.defaultSrc
    } else {
      src = item.src
    }
    if (!src) continue
    const myimg = await loadImage(src);
    ctx.drawImage(myimg, item.px, item.py, item.width, item.height);
    ctx.save();
  }
  // 绘制文字
  for (let i = 0; i < textOpt.length; i++) {
    const item = textOpt[i];
    let des = item.isTransmit ? query[item.transmitName] || item.defaultDes : item.des;
    if (!des) continue
    ctx.font = item.fontSize + "px" + '"Microsoft YaHei"'; // "Microsoft YaHei" 
    ctx.fillStyle = item.fsColor;
    ctx.moveTo(item.px, item.py)
    const y = item.py + parseInt(100 / item.py)
    drawtext(ctx, des, item.px, item.py, bgData.width - item.px + 3, item.fontSize)
    ctx.save();
  }
  content.set("content-type", "image/jpg");
  content.response.body = canvas.toBuffer();
  console.log(Moment().format('YYYY-MM-DD HH:mm:ss'), encodeURI(content.request.url))
});
// 数据插入
router.post("/api/makeimg/save", async (ctx, next) => {
  const res = { ...success, data: { flage: true } };
  const request = ctx.request.body;
  const flage = await inset(request);
  ctx.response.body = flage ? res : error;
});
// 列表分页
router.post("/api/makeimg/list", async (ctx, next) => {
  try {
    const query = ctx.request.body // 获取请求参数
    const page = { page: query.page, size: query.size }
    const queryData = {}
    if (query.id) {
      queryData.id = query.id
    } else if (query.name) {
      queryData.bgData.name = query.name
    } else if (query.creatName) {
      queryData.creatName = query.creatName
    }
    const array = await getList(page, queryData)
    const total = array[0]
    const content = array[1]
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss'), '请求列表数据', content)
    ctx.response.body = { ...success, data: { total, content }}
  } catch {
    ctx.response.body = error
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss'), '请求列表数据出错', query)
  }
 
});
/**
 * @default 通过id删除数据
 * @param {String} id 
 */
router.post('/api/makeimg/delete', async (ctx, next) => {
  try {
    const query = ctx.request.body
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss'), '删除，传入数据', query)
    const data = await deleteData({ 'id': query.id })
    if (data === true) {
      ctx.response.body = { ...success, data: { falge: true }}
    } else {
      ctx.response.body = { ...error, data: { falge: false }}
    }
  }catch {
    ctx.response.body = error
  }
})
/**
 * @description 修改数据
 */
router.post('/api/makeimg/update', async (ctx, next) => {
  try {
    const query = ctx.request.body
    const id = query.id
    delete query.id
    const data = await update(id,  query)
    if (data === true) {
      ctx.response.body = { ...success, data: { falge: true }}
    } else {
      ctx.response.body = { ...error, data: { falge: false }}
    }
  }catch {
    ctx.response.body = error
  }
})
/**
 * @description 通过id获取图片的配置数据
 * @param {String} id  
 */
router.get('/api/makeimg/detail', async (ctx, next) => {
  const query = ctx.query;
  const dbData = await find({ id: query.id });
  const options = dbData[0];
  console.log(options);
  if (!options.id) {
    ctx.response.body = error;
    return false;
  }
  ctx.response.body = { ...success, data: options }
})
 // ----------------------------------------- 函数------------------------------------
// 插入
function inset(data) {
  const makeimg = new MakeImg({
    ...data,
    id: "MKI" + Date.now()
  });
  return new Promise((resoved, reject) => {
    makeimg.save((err, res) => {
      if (err) {
        reject("error");
      } else {
        resoved(true);
      }
    });
  });
}
// 列表查找
function getList(pageData = {}, opt = {}) {
  console.log(pageData, opt)
  const P1 = new Promise((s, r) => {
    MakeImg.find(opt)
      .count((err, data) => {
        if (err) {
          r(0)
        } else {
          s(data)
        }
      })
  })
  const P2 = new Promise((s, r) => {
    const size = pageData.size || 5
    const page = (pageData.page -1) || 0
    MakeImg.find(opt)
      .limit(size)
      .skip(page * size)
      .exec((err, data) => {
        if (err) {
          r(false)
        } else {
          s(data)
        }
      })
  })
  return Promise.all([P1, P2])
}
// 删除数据
function deleteData(opt) {
  return  new Promise((s, r) => {
    MakeImg.deleteOne(opt, (err, data) => {
      if (err) {
        console.log('删除数据出错：', err)
        r(false)
      } else {
        console.log('删除数据成功：', data)
        if (data.deletedCount > 0) {
          s(true)
        } else {
          r(false)
        }
      }
    })
  })
}
/**
 * @description 更新数据
 */
function update(id, opt) {
  console.log(id, opt )
  return  new Promise((s, r) => { 
    MakeImg.updateOne({ id: id }, opt, (err,doc) => {
      if(err) {
        console.log('更新数据报错', err)
        r(false)
        return false
      }
      console.log('更新数据成功', doc)
      if (doc.nModified > 0 ) {
        s(true)
      } else {
        r(false)
      }
      
    })
  })
}
// 查找
function find(opt) {
  return new Promise((s, r) => {
    MakeImg.find(opt, (err, res) => {
      if (err) {
        r(err);
      } else {
        s(res);
      }
    });
  });
}
// 文字换行
//参数说明 ctx：canvas的 2d 对象，t：绘制的文字，x,y:文字坐标，w：文字最大宽度  文字大小
function drawtext(ctx,t,x,y,w, fs) {
  let chr = t.split("")
  let temp = ""
  let row = []
  for (let a = 0; a<chr.length;a++){
      if( ctx.measureText(temp).width < w && ctx.measureText(temp+(chr[a])).width <= w){
          temp += chr[a];
      }else{
          row.push(temp);
          temp = chr[a];
      }
  }
  row.push(temp)
  for(let b=0;b<row.length;b++){
    ctx.fillText(row[b],x,y+(b+1)*20);//每行字体y坐标间隔20
  }
}
// 处理小程序码
function handleCodeUrl(url, query, array) {
  let imgUrl = ''
  let key = ''
  if (url.indexOf('scene=') > 0 && url.indexOf('page=pages/') > 0) {
    const whiteArray = ['id']
    array.forEach(item => {
      if (item.isTransmit && item.transmitName && query[item.transmitName] && query[item.transmitName].indexOf('scene=') > 0) {
        imgUrl = query[item.transmitName]
        key = item.transmitName
        whiteArray.push(item.transmitName)
      } else if (item.isTransmit && item.transmitName && query[item.transmitName]) {
        whiteArray.push(item.transmitName)
      }
    })
    for (let i in query) {
      if (!whiteArray.includes(i)) {
        imgUrl += `&${i}=${query[i]}`
      }
    }
  }
  return { key, imgUrl }
}
module.exports = router
