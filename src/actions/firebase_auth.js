import { auth, db } from './firebase-config'

export const login = async (correo, contrasena) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(correo, contrasena)
    return db
      .ref(`admin/${user.uid}`)
      .once('value')
      .then(result => {
        const usuario = result.val()
        if (usuario) return 202
        else return 404
      })
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
      .ref(`admin/${user.uid}`)
      .set({ correo, nombre, admin: true })
      .then(result => 202)
  } catch ({ code }) {
    // let errorText = ''
    // switch (code) {
    //   case 'auth/invalid-email':
    //     errorText = 'El correo es inválido'
    //     break
    //   case 'auth/weak-password':
    //     errorText = 'La contraseña es muy sencilla, intenta con otra'
    //     break
    //   case 'auth/email-already-in-use':
    //     errorText = 'El correo ya está en uso, prueba con otro'
    //     break
    //   default:
    //     errorText = 'Ocurrió un error, por favor vuelve a intentarlo'
    //     break
    // }
    // return errorText
    return 500
  }
}

export const authState = async context => {
  auth.onAuthStateChanged(user => {
    if (user) {
      return db
        .ref(`admin/${user.uid}`)
        .once('value')
        .then(result => {
          const usuario = result.val()
          if (usuario) {
            context.setState({
              auth: { correo: user.email, uid: user.uid },
              loading: false
            })
          } else {
            logout()
            return 404
          }
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
