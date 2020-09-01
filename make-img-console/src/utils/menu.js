import React from 'react'
import { HomeOutlined, InsertRowAboveOutlined, SaveOutlined, DatabaseOutlined } from '@ant-design/icons'
const muneList = [
  {
    name: '分享图管理',
    id: 101,
    path: '/content/list',
    icon: <InsertRowAboveOutlined />,
    isMenu: true
  },
  {
    name: '生成分享图',
    id: 102,
    path: '/content/makeimg',
    isMenu: true,
    icon: <SaveOutlined />
  }
]
export default muneList