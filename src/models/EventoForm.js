import React, { Component } from 'react'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Form from '../components/Form2'
import Label from '../components/Label'
import Uploader from '../components/Uploader'
import moment from 'moment'
import { Button, Checkbox, DatePicker, message, Select } from 'antd'
import {
  addDocument,
  getDocumentsByModel,
  getDocument,
  updateDocument
} from '../actions/firebase_actions'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { sendNotification } from '../actions/notification_action'

export default class Evento extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = {
      evento: {},
      categorias: [],
      cuerpo: '',
      notificacion: false
    }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const categorias = await getDocumentsByModel('categoria')
    // const categorias = c.filter(categoria => categoria.status === 1)
    const evento = id ? await getDocument('evento')(id) : {}
    this.setState({ ...evento, categorias })
  }

  submit = async model => {
    const {
      cuerpo,
      categoria,
      categorias,
      inicio,
      fin,
      notificacion
    } = this.state
    const { id } = this.props.match.params
    if (!categoria) return false
    const catnombre = categorias.find(cat => cat.id === categoria)
    const r = {
      ...model,
      fecha: model.fecha ? model.fecha : moment().format('L'),
      inicio: moment(inicio).format(),
      categoria,
      catnombre: catnombre.nombre,
      cuerpo,
      fin: moment(fin).format()
    }

    const notResponse =
      notificacion &&
      (await sendNotification(true)(
        model.titulo,
        'Evento',
        'evento',
        moment().format('L')
      ))
    notResponse === 202 && message.success('Se ha enviado la notificación')

    return id ? { ...r, id } : r
  }

  setValue = (key, value) => {
    this.setState({ [key]: value })
  }

  handleNotificacion = e => {
    const notificacion = e.target.checked
    this.setState({ notificacion })
  }

  render() {
    const {
      inicio,
      fin,
      titulo,
      categoria,
      notificacion,
      categorias,
      imagen
    } = this.state
    const { id } = this.props.match.params
    const action = id ? updateDocument('evento') : addDocument('evento')
    const f = fin ? moment(fin) : moment()
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
              {categorias.map(({ nombre, id, status }, i) => (
                <Select.Option
                  key={id}
                  value={id}
                  disabled={status === 1 ? false : true}
                >
                  {nombre}
                </Select.Option>
              ))}
            </Select>
          )}
        </Label>
        <Label label="Fechas">
          <DatePicker
            value={inicio ? moment(inicio) : moment()}
            defaltValue={moment()}
            placeholder="Inicio"
            onChange={inicio => this.setValue('inicio', inicio)}
            showTime
            // onOpenChange={inicio => this.setValue('inicio', inicio)}
          />
          <DatePicker
            value={fin ? moment(fin) : moment()}
            defaltValue={moment()}
            placeholder="Fin"
            onChange={fin => this.setValue('fin', fin)}
            showTime
            // onOpenChange={fin => this.setValue('fin', fin)}
          />
        </Label>
        <Label label="Imagen">
          <Uploader model="evento" url={imagen} />
        </Label>
        <ReactQuill
          value={this.state.cuerpo}
          onChange={cuerpo => this.setValue('cuerpo', cuerpo)}
        />
        <Checkbox onChange={this.handleNotificacion} value={notificacion}>
          Enviar notificación
        </Checkbox>
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
