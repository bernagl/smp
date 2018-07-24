import React, { Component } from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
import Label from '../components/Label'
import Input from '../components/Input'
import { Select } from 'antd'
import moment from 'moment'
import { sendNotification } from '../actions/notification_action'

export default class Notificacion extends Component {
  state = { tipo: 'evento' }
  submit = model => {
    const { tipo } = this.state
    const fecha = moment().format('L')
    const titulo =
      tipo[0].toUpperCase() + '' + tipo.substring(1, tipo.length)
    sendNotification(false)(model.titulo, titulo, tipo)
    return { ...model, fecha: model.fecha ? model.fecha : fecha, tipo }
  }

  handleTipoNotificacion = tipo => {
    this.setState({ tipo })
  }

  Inputs = () => {
    const { tipo } = this.state
    return (
      <React.Fragment>
        <Input
          name="titulo"
          label="Título"
          value=""
          validations="minLength:3"
          validationError="Ingresa un título válido"
          required
        />
        <Label label="Tipo de notificación">
          <Select onChange={this.handleTipoNotificacion} defaultValue={tipo}>
            <Select.Option value="evento">Evento</Select.Option>
            <Select.Option value="general">General</Select.Option>
            <Select.Option value="noticia">Noticia</Select.Option>
          </Select>
        </Label>
      </React.Fragment>
    )
  }
  render() {
    console.log(this.state)
    return (
      <Datatable
        model="notificacion"
        Inputs={this.Inputs}
        Columns={Columns}
        submit={this.submit}
      />
    )
  }
}

const Columns = (showModal, setDataToState) => {
  return [
    { label: 'Título', key: 'titulo' },
    { label: 'Fecha', key: 'fecha' },
    {
      label: 'Tipo',
      key: 'tipo',
      Render: n => <span>{n.tipo ? n.tipo : 'general'}</span>
    },
    {
      label: 'Acciones',
      key: 'actions',
      Render: selected => (
        <DatatableActions
          model="notificacion"
          selected={selected}
          // showModal={showModal}
          setDataToState={setDataToState}
        />
      )
    }
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
