import React, { Component } from 'react'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Uploader from '../components/Uploader'
import { Button } from 'antd'
import {
  addDocument,
  getDocument,
  updateDocument
} from '../actions/firebase_actions'
import Form from '../components/Form2'
import ReactQuill from 'react-quill'
import moment from 'moment'
import 'react-quill/dist/quill.snow.css'

export default class Equipo extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      noticia: null,
      cuerpo: ''
    }
  }

  handleChange(cuerpo) {
    this.setState({ cuerpo })
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const noticia = id
      ? await getDocument('noticia')(id)
      : { titulo: '', cuerpo: '', fecha: '', imagen: '' }
    this.setState({ noticia, cuerpo: noticia.cuerpo })
  }

  submit = model => {
    const { cuerpo, noticia } = this.state
    const { id } = this.props.match.params
    const fecha = noticia.fecha ? noticia.fecha : moment().format('L')
    return id ? { ...model, cuerpo, id, fecha } : { ...model, cuerpo, fecha }
  }

  render() {
    const { noticia } = this.state
    const { id } = this.props.match.params
    const action = id ? updateDocument('noticia') : addDocument('noticia')
    return (
      <div>
        {this.props.match.params.id
          ? noticia && (
              <Form ref={this.formRef} submit={this.submit} action={action}>
                <Input
                  name="titulo"
                  label="Título"
                  value={noticia.titulo}
                  validations="minLength:3"
                  validationError="Ingresa un título válido"
                  required
                />
                <Uploader model="noticia" url={noticia.imagen} />
                <ReactQuill
                  value={this.state.cuerpo}
                  onChange={this.handleChange}
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
          : noticia && (
              <Form ref={this.formRef} submit={this.submit} action={action}>
                <Input
                  name="titulo"
                  label="Título"
                  value={noticia.titulo}
                  validations="minLength:3"
                  validationError="Ingresa un título válido"
                  required
                />
                <Uploader model="noticia" url={noticia.imagen} />
                <ReactQuill
                  value={this.state.cuerpo}
                  onChange={this.handleChange}
                />
                <Button
                  type="primary"
                  onClick={() => this.formRef.current.submit()}
                  className="mt-2"
                >
                  Guardar noticia
                </Button>
              </Form>
            )}
      </div>
    )
  }
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
        <DatatableActions
          model="noticia"
          selected={selected}
          showModal={showModal}
        />
      )
    }
  ]
}
