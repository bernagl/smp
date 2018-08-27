import { db } from './firebase-config'

export const getResultados = context => {
  let equipos = []
  db.ref('equipo')
    .orderByChild('status')
    .equalTo(1)
    .once('value', snap => {
      snap.forEach(equipo => {
        equipos.push({
          ...equipo.val(),
          id: equipo.key,
          stand: 0,
          uniforme: 0,
          spirit: 0,
          choice: 0
        })
      })
    })
    .then(() => {
      db.ref('votacion').on('child_added', snapshot => {
        const snap = snapshot.val()
        const equipoVotos = equipos.map(equipo => {
          if (snap['spirit'] === equipo.id)
            return { ...equipo, spirit: equipo.spirit + 1 }
          else if (snap['stand'] === equipo.id)
            return { ...equipo, stand: equipo.stand + 1 }
          else if (snap['uniforme'] === equipo.id)
            return { ...equipo, uniforme: equipo.uniforme + 1 }
          else if (snap['choice'] === equipo.id)
            return { ...equipo, choice: equipo.choice + 1 }
          else return equipo
        })
        equipos = equipoVotos
        const order = orderByKey(equipos)
        const spirit = [...order('spirit')]
        const stand = [...order('stand')]
        const uniforme = [...order('uniforme')]
        const choice = [...order('choice')]
        context.setState({
          equipos,
          spirit,
          stand,
          uniforme,
          choice,
          loading: false
        })
      })
      context.setState({ loading: false })
    })
}

export const setWinners = data => {
  return db
    .ref('winners')
    .update(data)
    .then(r => 202)
    .catch(e => 404)
}

const orderByKey = equipos => key => {
  return equipos.sort(
    (a, b) => (a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0)
  )
}
