import React, { Component } from 'react'
import AuthWrapper from '../components/AuthWrapper'
import Input from '../components/Input'
import { recover } from '../actions/firebase_auth'
import { Link } from 'react-router-dom'
import { message } from 'antd'

export default class Registro extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  submit = async ({ correo }) => {
    const r = await recover(correo)
    message.success('Si tu correo se encuentra registrado se te hará llegar un email con indicaciones para reestablecer tu contraseña')
    return r
  }

  Links = () => (
    <React.Fragment>
      <div className="col-12 mt-4">
        <Link to="/login">Login</Link>
      </div>
      {/* <div className="col-12 col-md-8 col-lg-8  mt-4">
        <Link to="/recover">Recuperar contra</Link>
      </div> */}
    </React.Fragment>
  )

  render() {
    return (
      <AuthWrapper submit={this.submit} title="Registro" Links={this.Links}>
        <Input
          name="correo"
          label="Correo"
          validations="isEmail"
          validationError="Ingresa un correo válido"
          required
        />
      </AuthWrapper>
    )
  }
}
