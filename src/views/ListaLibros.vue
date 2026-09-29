<template>
  <section>
    <h1>Libros</h1>

    <FormularioLibro :categorias="categorias" @agregar="agregarLibro" />

    <div class="filtros">
      <div class="campo">
        <label for="f-autor">Filtrar por autor</label>
        <input id="f-autor" v-model="filtroAutor" placeholder="Ej.: Borges" />
      </div>
      <div class="campo">
        <label for="f-cat">Filtrar por categoría</label>
        <select id="f-cat" v-model="filtroCategoria">
          <option value="">Todas</option>
          <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>

    <div v-if="libros.length === 0" class="vacio">
      <p>No hay libros disponibles. Agrega el primero con el formulario.</p>
      <!-- .once: el clic solo se ejecuta una vez por botón -->
      <button type="button" class="boton" @click.once="cargarEjemplos">Cargar libros de ejemplo</button>
    </div>
    <p v-else-if="librosFiltrados.length === 0" class="vacio">Ningún libro coincide con los filtros.</p>
    <div v-else class="lista">
      <Libro
        v-for="libro in librosFiltrados"
        :key="libro.id"
        v-bind="libro"
        @eliminar="eliminarLibro"
      />
    </div>
  </section>
</template>

<script>
import { store } from '../store/libros'
import FormularioLibro from '../components/FormularioLibro.vue'
import Libro from '../components/Libro.vue'

export default {
  name: 'ListaLibros',
  components: { FormularioLibro, Libro },
  data() {
    return { filtroAutor: '', filtroCategoria: '' }
  },
  computed: {
    libros() { return store.libros },
    categorias() { return store.categorias },
    librosFiltrados() {
      const autor = this.filtroAutor.trim().toLowerCase()
      return this.libros.filter(
        (l) =>
          l.autor.toLowerCase().includes(autor) &&
          (!this.filtroCategoria || l.categoria === this.filtroCategoria)
      )
    }
  },
  methods: {
    agregarLibro(libro) { store.agregar(libro) },
    eliminarLibro(id) { store.eliminar(id) },
    cargarEjemplos() { store.cargarEjemplos() }
  }
}
</script>

<style scoped>
.filtros { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0 .5rem; }
.lista { display: grid; gap: .75rem; }
@media (max-width: 560px) { .filtros { grid-template-columns: 1fr; } }
</style>
