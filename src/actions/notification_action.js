import axios from 'axios'
import { db } from './firebase-config'

export const sendNotification = (body, title, tipo, fecha) => {
  return axios
    .post(
      'https://fcm.googleapis.com/fcm/send',
      {
        to: '/topics/smp',
        data: { body },
        notification: { body, title }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'key=AIzaSyAeWmBGc4eOMUKmrSsQiR73fj4LSmGFOs8'
        }
      }
    )
    .then(r =>
      db
        .ref('notificacion')
        .push({ fecha, status: 1, titulo: body, tipo })
        .then(r => 202)
    )
}
