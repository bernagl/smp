import React, { Component } from 'react'
import { Button, message, Popconfirm } from 'antd'
import { activarVotacion } from '../actions/votacion_actions'
import { sendNotification } from '../actions/notification_action'
import moment from 'moment'
import { withRouter } from 'react-router-dom'

class Ajustes extends Component {
  state = { eventos: [], activos: [], status: 0 }

  // componentDidMount() {

  // }

  //   setDataToState = async () => {
  //     const eventos = await getDocumentsByModel('evento')
  //     const activos = eventos.filter(
  //       ({ inicio, fin }) =>
  //         moment(inicio).format('L') <= moment().format('L') &&
  //         moment(fin).format('L') < moment().format('L')
  //     )
  //     this.setState({ eventos, activos })
  //   }

  //   updateVotacion = async (id, status) => {
  //     const votacion = status === 1 ? 2 : status === 0 ? 1 : 0
  //     if (votacion === 0) return
  //     const response = await updateVotacion(id, votacion)
  //     this.setDataToState()
  //   }

  activarVotacion = async () => {
    message.info('Las votaciones están siendo activadas')
    const r = activarVotacion()
    message.info('Las votaciones han sido activadas')
    const notificacion = sendNotification(
      'Ahora puedes elegir a tus equipos favoritos',
      'Las votaciones han sido activadas'
    )
    this.setState({ status: 1 })
    message.success('Las votaciones han sido activadas')
  }

  render() {
    const { status } = this.state
    return (
      <div className="row">
        <div className="col-12">
          {status === 0 ? (
            <Popconfirm
              title="¿Estás seguro que deseas activar las votaciones?"
              onConfirm={this.activarVotacion}
              // onCancel={cancel}
              okText="Sí"
              cancelText="No"
            >
              <Button
                type="primary"
                // onClick={() => this.setState({ status: 1 })}
              >
                Activar votaciones
              </Button>
            </Popconfirm>
          ) : status === 1 ? (
            <Button
              type="primary"
              onClick={() =>
                this.setState({ status: 2 }, () => {
                  message.success('Las votaciones se han cerrado')
                  this.props.history.push('/resultado')
                })
              }
            >
              Cerrar votaciones
            </Button>
          ) : (
            <h5>Votación finalizada</h5>
          )}
          {/* <div className="row">
            {activos.length > 0 ? (
              activos.map(({ id, titulo, votacion }) => (
                <div className="col-12" key={id}>
                  <h5>{titulo}</h5>
                  <a onClick={() => this.updateVotacion(id, votacion)}>
                    {votacion === 0
                      ? 'Activar votación'
                      : votacion === 1
                        ? 'Finalizar votación'
                        : 'Votación terminada'}
                  </a>
                </div>
              ))
            ) : (
              <p>No hay ningún evento activo</p>
            )}
          </div> */}
        </div>
      </div>
    )
  }
}

export default withRouter(Ajustes)
