import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Noticias from '../models/NoticiaModel'
import Eventos from '../models/EventoModel'
import Notificaciones from '../models/NotificacionModel'

export const Router = () => {
  return (
    <Switch>
      <Route path="/evento" component={Eventos} />
      <Route path="/noticia" component={Noticias} />
      <Route path="/notificacion" component={Notificaciones} />
      <Route component={Ekk} />
    </Switch>
  )
}

const Ekk = () => {
  return (
    <div>
      <Link to="/model/testeando">Hola</Link>
      <h5>Error 404 :(</h5>
    </div>
  )
}

const Test = () => {
  return (
    <div>
      <Link to="/modasfdasf">Hola</Link>
      <h1>Esto es una prueba</h1>
    </div>
  )
}
