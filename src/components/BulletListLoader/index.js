import React, { memo } from 'react'
import { BulletList } from 'react-content-loader'
import './styles.scss'

const BulletListLoader = () => {
  return (
    <div className="bulletlist-loading-container">
      <BulletList />
    </div>
  )
}

export default memo(BulletListLoader)
