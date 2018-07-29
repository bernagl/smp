import { db } from './firebase-config'

export const toggleVotacion = votacion => {
  db.ref('ajustes').update({ votacion })
}

export const getStatus = context => {
  return db.ref('ajustes').on('value', snap => {
    const { votacion } = snap.val()
    context.setState({ votacion })
  })
}
