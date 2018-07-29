import React, { Component } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { getStatus, toggleVotacion } from '../actions/votacion_actions'
import { sendNotification } from '../actions/notification_action'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

class Ajustes extends Component {
  state = { eventos: [], activos: [], votacion: 0 }

  componentDidMount() {
    getStatus(this)
  }

  toggleVotacion = async status => {
    message.info('Las votaciones están siendo activadas')
    const r = toggleVotacion(status)
    message.success('Las votaciones han sido activadas')
    const title =
      status === 1 ? 'Votaciones activadas' : 'Votaciones finalizadas'
    const body =
      status === 1
        ? 'Ahora puedes elegir a tus equipos favoritos'
        : 'Ahora puedes ver los resultados de los ganadores'
    const notificacion = await sendNotification(true)(
      body,
      title,
      'votación',
      moment().format('L')
    )
    this.setState({ votacion: status }, () => message.success(title))
  }

  render() {
    const { votacion } = this.state
    return (
      <div className="row">
        <div className="col-12">
          {votacion === 0 ? (
            <Popconfirm
              title="¿Estás seguro que deseas activar las votaciones?"
              onConfirm={() => this.toggleVotacion(1)}
              okText="Sí"
              cancelText="No"
            >
              <Button type="primary">Activar votaciones</Button>
            </Popconfirm>
          ) : votacion === 1 ? (
            <Button type="primary" onClick={() => this.toggleVotacion(2)}>
              Cerrar votaciones
            </Button>
          ) : (
            <h5>Votación finalizada</h5>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Ajustes)
