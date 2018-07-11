import React from 'react'
import { Icon } from 'antd'
import Input from './Input'
import { uploadImage } from '../actions/storage_actions'

export default class Uploader extends React.Component {
  state = { name: 'imagen', image: '', url: '', loading: false }

  componentDidMount() {
    this.setState({ url: this.props.url })
  }

  handleImage = async e => {
    const image = e.target.files[0]
    this.setState({ loading: true })
    const response = await uploadImage(this.props.model, image)
    this.setState({ loading: false })
    response && this.setState({ image: image.name, url: response })
  }

  render() {
    const { name, loading, url } = this.state
    const { value = '' } = this.props
    return (
      <div className="uploader col-12 pl-0">
        <input
          placeholder="image"
          type="file"
          name={name}
          accept="image/*"
          id={name}
          onChange={e => this.handleImage(e)}
          style={{ display: 'none' }}
        />
        <label htmlFor={name}>
          {!loading ? (
            url || value ? (
              <div className="img-container">
                <img
                  src={url ? url : value}
                  alt=""
                  style={{ width: '30%', borderRadius: 5 }}
                />
                <span className="ml-2">Cambiar</span>
              </div>
            ) : (
              <span>
                <Icon type="plus-circle" /> Selecciona un archivo
              </span>
            )
          ) : (
            <Icon type="loading" />
          )}
        </label>
        <Input type="hidden" name={name} value={url ? url : value} />
      </div>
    )
  }
}
