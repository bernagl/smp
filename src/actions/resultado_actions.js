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
          sazon: 0,
          color: 0,
          sabor: 0
        })
      })
    })
    .then(() => {
      db.ref('votacion').on('child_added', snapshot => {
        const snap = snapshot.val()
        const equipoVotos = equipos.map(equipo => {
          if (snap['sabor'] === equipo.id)
            return { ...equipo, sabor: equipo.sabor + 1 }
          else if (snap['sazon'] === equipo.id)
            return { ...equipo, sazon: equipo.sazon + 1 }
          else if (snap['color'] === equipo.id)
            return { ...equipo, color: equipo.color + 1 }
          else return equipo
        })
        equipos = equipoVotos
        const order = orderByKey(equipos)
        const sabor = [...order('sabor')]
        const sazon = [...order('sazon')]
        const color = [...order('color')]
        context.setState({ equipos, sabor, sazon, color })
      })
    })
}

const orderByKey = equipos => key => {
  return equipos.sort(
    (a, b) => (a[key] > b[key] ? -1 : a[key] < b[key] ? 1 : 0)
  )
}
