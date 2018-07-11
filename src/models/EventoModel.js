import React, { Component } from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Label from '../components/Label'
import Uploader from '../components/Uploader'
import moment from 'moment'
import { DatePicker } from 'antd'

const { RangePicker } = DatePicker

export default class Evento extends Component {
  submit = model => {
    const { fechas } = this.state
    if (!fechas) return false
    return {
      ...model,
      fecha: model.fecha ? model.fecha : moment().format('L'),
      inicio: moment(fechas[0]).format(),
      fin: moment(fechas[1]).format()
    }
  }

  setValue = (key, value) => {
    this.setState({ [key]: value })
  }

  Inputs = ({ titulo, cuerpo, imagen, inicio, fin }) => {
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
        <Input
          name="cuerpo"
          label="Cuerpo"
          value={cuerpo}
          validations="minLength:3"
          validationError="Ingresa una cuerpo válida"
          required
        />
        <Label label="Fechas">
          <RangePicker
            onChange={fechas => this.setValue('fechas', fechas)}
            defaultValue={[moment(inicio), moment(fin)]}
            placeholder={['Inicio', 'Fin']}
          />
        </Label>
        <Label label="Imagen">
          <Uploader model="evento" url={imagen} />
        </Label>
      </React.Fragment>
    )
  }
  render() {
    return (
      <Datatable
        model="evento"
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
      label: 'Acciones',
      key: 'actions',
      Render: selected => (
        <DatatableActions
          model="evento"
          selected={selected}
          showModal={showModal}
          setDataToState={setDataToState}
        />
      )
    }
  ]
}
