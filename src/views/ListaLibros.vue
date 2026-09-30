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

<script setup>
import { ref, computed } from 'vue'
import { store } from '../store/libros'
import FormularioLibro from '../components/FormularioLibro.vue'
import Libro from '../components/Libro.vue'

const filtroAutor = ref('')
const filtroCategoria = ref('')

const libros = computed(() => store.libros)
const categorias = computed(() => store.categorias)

const librosFiltrados = computed(() => {
  const autor = filtroAutor.value.trim().toLowerCase()
  return libros.value.filter(
    (l) =>
      l.autor.toLowerCase().includes(autor) &&
      (!filtroCategoria.value || l.categoria === filtroCategoria.value)
  )
})

function agregarLibro(libro) {
  store.agregar(libro)
}

function eliminarLibro(id) {
  store.eliminar(id)
}

function cargarEjemplos() {
  store.cargarEjemplos()
}
</script>

<style scoped>
.filtros { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin: 1.5rem 0 .5rem; }
.lista { display: grid; gap: .75rem; }
@media (max-width: 560px) { .filtros { grid-template-columns: 1fr; } }
</style>