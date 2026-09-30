<template>
  <section class="formulario">
    <h2>Agregar libro</h2>
    <form @submit.prevent>
      <div class="campo">
        <label for="titulo">Título</label>
        <input id="titulo" v-model="nuevo.titulo" @keyup.enter="agregar" />
      </div>
      <div class="campo">
        <label for="autor">Autor</label>
        <input id="autor" v-model="nuevo.autor" @keyup.enter="agregar" />
      </div>
      <div class="campo">
        <label for="categoria">Categoría</label>
        <select id="categoria" v-model="nuevo.categoria">
          <option disabled value="">Elige una categoría</option>
          <option v-for="c in categorias" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div class="campo">
        <label for="descripcion">Descripción (opcional)</label>
        <textarea id="descripcion" v-model="nuevo.descripcion" rows="3"></textarea>
      </div>

      <p v-if="error" class="error" role="alert">{{ error }}</p>
      <button type="button" class="boton boton-primario" @click="agregar">Agregar libro</button>
    </form>

    <aside class="vista-previa" aria-live="polite">
      <h3>Vista previa</h3>
      <p v-if="!hayDatos" class="suave">Empieza a escribir para ver el libro aquí.</p>
      <dl v-else>
        <dt>Título</dt><dd>{{ nuevo.titulo || '—' }}</dd>
        <dt>Autor</dt><dd>{{ nuevo.autor || '—' }}</dd>
        <dt>Categoría</dt><dd>{{ nuevo.categoria || '—' }}</dd>
        <dt>Descripción</dt><dd>{{ nuevo.descripcion || '—' }}</dd>
      </dl>
    </aside>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  categorias: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['agregar'])

const vacio = () => ({ titulo: '', autor: '', categoria: '', descripcion: '' })
const nuevo = ref(vacio())
const error = ref('')

const hayDatos = computed(() => {
  return Object.values(nuevo.value).some((v) => v.trim() !== '')
})

function agregar() {
  const { titulo, autor, categoria, descripcion } = nuevo.value
  if (!titulo.trim() || !autor.trim() || !categoria) {
    error.value = 'Completa el título, el autor y la categoría para agregar el libro.'
    return
  }
  emit('agregar', {
    titulo: titulo.trim(),
    autor: autor.trim(),
    categoria,
    descripcion: descripcion.trim()
  })
  nuevo.value = vacio()
  error.value = ''
}
</script>

<style scoped>
.formulario { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; padding: 1.25rem; background: var(--superficie); border: 1px solid var(--linea); border-radius: 8px; }
.formulario h2 { grid-column: 1 / -1; margin: 0; }
.vista-previa { padding: 1rem; background: var(--fondo); border-radius: 6px; align-self: start; }
.vista-previa h3 { font-size: 1rem; }
.vista-previa dt { font-weight: 600; font-size: .85rem; color: var(--suave); }
.vista-previa dd { margin: 0 0 .5rem; overflow-wrap: anywhere; }
.suave { color: var(--suave); margin: 0; }
@media (max-width: 700px) { .formulario { grid-template-columns: 1fr; } }
</style>