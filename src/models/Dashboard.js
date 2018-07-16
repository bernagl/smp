import React, { Component } from 'react'
import { Card } from 'antd'
import { getDocumentsByModel } from '../actions/firebase_actions'
import { updateVotacion } from '../actions/evento_actions'
import moment from 'moment'

export default class Dashboard extends Component {
  state = { eventos: [], activos: [] }

  componentDidMount() {
    this.setDataToState()
  }

  setDataToState = async () => {
    const eventos = await getDocumentsByModel('evento')
    const activos = eventos.filter(
      ({ inicio, fin }) =>
        moment(inicio).format('L') <= moment().format('L') &&
        moment(fin).format('L') > moment().format('L')
    )
    this.setState({ eventos, activos })
  }

  updateVotacion = async (id, status) => {
    const votacion = status === 1 ? 2 : status === 0 ? 1 : 0
    if (votacion === 0) return
    const response = await updateVotacion(id, votacion)
    this.setDataToState()
  }

  render() {
    const { activos, eventos } = this.state
    console.log(this.state)
    return (
      <div className="row">
        <div className="col-12 mb-5">
          <div className="row">
            <div className="col-4">
              <Card title="Votaciones">
                <p>8753 votaciones</p>
              </Card>
            </div>
            <div className="col-4">
              <Card title="Usuarios">
                <p>Total: 10540</p>
                <p>Activos: 150</p>
              </Card>
            </div>
            <div className="col-4">
              <Card title="Equipos">
                <p>Total: 100</p>
              </Card>
            </div>
          </div>
        </div>
        <div className="col-12">
          <h2>Eventos activos: </h2>
          <div className="row">
            {activos.length > 0 ? (
              activos.map(({ id, titulo, votacion }) => (
                <div className="col-12" key={id}>
                  <h3>{titulo}</h3>
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
          </div>
        </div>
      </div>
    )
  }
}
