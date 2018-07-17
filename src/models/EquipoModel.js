import React from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
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

const Columns = (showModal, setDataToState) => {
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
        <DatatableActions
          selected={selected}
          model="equipo"
          setDataToState={setDataToState}
          redirect="equipos"
        />
      )
    }
  ]
}
