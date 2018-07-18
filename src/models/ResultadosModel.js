import React, { Component } from 'react'
import Datatable from '../components/Table'
import Label from '../components/Label'
import { Card, Select } from 'antd'

export default class Resultados extends Component {
  state = {
    columns: () => [
      { label: 'Equipo', key: 'equipo' },
      { label: 'Sabor', key: 'sabor' },
      { label: 'Sazón', key: 'sazon' },
      { label: 'Color', key: 'color' }
    ]
  }

  handleFilter = option => {
    let columns = [
      { label: 'Equipo', key: 'equipo' },
      { label: 'Sabor', key: 'sabor' },
      { label: 'Sazón', key: 'sazon' },
      { label: 'Color', key: 'color' }
    ]

    switch (option) {
      case 'sabor':
        columns = [
          { label: 'Equipo', key: 'equipo' },
          { label: 'Sabor', key: 'sabor' }
        ]
        break
      case 'sazon':
        columns = [
          { label: 'Equipo', key: 'equipo' },
          { label: 'Sazón', key: 'sazon' }
        ]
        break
      case 'color':
        columns = [
          { label: 'Equipo', key: 'equipo' },
          { label: 'Color', key: 'color' }
        ]
        break
    }

    this.setState({ option, columns: () => columns })
  }

  render() {
    const { columns } = this.state
    return (
      <div className="row">
        <div className="col-12 mb-3">
          <div className="row">
            <div className="col-4">
              <Card title="Sabor">
                <p>Equipo 1</p>
              </Card>
            </div>
            <div className="col-4">
              <Card title="Sazón">
                <p>Equipo 2</p>
              </Card>
            </div>
            <div className="col-4">
              <Card title="Color">
                <p>Equipo 3</p>
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
          <Datatable Columns={columns} data={data} showHideDisabled download />
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
