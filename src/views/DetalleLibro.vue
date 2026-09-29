<template>
  <section>
    <router-link to="/libros">← Volver a la lista</router-link>

    <article v-if="libro" class="detalle">
      <h1>{{ libro.titulo }}</h1>
      <p class="meta">{{ libro.autor }} · {{ libro.categoria }}</p>
      <p>{{ libro.descripcion || 'Este libro no tiene descripción.' }}</p>
      <button type="button" class="boton boton-peligro" @click="eliminar">Eliminar libro</button>
    </article>

    <div v-else class="vacio detalle">
      <p>No encontramos un libro con el id {{ id }}. Puede que ya se haya eliminado.</p>
      <router-link to="/libros">Ver el catálogo</router-link>
    </div>
  </section>
</template>

<script>
import { store } from '../store/libros'

export default {
  name: 'DetalleLibro',
  // Llega desde la ruta dinámica /libros/:id (props en el router)
  props: { id: { type: Number, required: true } },
  computed: {
    libro() { return store.obtener(this.id) }
  },
  methods: {
    eliminar() {
      store.eliminar(this.id)
      this.$router.push({ name: 'lista' })
    }
  }
}
</script>

<style scoped>
.detalle { margin-top: 1rem; padding: 1.5rem; background: var(--superficie); border: 1px solid var(--linea); border-radius: 8px; }
.meta { color: var(--suave); margin-top: 0; }
</style>
