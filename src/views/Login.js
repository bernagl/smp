import React, { Component } from 'react'
import AnimationWrapper from '../components/AnimationWrapper'
import Input from '../components/Input'
import Form from '../components/Form2'
import { Button } from 'antd'
import '../assets/login.css'
import Logo from '../assets/smp.png'
import { login } from '../actions/firebase_auth'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.formRef = React.createRef()
  }

  submit = ({ correo, contrasena }) => {
    login(correo, contrasena)
  }

  render() {
    return (
      <AnimationWrapper>
        <div className="container">
          <div
            id="login"
            className="row justify-content-center align-items-center center-text"
          >
            <div className="login-box col-12 col-md-6 col-lg-4 p-4">
              <div className="logo-container my-3">
                <img src={Logo} alt="" />
              </div>
              <h3>Iniciar sesión</h3>
              <Form ref={this.formRef} submit={this.submit} action={login}>
                <Input
                  name="correo"
                  label="Correo"
                  validations="isEmail"
                  validationError="Ingresa un correo válido"
                  required
                />
                <Input
                  name="contrasena"
                  label="Contraseña"
                  validations="minLength:6"
                  validationError="Ingresa una contraseña válida"
                  required
                />
                <Button
                  onClick={() => this.formRef.current.submit()}
                  type="primary"
                  className="fw"
                >
                  Iniciar sesión
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </AnimationWrapper>
    )
  }
}
