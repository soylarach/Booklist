<template>
  <article class="libro">
    <div class="libro-cuerpo">
      <h3>
        <router-link :to="{ name: 'detalle', params: { id } }">{{ titulo }}</router-link>
      </h3>
      <p class="libro-autor">{{ autor }} · {{ categoria }}</p>
      <p v-show="verDescripcion" class="libro-desc">{{ descripcion || 'Sin descripción.' }}</p>
    </div>
    <div class="libro-acciones">
      <button type="button" class="boton" :aria-expanded="verDescripcion" @click="verDescripcion = !verDescripcion">
        {{ verDescripcion ? 'Ocultar' : 'Descripción' }}
      </button>
      <button type="button" class="boton boton-peligro" :aria-label="`Eliminar ${titulo}`" @click="$emit('eliminar', id)">
        Eliminar
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  id: { type: Number, required: true },
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: { type: String, default: 'Otro' },
  descripcion: { type: String, default: '' }
})

defineEmits(['eliminar'])

const verDescripcion = ref(false)
</script>

<style scoped>
.libro { display: flex; justify-content: space-between; gap: 1rem; padding: 1rem; background: var(--superficie); border: 1px solid var(--linea); border-left: 4px solid var(--acento); border-radius: 6px; }
.libro h3 { margin: 0; font-size: 1.1rem; }
.libro-autor { margin: .15rem 0 0; color: var(--suave); }
.libro-desc { margin: .5rem 0 0; }
.libro-acciones { display: flex; gap: .5rem; align-items: flex-start; flex-wrap: wrap; }
@media (max-width: 560px) { .libro { flex-direction: column; } }
</style>