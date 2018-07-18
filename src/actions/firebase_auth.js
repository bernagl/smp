import { auth, db } from './firebase-config'

export const login = async (correo, contrasena) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(correo, contrasena)
    return 202
  } catch (e) {
    return 404
  }
}

export const register = async (correo, contrasena, nombre) => {
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
    return 500
  }
}

export const authState = async context => {
  auth.onAuthStateChanged(user => {
    if (user) {
      context.setState({
        auth: { correo: user.email, uid: user.uid },
        loading: false
      })
    } else {
      context.setState({ auth: null, loading: false })
    }
  })
}

export const logout = () => {
  auth
    .signOut()
    .then(() => console.log('logout'))
    .catch(e => console.log(e))
}

export const recover = correo => {
  return auth
    .sendPasswordResetEmail(correo)
    .then(r => r)
    .catch(e => e)
}
