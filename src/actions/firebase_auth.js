import { auth, db } from './firebase-config'

export const login = async (correo, contrasena) => {
  console.log(correo, contrasena)
  try {
    const { user } = await auth.signInWithEmailAndPassword(correo, contrasena)
    console.log(user)
  } catch (e) {
    console.error(e)
    return false
  }
}

export const register = ({ correo, contrasena, nombre }) => async dispatch => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(
      correo,
      contrasena
    )
    return db
      .ref(`usuario/${user.uid}`)
      .set({ correo, nombre, admin: true })
      .then(result => 202)
  } catch (e) {
    return false
  }
}
