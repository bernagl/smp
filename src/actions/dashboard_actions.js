import { db } from './firebase-config'

export const getVotaciones = (collection, context) => {
  return db.ref(collection).on('value', snapshot => {
    const total = snapshot.numChildren()
    context.setState({ [collection]: total })
  })
}

export const votar = () => {
  db.ref('votacion').push({
    sazon: '-LHAG3UqdIzpJ3YUWBCD',
    color: '-LH_WuXzgDfeijCZr4Dy',
    sabor: '-LHeT1n005l2O0SCTMYQ',
    usuario: 'kscnksn'
  })
}
