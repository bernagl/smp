import React from 'react'
import { Form } from 'antd'

const { Item } = Form

export default ({ children, label }) => {
  return (
    <Item label={label} layout="vertical">
      {children}
    </Item>
  )
}
