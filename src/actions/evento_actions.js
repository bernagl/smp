import { db } from './firebase-config'

export const updateVotacion = (id, status) => {
  return db
    .ref('evento')
    .child(id)
    .update({ votacion: status })
    .then(r => 202)
}
