import { db } from './firebase-config'

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
