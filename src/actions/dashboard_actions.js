import { db } from './firebase-config'

export const getVotaciones = (collection, context) => {
  return db.ref(collection).on('value', snapshot => {
    const total = snapshot.numChildren()
    context.setState({ [collection]: total })
  })
}

export const votar = () => {
  db.ref('votacion').push({ equipo: 1, usuario: 'kscnksn' })
}
