import React from 'react'
import Datatable from '../components/Datatable'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

export default () => {
  return (
    <Datatable
      model="equipo"
      Inputs={() => ({})}
      Columns={Columns}
      submit={() => ({})}
      redirect="/equipos"
    />
  )
}

const Columns = showModal => {
  return [
    {
      label: 'Nombre',
      key: 'nombre',
      Render: element => <span>{element.nombre}</span>
    },
    {
      label: 'Acciones',
      key: 'actions',
      Render: selected => (
        <Link to={`/equipos/${selected.id}`}>
          <Icon type="eye" />
        </Link>
      )
    }
  ]
}
