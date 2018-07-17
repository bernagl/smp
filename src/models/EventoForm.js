import React, { Component } from 'react'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Form from '../components/Form2'
import Label from '../components/Label'
import Uploader from '../components/Uploader'
import moment from 'moment'
import { Button, DatePicker, Select } from 'antd'
import {
  addDocument,
  getDocumentsByModel,
  getDocument,
  updateDocument
} from '../actions/firebase_actions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default class Evento extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      evento: {},
      categorias: [],
      cuerpo: ''
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const categorias = await getDocumentsByModel('categoria')
    const evento = id ? await getDocument('evento')(id) : {}
    this.setState({ ...evento, categorias })
  }

  submit = model => {
    const { cuerpo, categoria, inicio, fin } = this.state
    const { id } = this.props.match.params
    if (!categoria) return false
    const r = {
      ...model,
      fecha: model.fecha ? model.fecha : moment().format('L'),
      inicio: moment(inicio).format(),
      categoria,
      cuerpo,
      fin: moment(fin).format()
    }

    return id ? { ...r, id } : r
  }

  setValue = (key, value) => {
    this.setState({ [key]: value })
  }

  //   Inputs = ({ titulo, cuerpo, categoria, imagen }) => {
  //     return (

  //     )
  //   }
  render() {
    const { titulo, cuerpo, categoria, categorias, imagen } = this.state
    const { id } = this.props.match.params
    const action = id ? updateDocument('evento') : addDocument('evento')
    console.log(categoria)
    return (
      <Form ref={this.formRef} submit={this.submit} action={action}>
        <Input
          name="titulo"
          label="Título"
          value={titulo}
          validations="minLength:3"
          validationError="Ingresa un título válido"
          required
        />
        <Label label="Categoría">
          {categorias.length > 0 && (
            <Select
              placeholder="Selecciona una categoría"
              onChange={categoria => this.setValue('categoria', categoria)}
              defaultValue={categoria}
            >
              {categorias.map(({ nombre, id }, i) => (
                <Select.Option key={id} value={id}>
                  {nombre}
                </Select.Option>
              ))}
            </Select>
          )}
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
        <ReactQuill
          value={this.state.cuerpo}
          onChange={cuerpo => this.setValue('cuerpo', cuerpo)}
        />
        <Button
          type="primary"
          onClick={() => this.formRef.current.submit()}
          className="mt-2"
        >
          Guardar noticia
        </Button>
      </Form>
    )
  }
}

const Columns = (showModal, setDataToState) => {
  return [
    { label: 'Fecha', key: 'fecha' },
    { label: 'Título', key: 'titulo' },
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