import React, { Component } from 'react'
import Datatable from '../components/Datatable'
import DatatableActions from '../components/DatatableActions'
import Input from '../components/Input'
import Label from '../components/Label'
import { Button, Select } from 'antd'
// import { getDocument, getDocumentsByModel } from '../actions/firebase_actions'
import { addDocument, updateDocument } from '../actions/firebase_actions'
import { getUsuariosByEquipo } from '../actions/equipo_actions'
import Form from '../components/Form2'

export default class Equipo extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
    this.state = { usuarios: [], dataSource: [], usuariosEquipo: [] }
  }

  async componentDidMount() {
    const { id } = this.props.match.params
    const { equipo, usuarios } = id
      ? await getUsuariosByEquipo(id)
      : { equipo: null, usuarios: null }
    this.setState({ usuarios, equipo })
  }

  submit = model => {
    const { usuarios: u, equipo } = this.state
    let usuarios = {}
    u.map(usuario => (usuarios = { ...usuarios, [usuario]: true }))
    return { ...model, usuarios, id: equipo.id }
  }

  handleUsuarios = usuarios => {
    this.setState({ usuarios })
  }

  render() {
    const { data, equipo, usuarios } = this.state
    const action = equipo ? updateDocument('equipo') : addDocument('equipo')
    return (
      <div className="row">
        <div className="col-6">
          {this.props.match.params.id ? (
            equipo && (
              <Form ref={this.formRef} submit={this.submit} action={action}>
                <Input
                  name="nombre"
                  label="Nombre"
                  value={equipo ? equipo.nombre : ''}
                  validations="minLength:3"
                  validationError="Ingresa un nombre válido"
                  required
                />
                <Input
                  name="descripcion"
                  label="Descripción"
                  value={equipo ? equipo.descripcion : ''}
                  validations="minLength:1"
                  validationError=""
                  required
                />
                <Label label="Miembros del equipo">
                  <Select
                    mode="tags"
                    value={usuarios}
                    defaultValue={usuarios}
                    onChange={this.handleUsuarios}
                    tokenSeparators={[',']}
                  >
                    {/* {usuarios.map(usuario => (
                    <Select.Option key={usuario.id}>{usuario.correo}</Select.Option>
                  ))} */}
                  </Select>
                </Label>
                <Button
                  type="primary"
                  onClick={() => this.formRef.current.submit()}
                >
                  Guardar equipo
                </Button>
              </Form>
            )
          ) : (
            <Form ref={this.formRef} submit={this.submit} action={action}>
              <Input
                name="nombre"
                label="Nombre"
                value={equipo ? equipo.nombre : ''}
                validations="minLength:3"
                validationError="Ingresa un nombre válido"
                required
              />
              <Input
                name="descripcion"
                label="Descripción"
                value={equipo ? equipo.descripcion : ''}
                validations="minLength:1"
                validationError=""
                required
              />
              <Label>
                <Select
                  mode="tags"
                  value={usuarios}
                  defaultValue={usuarios}
                  onChange={this.handleUsuarios}
                  tokenSeparators={[',']}
                >
                  {/* {usuarios.map(usuario => (
              <Select.Option key={usuario.id}>{usuario.correo}</Select.Option>
            ))} */}
                </Select>
              </Label>
              <Button
                type="primary"
                onClick={() => this.formRef.current.submit()}
              >
                Guardar equipo
              </Button>
            </Form>
          )}
        </div>
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
          model="equipo"
          selected={selected}
          showModal={showModal}
        />
      )
    }
  ]
}
