import axios from 'axios'

export const sendNotification = (body, title) => {
  console.log(body, title)
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
    .then(r => r)
}
