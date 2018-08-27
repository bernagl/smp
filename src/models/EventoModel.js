import React, { Component } from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Label from '../components/Label'
import Uploader from '../components/Uploader'
import moment from 'moment'
import { DatePicker, Select } from 'antd'
import { getDocumentsByModel } from '../actions/firebase_actions'
import { spawn } from 'child_process'

const { RangePicker } = DatePicker

export default class Evento extends Component {
  state = { categorias: [] }
  async componentDidMount() {
    const categorias = await getDocumentsByModel('categoria')
    this.setState({ categorias })
  }

  submit = model => {
    const { categoria, inicio, fin } = this.state
    // if (!categoria) return false
    return {
      ...model,
      fecha: model.fecha ? model.fecha : moment().format('L'),
      inicio: moment(inicio).format(),
      votacion: 0,
      // categoria,
      fin: moment(fin).format()
    }
  }

  setValue = (key, value) => {
    this.setState({ [key]: value })
  }

  Inputs = ({ titulo, cuerpo, categoria, imagen, inicio, fin }) => {
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
        <Label label="Categoría">
          <Select
            placeholder="Selecciona una categoría"
            onChange={categoria => this.setValue('categoria', categoria)}
            defaultValue={categoria}
          >
            {this.state.categorias.map(({ nombre, id }, i) => (
              <Select.Option key={id} value={id}>
                {nombre}
              </Select.Option>
            ))}
          </Select>
        </Label>
        <Label label="Fechas">
          <DatePicker
            defaultValue={moment(this.state.inicio)}
            placeholder="Inicio"
            onChange={inicio => this.setValue('inicio', inicio)}
            onOpenChange={inicio => this.setValue('inicio', inicio)}
          />
          <DatePicker
            defaultValue={moment(this.state.fin)}
            placeholder="Fin"
            onChange={fin => this.setValue('fin', fin)}
            onOpenChange={fin => this.setValue('fin', fin)}
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
        redirect="/eventos"
      />
    )
  }
}

const Columns = (showModal, setDataToState) => {
  return [
    { label: 'Creado', key: 'fecha' },
    {
      label: 'Fecha inicio',
      Render: ({ inicio }) => <span>{moment(inicio).format('lll')}</span>
    },
    {
      label: 'Fecha fin',
      Render: ({ fin }) => <span>{moment(fin).format('lll')}</span>
    },
    { label: 'Título', key: 'titulo' },
    {
      label: 'Acciones',
      key: 'actions',
      Render: selected => (
        <DatatableActions
          model="evento"
          selected={selected}
          // showModal={showModal}
          setDataToState={setDataToState}
          redirect="eventos"
        />
      )
    }
  ]
}
