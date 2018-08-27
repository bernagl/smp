import React, { Component, Fragment } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { getStatus, toggleVotacion } from '../actions/votacion_actions'
import { sendNotification } from '../actions/notification_action'
import { getResultados, setWinners } from '../actions/resultado_actions'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'

class Ajustes extends Component {
  state = {
    eventos: [],
    activos: [],
    votacion: 0,
    choice: [],
    equipos: [],
    eventos: [],
    spirit: [],
    stand: [],
    uniforme: [],
    loading: true
  }

  componentDidMount() {
    getResultados(this)
    getStatus(this)
  }

  toggleVotacion = async status => {
    message.info('Actualizando status de las votaciones')
    const r = toggleVotacion(status)
    // message.success('El status de las votaciones ha sido cambiado')
    const title =
      status === 1
        ? 'Votaciones activadas'
        : status === 2
          ? 'Votaciones finalizadas'
          : 'Resultados publicados'
    const body =
      status === 1
        ? 'Ahora puedes elegir a tus equipos favoritos'
        : status === 2
          ? 'Estamos obteniendo a los ganadores'
          : 'Ahora puedes ver los resultados de los ganadores'
    const notificacion = await sendNotification(true)(
      body,
      title,
      'votación',
      moment().format('L')
    )

    message.success(title)

    status === 2 &&
      this.setState({ votacion: status }, async () => {
        // message.success(title)
        message.info('Estamos obteniendo los ganadores')
        const stand = this.state.stand[0]
        const spirit = this.state.spirit[0]
        const uniforme = this.state.uniforme[0]
        const choice = { ...this.state.choice[0], place: 1 }
        const choice2 = { ...this.state.choice[1], place: 2 }
        const choice3 = { ...this.state.choice[2], place: 3 }

        const response = await setWinners({
          stand,
          spirit,
          uniforme,
          choice: {
            place1: choice,
            place2: choice2,
            place3: choice3
          }
        })

        response === 202
          ? message.success('Los resultados ya están registrados')
          : message.error('Ocurrió un error, vuelve a intentarlo')
      })
  }

  render() {
    const { loading, votacion } = this.state
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
            <Popconfirm
              title="¿Estás seguro que deseas finalizar las votaciones?"
              onConfirm={() => this.toggleVotacion(2)}
              okText="Sí"
              cancelText="No"
            >
              <Button type="primary" disabled={loading}>
                Cerrar votaciones
              </Button>
            </Popconfirm>
          ) : votacion === 2 ? (
            <Fragment>
              <Popconfirm
                title="¿Estás seguro que deseas publicar las votaciones?"
                onConfirm={() => this.toggleVotacion(3)}
                okText="Sí"
                cancelText="No"
              >
                <Button type="primary" disabled={loading}>
                  Publicar resultados
                </Button>
              </Popconfirm>
            </Fragment>
          ) : (
            <Fragment>
              <h4>Los resultados han sido publicados</h4>
              <Link to="/resultado">Ver resultados</Link>
            </Fragment>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Ajustes)
