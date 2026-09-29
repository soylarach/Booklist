import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'

const routes = [
  { path: '/', name: 'inicio', component: InicioView },
  { path: '/libros', name: 'lista', component: ListaLibros },
  {
    // Ruta dinámica: el :id llega al componente como prop
    path: '/libros/:id',
    name: 'detalle',
    component: DetalleLibro,
    props: (route) => ({ id: Number(route.params.id) })
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
