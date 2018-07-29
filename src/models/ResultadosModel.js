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
    columns: () => [
      { label: 'Equipo', key: 'nombre' },
      { label: 'Mejor Stand', key: 'stand' },
      { label: 'Mejor Unifome', key: 'uniforme' },
      { label: 'Mejor Team Spirit', key: 'spirit' },
      { label: "People's Choice HEB", key: 'choice' }
    ]
  }

  componentDidMount() {
    getResultados(this)
    getStatus(this)
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
      case 'choide':
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
      stand,
      uniforme,
      votacion
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
      <div className="row">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="Mejor Stand">
                {spirit.length > 0 ? (
                  this.getFirstThree(stand, 'stand')
                ) : (
                  <h4>Aún no hay votos</h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="Mejor Unifome">
                {spirit.length > 0 ? (
                  this.getFirstThree(uniforme, 'uniforme')
                ) : (
                  <h4>Aún no hay votos</h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="Mejor Team Spirit">
                {spirit.length > 0 ? (
                  this.getFirstThree(spirit, 'spirit')
                ) : (
                  <h4>Aún no hay votos</h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-3 mt-2 mt-md-0">
              <Card title="People's Choice HEB">
                {choice.length > 0 ? (
                  this.getFirstThree(choice, 'choice')
                ) : (
                  <h4>Aún no hay votos</h4>
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
