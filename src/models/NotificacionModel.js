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
      model="notificacion"
      Inputs={Inputs}
      Columns={Columns}
      submit={submit}
    />
  )
}

const Columns = (showModal, setDataToState) => {
  return [
    { label: 'Título', key: 'titulo' },
    { label: 'Fecha', key: 'fecha' },
    // {
    //   label: 'Acciones',
    //   key: 'actions',
    //   Render: selected => (
    //     <DatatableActions
    //       model="notificacion"
    //       selected={selected}
    //       showModal={showModal}
    //       setDataToState={setDataToState}
    //     />
    //   )
    // }
  ]
}

const Inputs = ({ titulo, cuerpo, imagen }) => {
  return (
    <React.Fragment>
      <Input
        name="titulo"
        label="Título"
        value={titulo}
        validations="minLength:3"
        validationError="Ingresa un título válido"
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
      <Uploader model="notificacion" url={imagen} /> */}
    </React.Fragment>
  )
}
