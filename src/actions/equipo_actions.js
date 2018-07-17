import { db } from './firebase-config'
import Equipo from '../models/NoticiaForm'

export const getUsuariosByEquipo = id => {
  return db
    .ref('equipo')
    .child(id)
    .once('value')
    .then(snap => {
      const equipo = { ...snap.val(), id: snap.key }
      const { usuarios: u } = equipo
      const usuariosEntries = u ? Object.entries(u) : []
      const usuarios = usuariosEntries.map(usuario => usuario[0])
      return { equipo, usuarios }
    })
}

export const checkIfExists = node => (equipo, id) => {
  return db
    .ref('equipo')
    .orderByChild(node)
    .equalTo(equipo)
    .once('value')
    .then(r => {
      let status = false
      r.forEach(element => {
        if (element.key !== id) status = true
      })
      return status
    })
    .catch(e => false)
}
