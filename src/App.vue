<template>
  <header class="barra">
    <router-link to="/" class="marca">BookList</router-link>
    <nav aria-label="Principal">
      <router-link to="/">Inicio</router-link>
      <router-link to="/libros">Libros</router-link>
    </nav>
    <div class="panel">
      <!-- MVVM: el input (vista) y nombreUsuario (modelo) siempre están sincronizados -->
      <label>
        Hola,
        <input v-model.trim="nombreUsuario" placeholder="lector" aria-label="Tu nombre" />
      </label>
      <span class="contador">
        Lecturas de hoy: <strong>{{ contador }}</strong>
        <button type="button" class="boton" aria-label="Restar una lectura" @click="restar">−</button>
        <button type="button" class="boton" aria-label="Sumar una lectura" @click="sumar">+</button>
      </span>
    </div>
  </header>

  <main class="contenedor">
    <router-view />
  </main>
</template>

<script>
export default {
  name: 'App',
  data() {
    return { nombreUsuario: '', contador: 0 }
  },
  methods: {
    sumar() { this.contador++ },
    restar() { if (this.contador > 0) this.contador-- }
  }
}
</script>

<style>
:root { --tinta:#1B2A41; --fondo:#F4F6F7; --superficie:#fff; --acento:#2E6B5E; --suave:#5D6B78; --linea:#D5DCE1; --peligro:#A63446; }
* { box-sizing: border-box; }
body { margin: 0; background: var(--fondo); color: var(--tinta); font: 16px/1.55 'Public Sans', system-ui, sans-serif; }
h1, h2, h3 { font-family: 'Literata', Georgia, serif; line-height: 1.2; margin: 0 0 .5rem; }
a { color: var(--acento); }
:focus-visible { outline: 3px solid var(--acento); outline-offset: 2px; }
.contenedor { max-width: 960px; margin: 0 auto; padding: 1.5rem 1rem 3rem; }
.boton { font: inherit; padding: .45rem .9rem; border-radius: 6px; border: 1px solid var(--linea); background: var(--superficie); color: var(--tinta); cursor: pointer; }
.boton:hover { border-color: var(--tinta); }
.boton-primario { background: var(--acento); border-color: var(--acento); color: #fff; }
.boton-peligro { color: var(--peligro); }
.campo { display: grid; gap: .25rem; margin-bottom: 1rem; }
.campo input, .campo select, .campo textarea { font: inherit; padding: .5rem .65rem; border: 1px solid var(--linea); border-radius: 6px; background: var(--superficie); color: inherit; }
.vacio { padding: 2rem; border: 1px dashed var(--linea); border-radius: 8px; text-align: center; color: var(--suave); }
.error { color: var(--peligro); margin: 0 0 1rem; }

.barra { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1.5rem; padding: .75rem 1rem; background: var(--tinta); color: #fff; }
.barra a { color: #fff; text-decoration: none; }
.barra .marca { font: 700 1.25rem 'Literata', Georgia, serif; }
.barra nav { display: flex; gap: 1rem; }
.barra nav a { padding-bottom: 2px; border-bottom: 2px solid transparent; }
.barra nav a.router-link-exact-active { border-bottom-color: #fff; }
.barra .panel { margin-left: auto; display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1.25rem; font-size: .9rem; }
.barra input { width: 8rem; padding: .25rem .5rem; border-radius: 4px; border: 1px solid #fff5; background: #fff1; color: #fff; font: inherit; }
.barra .contador .boton { padding: .1rem .5rem; margin-left: .35rem; background: transparent; color: #fff; border-color: #fff5; }
</style>
