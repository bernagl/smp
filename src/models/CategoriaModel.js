import React, { Component } from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Uploader from '../components/Uploader'
import moment from 'moment'

export default () => {
  const submit = model => {
    return { ...model, fecha: model.fecha ? model.fecha : moment().format('L') }
  }

  return (
    <Datatable
      model="categoria"
      Inputs={Inputs}
      Columns={Columns}
      submit={submit}
    />
  )
}

const Columns = (showModal, setDataToState) => {
  return [
    { label: 'Nombre', key: 'nombre' },
    { label: 'Fecha', key: 'fecha' },
    {
      label: 'Acciones',
      key: 'actions',
      Render: selected => (
        <DatatableActions
          model="categoria"
          selected={selected}
          showModal={showModal}
          setDataToState={setDataToState}
        />
      )
    }
  ]
}

const Inputs = ({ nombre, cuerpo, imagen }) => {
  return (
    <React.Fragment>
      <Input
        name="nombre"
        label="Nombre"
        value={nombre}
        validations="minLength:3"
        validationError="Ingresa un nombre válido"
        required
      />
      {/* <Input
        name="cuerpo"
        label="Cuerpo"
        value={cuerpo}
        validations="minLength:3"
        validationError="Ingresa una cuerpo válida"
        required
      />
      <Uploader model="categoria" url={imagen} /> */}
    </React.Fragment>
  )
}
