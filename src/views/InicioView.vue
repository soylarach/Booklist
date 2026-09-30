<template>
  <section>
    <h1>Catálogo de Editorial Nova</h1>
    <p>
      Registra libros, filtra por autor o categoría y consulta el detalle de cada uno.
      Ahora mismo el catálogo tiene {{ total }} {{ total === 1 ? 'libro' : 'libros' }}.
    </p>
    <router-link to="/libros" class="boton boton-primario enlace-boton">Ver todos los libros</router-link>

    <h2 class="subtitulo">Agregados recientemente</h2>
    <p v-if="recientes.length === 0" class="vacio">Aún no hay libros en el catálogo.</p>
    <ul v-else class="recientes">
      <li v-for="libro in recientes" :key="libro.id">
        <router-link :to="{ name: 'detalle', params: { id: libro.id } }">{{ libro.titulo }}</router-link>
        <span> — {{ libro.autor }}</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { store } from '../store/libros'

const total = computed(() => store.libros.length)
const recientes = computed(() => [...store.libros].slice(-3).reverse())
</script>

<style scoped>
.enlace-boton { display: inline-block; text-decoration: none; }
.subtitulo { margin-top: 2rem; }
.recientes { padding-left: 1.2rem; }
.recientes span { color: var(--suave); }
</style>