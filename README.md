# Informe de Proyecto: BookList SPA — Editorial Nova

## ¿De qué trata el proyecto?

**BookList SPA** es una aplicación web interactiva desarrollada para **Editorial Nova**, diseñada para explorar, organizar y administrar un catálogo digital de libros de forma ágil y visual.

Al funcionar como una **Single Page Application (SPA)**, permite al usuario navegar entre la bienvenida, el listado general y la ficha en detalle de cada obra sin parpadeos ni recargas de pantalla, ofreciendo una experiencia fluida e instantánea.

---

## Funcionalidades y Experiencia de Uso

* **Navegación fluida por vistas:** Gracias a la integración de rutas, el usuario puede saltar entre el panel de inicio, la biblioteca general y la vista de detalle de cada título manteniendo activo el historial del navegador.
* **Gestión dinámica del catálogo:** Permite dar de alta nuevos ejemplares completando título, autor y datos clave mediante un formulario interactivo con vista previa en tiempo real y confirmación con tecla Enter.
* **Exploración y filtrado:** La biblioteca organiza los libros en pantalla, permitiendo filtrarlos por categorías/estado o eliminarlos con un solo clic.
* **Fichas de detalle individuales:** Cada libro cuenta con su propio enlace directo (ruta dinámica por identificador) donde se despliega su información completa o un aviso claro si la obra no existe en el catálogo.
* **Persistencia en el navegador:** Las modificaciones se guardan localmente para que la colección no se pierda al refrescar o cerrar la pestaña.

---

## Estructura y Decisiones de Desarrollo

El proyecto fue estructurado en componentes modulares siguiendo el estándar de **Vue 3**:

* **Paradigma Options API:** Toda la lógica de componentes se organiza con la estructura tradicional (`data`, `methods`, `computed`), facilitando la lectura clara de estados, eventos y valores calculados.
* **Componentes desacoplados:**
* `Libro.vue`: Componente visual que únicamente recibe datos y notifica al usuario cuando se solicita borrar un ítem.
* `FormularioLibro.vue`: Encapsula la entrada de datos, la validación y los atajos de teclado sin alterar la lista global directamente.
* Vistas (`views/`): Coordinan la interacción entre los componentes y la pantalla.


* **Estado global liviano (`store/libros.js`):** Se implementó un almacén reactivo centralizado que comparte la colección de libros entre vistas y sincroniza con el almacenamiento local, evitando complejidad innecesaria.
* **Navegación con Vue Router:** Configurado con rutas dinámicas que inyectan los identificadores directamente como propiedades (`props: true`) hacia las vistas de detalle.

---
