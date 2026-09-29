import { reactive } from 'vue'

const CLAVE = 'booklist-libros'

const ejemplos = () => [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', categoria: 'Novela', descripcion: 'La saga de los Buendía en el pueblo imaginario de Macondo.' },
  { id: 2, titulo: 'Ficciones', autor: 'Jorge Luis Borges', categoria: 'Cuento', descripcion: 'Relatos sobre laberintos, bibliotecas infinitas y espejos.' },
  { id: 3, titulo: 'Sapiens', autor: 'Yuval Noah Harari', categoria: 'Ensayo', descripcion: 'Un recorrido por la historia de la humanidad.' }
]

function leer() {
  try {
    const guardado = localStorage.getItem(CLAVE)
    return guardado ? JSON.parse(guardado) : null
  } catch {
    return null
  }
}

// Estado compartido y reactivo para toda la SPA
export const store = reactive({
  libros: leer() ?? ejemplos(),
  categorias: ['Novela', 'Cuento', 'Ensayo', 'Poesía', 'Técnico', 'Otro'],

  guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(this.libros)) } catch { /* sin almacenamiento */ }
  },
  agregar(libro) {
    const id = this.libros.reduce((max, l) => Math.max(max, l.id), 0) + 1
    this.libros.push({ id, ...libro })
    this.guardar()
  },
  eliminar(id) {
    this.libros = this.libros.filter((l) => l.id !== id)
    this.guardar()
  },
  obtener(id) {
    return this.libros.find((l) => l.id === id)
  },
  cargarEjemplos() {
    this.libros = ejemplos()
    this.guardar()
  }
})
