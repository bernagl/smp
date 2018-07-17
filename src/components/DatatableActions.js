import React from 'react'
import { Dropdown, Icon, Menu, message } from 'antd'
import { updateDocument } from '../actions/firebase_actions'
import { Link } from 'react-router-dom'

export default ({ model, selected, showModal, setDataToState, redirect }) => {
  const update = async status => {
    const r = await updateDocument(model)({ ...selected, status })
    setDataToState()
    message.success(`Registro ${status === 1 ? 'activado' : 'desactivado'}`)
  }

  const menu = (
    <Menu>
      {selected.status === 1 ? (
        <Menu.Item onClick={() => update(0)}>Inactivo</Menu.Item>
      ) : (
        <Menu.Item onClick={() => update(1)}>Activo</Menu.Item>
      )}
    </Menu>
  )

  return (
    <div>
      {setDataToState && (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" href="#">
            {selected.status === 1 ? 'Activo' : 'Inactivo'} <Icon type="down" />
          </a>
        </Dropdown>
      )}
      {showModal && (
        <Icon
          type="edit"
          onClick={() => showModal(selected)}
          className="dt-edit-button"
        />
      )}
      {redirect && (
        <Link to={`/${redirect}/${selected.id}`}>
          <Icon type="eye" />
        </Link>
      )}
    </div>
  )
}
