import React from 'react'
import Datatable from '../components/Table'
import { Card } from 'antd'

export default () => {
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
        <Datatable Columns={Columns} data={data} showHideDisabled download />
      </div>
    </div>
  )
}

const Columns = (showModal, setDataToState) => {
  return [
    { label: 'Equipo', key: 'equipo' },
    { label: 'Sabor', key: 'sabor' },
    { label: 'Sazón', key: 'sazon' },
    { label: 'Color', key: 'color' }
  ]
}

const data = [
  { equipo: 'Equipo 1', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 2', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 3', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 4', sabor: 10, sazon: 20, color: 15 },
  { equipo: 'Equipo 5', sabor: 10, sazon: 20, color: 15 }
]
