import React, { Component } from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Label from '../components/Label'
import Uploader from '../components/Uploader'
import moment from 'moment'
import { DatePicker, Select } from 'antd'
import { getDocumentsByModel } from '../actions/firebase_actions'

const { RangePicker } = DatePicker

export default class Evento extends Component {
  state = { categorias: [] }
  async componentDidMount() {
    const categorias = await getDocumentsByModel('categoria')
    this.setState({ categorias })
  }

  submit = model => {
    const { categoria, inicio, fin } = this.state
    // if (!&& !model.inicio && !model.fin) return false
    if (!categoria) return false
    return {
      ...model,
      fecha: model.fecha ? model.fecha : moment().format('L'),
      inicio: moment(inicio).format(),
      categoria,
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
          {/* <RangePicker
            onChange={fechas => this.setValue('fechas', fechas)}
            value={[moment(inicio), moment(fin)]}
            defaultValue={[moment(inicio), moment(fin)]}
            placeholder={['Inicio', 'Fin']}
          /> */}
          <DatePicker
            value={moment(inicio)}
            placeholder="Inicio"
            onChange={inicio => this.setValue('inicio', inicio)}
            onOpenChange={inicio => this.setValue('inicio', inicio)}
          />
          <DatePicker
            value={moment(fin)}
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
