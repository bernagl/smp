import { db } from './firebase-config'

export const toggleVotacion = votacion => {
  db.ref('ajustes').update({ votacion })
}

export const getStatus = context => {
  return db.ref('ajustes').on('value', snap => {
    const { votacion } = snap.val()
    if (votacion === 2 || votacion === 3) {
      db.ref('winners')
        .once('value')
        .then(wsnap => {
          const winners = wsnap.val()
          context.setState({ votacion, winners })
        })
    } else {
      context.setState({ votacion })
    }
  })
}
