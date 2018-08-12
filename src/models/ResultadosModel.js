import React, { Component } from 'react'
import Datatable from '../components/Table'
import Label from '../components/Label'
import { Badge, Card, Select } from 'antd'
import { getResultados } from '../actions/resultado_actions'
import { getStatus } from '../actions/votacion_actions'

export default class Resultados extends Component {
  state = {
    equipos: [],
    spirit: [],
    stand: [],
    choice: [],
    uniforme: [],
    votacion: 0,
    loading: true,
    columns: () => [
      { label: 'Equipo', key: 'nombre' },
      { label: 'Mejor Stand', key: 'stand' },
      { label: 'Mejor Unifome', key: 'uniforme' },
      { label: 'Mejor Team Spirit', key: 'spirit' },
      { label: "People's Choice HEB", key: 'choice' }
    ],
    winners: null
  }

  componentDidMount() {
    getStatus(this)
    getResultados(this)
  }

  handleFilter = option => {
    let columns = [
      { label: 'Equipo', key: 'nombre' },
      { label: 'Mejor Stand', key: 'stand' },
      { label: 'Mejor Unifome', key: 'uniforme' },
      { label: 'Mejor Team Spirit', key: 'spirit' },
      { label: "People's Choice HEB", key: 'choice' }
    ]

    switch (option) {
      case 'stand':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: 'Mejor Stand', key: 'stand' }
        ]
        break
      case 'uniforme':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: 'Mejor Unifome', key: 'uniforme' }
        ]
        break
      case 'spirit':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: 'Mejor Team Spirit', key: 'spirit' }
        ]
        break
      case 'choice':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: "People's Choice HEB", key: 'choice' }
        ]
        break
    }

    this.setState({ option, columns: () => columns })
  }

  getFirstThree = (data, key) =>
    Array(3)
      .fill()
      .map((e, i) => (
        <h4 key={i}>
          {data[i].nombre} - {data[i][key]}
        </h4>
      ))

  render() {
    const {
      spirit,
      choice,
      columns,
      equipos,
      loading,
      stand,
      uniforme,
      votacion,
      winners
    } = this.state
    const status =
      votacion === 0 ? 'default' : votacion === 1 ? 'processing' : 'success'
    const statusText =
      votacion === 0
        ? 'La votación aún no comienza'
        : votacion === 1
          ? 'La votación está iniciada'
          : 'La votación ya finalizó'
    return (
      <div className={`row ${loading && 'loading'}`}>
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="Mejor Stand">
                {!winners ? (
                  stand.length > 0 ? (
                    this.getFirstThree(stand, 'stand')
                  ) : (
                    <h4>Aún no hay votos</h4>
                  )
                ) : (
                  <h4>
                    {winners.stand.nombre} - {winners.stand.stand}
                  </h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="Mejor Unifome">
                {!winners ? (
                  uniforme.length > 0 ? (
                    this.getFirstThree(uniforme, 'uniforme')
                  ) : (
                    <h4>Aún no hay votos</h4>
                  )
                ) : (
                  <h4>
                    {winners.uniforme.nombre} - {winners.uniforme.uniforme}
                  </h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="Mejor Team Spirit">
                {!winners ? (
                  spirit.length > 0 ? (
                    this.getFirstThree(spirit, 'spirit')
                  ) : (
                    <h4>Aún no hay votos</h4>
                  )
                ) : (
                  <h4>
                    {winners.spirit.nombre} - {winners.spirit.spirit}
                  </h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="People's Choice HEB">
                {!winners ? (
                  choice.length > 0 ? (
                    this.getFirstThree(choice, 'choice')
                  ) : (
                    <h4>Aún no hay votos</h4>
                  )
                ) : (
                  <React.Fragment>
                    <h4>
                      {winners.choice.place1.nombre} - {winners.choice.place1.choice}
                    </h4>
                    <h4>
                      {winners.choice.place2.nombre} - {winners.choice.place2.choice}
                    </h4>
                    <h4>
                      {winners.choice.place2.nombre} - {winners.choice.place2.choice}
                    </h4>
                  </React.Fragment>
                )}
              </Card>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="row">
            <div className="col-4">
              <Label label="Mostrar solo resultados de:">
                <Select
                  defaultValue="todos"
                  onChange={option => this.handleFilter(option)}
                  className="fw"
                >
                  <Select.Option value="todos">Todos</Select.Option>
                  <Select.Option value="stand">Mejor Stand</Select.Option>
                  <Select.Option value="uniforme">Mejor Uniforme</Select.Option>
                  <Select.Option value="spirit">
                    Mejor Team Spirit
                  </Select.Option>
                  <Select.Option value="choice">
                    People's Choice HEB
                  </Select.Option>
                </Select>
              </Label>
            </div>
            <div className="col-8">
              <Badge status={status} text={statusText} />
            </div>
            <div className="col-12">
              <Datatable
                Columns={columns}
                data={equipos}
                showHideDisabled
                download
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Columns = (showModal, setDataToState) => {
  // return []
}

const data = [
  { equipo: 'Equipo 1', stand: 10, uniforme: 20, spirit: 15 },
  { equipo: 'Equipo 2', stand: 10, uniforme: 20, spirit: 15 },
  { equipo: 'Equipo 3', stand: 10, uniforme: 20, spirit: 15 },
  { equipo: 'Equipo 4', stand: 10, uniforme: 20, spirit: 15 },
  { equipo: 'Equipo 5', stand: 10, uniforme: 20, spirit: 15 }
]
