import React, { Component } from 'react'
import Datatable from '../components/Table'
import Label from '../components/Label'
import { Card, Select } from 'antd'
import { getResultados } from '../actions/resultado_actions'

export default class Resultados extends Component {
  state = {
    equipos: [],
    color: [],
    sabor: [],
    sazon: [],
    columns: () => [
      { label: 'Equipo', key: 'nombre' },
      { label: 'Sabor', key: 'sabor' },
      { label: 'Sazón', key: 'sazon' },
      { label: 'Color', key: 'color' }
    ]
  }

  componentDidMount() {
    getResultados(this)
  }

  handleFilter = option => {
    let columns = [
      { label: 'Equipo', key: 'nombre' },
      { label: 'Sabor', key: 'sabor' },
      { label: 'Sazón', key: 'sazon' },
      { label: 'Color', key: 'color' }
    ]

    switch (option) {
      case 'sabor':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: 'Sabor', key: 'sabor' }
        ]
        break
      case 'sazon':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: 'Sazón', key: 'sazon' }
        ]
        break
      case 'color':
        columns = [
          { label: 'Equipo', key: 'nombre' },
          { label: 'Color', key: 'color' }
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
    const { color, columns, equipos, sabor, sazon } = this.state
    return (
      <div className="row">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-12 col-md-4 mt-2 mt-md-0">
              <Card title="Sabor">
                {color.length > 0 ? (
                  this.getFirstThree(sabor, 'sabor')
                ) : (
                  <h4>Aún no hay votos</h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-4 mt-2 mt-md-0">
              <Card title="Sazón">
                {color.length > 0 ? (
                  this.getFirstThree(sazon, 'sazon')
                ) : (
                  <h4>Aún no hay votos</h4>
                )}
              </Card>
            </div>
            <div className="col-12 col-md-4 mt-2 mt-md-0">
              <Card title="Color">
                {color.length > 0 ? (
                  this.getFirstThree(color, 'color')
                ) : (
                  <h4>Aún no hay votos</h4>
                )}
              </Card>
            </div>
          </div>
        </div>
        <div className="col-12">
          <Label label="Mostrar solo resultados de:">
            <Select
              defaultValue="todos"
              onChange={option => this.handleFilter(option)}
            >
              <Select.Option value="todos">Todos</Select.Option>
              <Select.Option value="sabor">Sabor</Select.Option>
              <Select.Option value="sazon">Sazón</Select.Option>
              <Select.Option value="color">Color</Select.Option>
            </Select>
          </Label>
          <Datatable
            Columns={columns}
            data={equipos}
            showHideDisabled
            download
          />
        </div>
      </div>
    )
  }
}

const Columns = (showModal, setDataToState) => {
  // return []
}

const data = [
  { equipo: 'Equipo 1', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 2', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 3', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 4', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 5', sabor: 10, sazon: 20, color: 15 }
]
