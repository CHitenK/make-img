// import { lazy } from 'react'
// const Makeimg = lazy(() =>  import('./../views/makeimg/index'))
// const EditImg = lazy(() =>  import('./../views/edit/index'))
// const List = lazy(() =>  import('./../views/list/index'))
import Makeimg from './../views/makeimg/index'
import EditImg from './../views/edit/index'
import List from './../views/list/index'
const router = [
  {
    path: "/content/list",
    component: List,
    name: '分享图管理'
  },
  {
    path: "/content/makeimg",
    component: Makeimg,
    name: '新增分享图'
  },
  {
    path: "/content/edit/:id",
    component: EditImg,
    name: '编辑'
  }
]

export default router