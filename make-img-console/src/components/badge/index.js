import React, { useState, useEffect } from "react"
import './index.scss'

const Badge = (prams) => {
  const { name } = prams
   return(
     <div className="badge-box">
        <div className="space-label">
          <div className="top">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
          </div>
   <div className="text">{name || '新建图片'}</div>
          <div className="bottom">
              <div className="ring"></div>
              <div className="ring"></div>
              <div className="ring"></div>
          </div>
      </div>
     </div>
   )
}

export default Badge