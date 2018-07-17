import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Ajustes from '../models/AjustesModel'
import Categorias from '../models/CategoriaModel'
import Dashboard from '../models/Dashboard'
import Equipos from '../models/EquipoModel'
import EquipoForm from '../models/EquipoForm'
import Eventos from '../models/EventoModel'
import EventoForm from '../models/EventoForm'
import Noticias from '../models/NoticiaModel'
import NoticiasForm from '../models/NoticiaForm'
import Notificaciones from '../models/NotificacionModel'
import Resultados from '../models/ResultadosModel'
import Usuarios from '../models/UsuarioModel'

export const Router = () => {
  return (
    <Switch>
      <Route path="/ajuste" component={Ajustes} />
      <Route path="/categoria" component={Categorias} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/equipo" component={Equipos} />
      <Route path="/equipos/:id?" component={EquipoForm} />
      <Route path="/eventos/:id?" component={EventoForm} />
      <Route path="/evento" component={Eventos} />
      <Route path="/noticia" component={Noticias} />
      <Route path="/noticias/:id?" component={NoticiasForm} />
      <Route path="/notificacion" component={Notificaciones} />
      <Route path="/resultado" component={Resultados} />
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
