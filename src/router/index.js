import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Categorias from '../models/CategoriaModel'
import Dashboard from '../models/Dashboard'
import Equipos from '../models/EquipoModel'
import EquipoForm from '../models/EquipoForm'
import Eventos from '../models/EventoModel'
import Noticias from '../models/NoticiaModel'
import Notificaciones from '../models/NotificacionModel'
import Usuarios from '../models/UsuarioModel'

export const Router = () => {
  return (
    <Switch>
      <Route path="/categoria" component={Categorias} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/equipo" component={Equipos} />
      <Route path="/equipos/:id?" component={EquipoForm} />
      <Route path="/evento" component={Eventos} />
      <Route path="/noticia" component={Noticias} />
      <Route path="/notificacion" component={Notificaciones} />
      <Route path="/usuario" component={Usuarios} />
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
