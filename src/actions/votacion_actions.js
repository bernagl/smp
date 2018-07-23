import { db } from './firebase-config'

export const activarVotacion = () => {
  db.ref('ajustes').update({ votacion: true })
}
