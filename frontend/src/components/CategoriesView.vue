<template>
    <div class="container mt-5">
      <!-- Título centrado -->
      <h2 class="text-center mb-4">Listado de Categorías</h2>
  
      <!-- Botón para cargar categorías -->
      <div class="d-flex justify-content-center mb-3">
        <button class="btn btn-primary" @click="loadCategories">Cargar Categorías</button>
      </div>
  
      <!-- Controles de ordenamiento -->
      <div class="row justify-content-center mb-4">
        <div class="col-md-4">
          <label class="form-label">Ordenar por:</label>
          <select v-model="sortField" class="form-select">
            <option value="name">Nombre</option>
          </select>
        </div>
        <div class="col-md-4">
          <label class="form-label">Dirección:</label>
          <select v-model="sortDirection" class="form-select">
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
  
      <!-- Lista de categorías -->
      <div class="row justify-content-center">
        <div class="col-md-8">
          <ul class="list-group mb-4">
            <li
              class="list-group-item"
              v-for="cat in sortedCategories"
              :key="cat.id"
            >
              <!-- Modo edición -->
              <div v-if="editingId === cat.id">
                <div class="mb-2">
                  <input
                    v-model="editedCategory.name"
                    type="text"
                    class="form-control"
                    placeholder="Nombre"
                  />
                </div>
                <div class="d-flex">
                  <button
                    class="btn btn-success btn-sm me-2"
                    @click="updateCategory"
                  >
                    Guardar
                  </button>
                  <button
                    class="btn btn-secondary btn-sm"
                    @click="cancelEdit"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
              <!-- Modo visual normal -->
              <div v-else class="d-flex justify-content-between align-items-center">
                <span>{{ cat.name }}</span>
                <div>
                  <button
                    class="btn btn-warning btn-sm me-2"
                    @click="startEditing(cat)"
                  >
                    Editar
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteCategory(cat.id)"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Formulario para crear categoría -->
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title mb-0">Crear Categoría</h3>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <label class="form-label">Nombre de la categoría:</label>
                <input v-model="newCategory.name" type="text" class="form-control" />
              </div>
              <button class="btn btn-success" @click="createCategory">Crear</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const apiUrl = 'http://127.0.0.1:8000/api' // Ajusta según la URL de tu API
  
  // Almacena la lista de categorías
  const categories = ref([])
  
  // Objeto para crear una nueva categoría
  const newCategory = ref({ name: '' })
  
  // Variables para edición
  const editingId = ref(null)
  const editedCategory = ref({})
  
  // Variables para ordenamiento
  const sortField = ref('name')
  const sortDirection = ref('asc')
  
  // Computed para ordenar categorías
  const sortedCategories = computed(() => {
    return [...categories.value].sort((a, b) => {
      let valA = a[sortField.value]
      let valB = b[sortField.value]
      if (typeof valA === 'string') {
        valA = valA.toLowerCase()
        valB = valB.toLowerCase()
      }
      if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1
      if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1
      return 0
    })
  })
  
  // Función para cargar categorías
  async function loadCategories() {
    try {
      const res = await fetch(`${apiUrl}/categories`)
      categories.value = await res.json()
    } catch (error) {
      console.error('Error al cargar categorías:', error)
      alert('Hubo un problema al cargar las categorías.')
    }
  }
  
  // Función para crear nueva categoría
  async function createCategory() {
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory.value)
      })
      if (!res.ok) {
        throw new Error('Error al crear la categoría')
      }
      await loadCategories()
      alert('Categoría creada con éxito')
      newCategory.value.name = ''
    } catch (error) {
      console.error(error)
      alert('Hubo un problema al crear la categoría.')
    }
  }
  
  // Función para eliminar categoría
  async function deleteCategory(id) {
    try {
      const res = await fetch(`${apiUrl}/categories/${id}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        throw new Error('Error al eliminar la categoría')
      }
      await loadCategories()
      alert('Categoría eliminada con éxito')
    } catch (error) {
      console.error(error)
      alert('Hubo un problema al eliminar la categoría.')
    }
  }
  
  // Inicia el modo edición para una categoría
  function startEditing(category) {
    editingId.value = category.id
    editedCategory.value = { ...category }
  }
  
  // Función para actualizar la categoría
  async function updateCategory() {
    try {
      const res = await fetch(`${apiUrl}/categories/${editingId.value}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedCategory.value)
      })
      if (!res.ok) {
        throw new Error('Error al actualizar la categoría')
      }
      await loadCategories()
      alert('Categoría actualizada con éxito')
      editingId.value = null
      editedCategory.value = {}
    } catch (error) {
      console.error(error)
      alert('Hubo un problema al actualizar la categoría.')
    }
  }
  
  // Cancela el modo edición
  function cancelEdit() {
    editingId.value = null
    editedCategory.value = {}
  }
  </script>
  
  <style scoped>
  /* Puedes agregar estilos personalizados adicionales aquí */
  </style>
  