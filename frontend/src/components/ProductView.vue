<template>
  <div class="container mt-5">
    <!-- Título centrado -->
    <h2 class="text-center mb-4">Listado de Productos</h2>
    
    <!-- Botón para cargar productos -->
    <div class="d-flex justify-content-center mb-3">
      <button class="btn btn-primary" @click="loadProducts">Cargar Productos</button>
    </div>
    
    <!-- Controles de ordenamiento -->
    <div class="row justify-content-center mb-4">
      <div class="col-md-4">
        <label class="form-label">Ordenar por:</label>
        <select v-model="sortField" class="form-select">
          <option value="name">Nombre</option>
          <option value="stock">Stock</option>
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
    
    <!-- Lista de productos -->
    <div class="row justify-content-center">
      <div class="col-md-8">
        <ul class="list-group mb-4">
          <li
            class="list-group-item"
            v-for="product in sortedProducts"
            :key="product.id"
          >
            <!-- Modo edición -->
            <div v-if="editingId === product.id">
              <div class="mb-2">
                <input
                  v-model="editedProduct.name"
                  type="text"
                  class="form-control"
                  placeholder="Nombre"
                />
              </div>
              <div class="mb-2">
                <input
                  v-model.number="editedProduct.stock"
                  type="number"
                  class="form-control"
                  placeholder="Stock"
                />
              </div>
              <div class="mb-2">
                <input
                  v-model.number="editedProduct.category_id"
                  type="number"
                  class="form-control"
                  placeholder="Categoría (ID)"
                />
              </div>
              <div class="d-flex">
                <button
                  class="btn btn-success btn-sm me-2"
                  @click="updateProduct"
                >
                  Guardar
                </button>
                <button class="btn btn-secondary btn-sm" @click="cancelEdit">
                  Cancelar
                </button>
              </div>
            </div>
            <!-- Modo visual normal -->
            <div v-else class="d-flex justify-content-between align-items-center">
              <div>
                <strong>{{ product.name }}</strong>
                <span class="text-muted">(Categoría: {{ product.category?.name }})</span>
                <span> - Stock: {{ product.stock }}</span>
              </div>
              <div>
                <button
                  class="btn btn-warning btn-sm me-2"
                  @click="startEditing(product)"
                >
                  Editar
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="deleteProduct(product.id)"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
    <!-- Formulario para crear producto -->
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title mb-0">Crear Producto</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Nombre:</label>
              <input v-model="newProduct.name" type="text" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Stock:</label>
              <input v-model.number="newProduct.stock" type="number" class="form-control" />
            </div>
            <div class="mb-3">
              <label class="form-label">Categoría (ID):</label>
              <input v-model.number="newProduct.category_id" type="number" class="form-control" />
            </div>
            <button class="btn btn-success" @click="createProduct">Crear</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const products = ref([])

const newProduct = ref({
  name: '',
  stock: 0,
  category_id: 1
})

// Variables para edición
const editingId = ref(null)
const editedProduct = ref({})

// Variables para ordenamiento
const sortField = ref('name')
const sortDirection = ref('asc')

// Endpoint de la API
const apiUrl = 'http://127.0.0.1:8000/api'

// Computed property para ordenar productos
const sortedProducts = computed(() => {
  return [...products.value].sort((a, b) => {
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

// Función para cargar productos
async function loadProducts() {
  try {
    const res = await fetch(`${apiUrl}/products`)
    products.value = await res.json()
  } catch (error) {
    console.error('Error al cargar productos:', error)
  }
}

// Función para crear producto
async function createProduct() {
  try {
    const res = await fetch(`${apiUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct.value)
    })
    if (!res.ok) {
      throw new Error('Error al crear producto')
    }
    await loadProducts()
    alert('Producto creado con éxito')
    newProduct.value = { name: '', stock: 0, category_id: 1 }
  } catch (error) {
    console.error(error)
    alert('Hubo un problema al crear el producto.')
  }
}

// Función para eliminar producto
async function deleteProduct(id) {
  try {
    const res = await fetch(`${apiUrl}/products/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) {
      throw new Error('Error al eliminar producto')
    }
    await loadProducts()
    alert('Producto eliminado con éxito')
  } catch (error) {
    console.error(error)
    alert('Hubo un problema al eliminar el producto.')
  }
}

// Inicia el modo edición para un producto
function startEditing(product) {
  editingId.value = product.id
  editedProduct.value = { ...product }  // Clona el objeto
}

// Función para actualizar producto
async function updateProduct() {
  try {
    const res = await fetch(`${apiUrl}/products/${editingId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedProduct.value)
    })
    if (!res.ok) {
      throw new Error('Error al actualizar producto')
    }
    await loadProducts()
    alert('Producto actualizado con éxito')
    editingId.value = null
    editedProduct.value = {}
  } catch (error) {
    console.error(error)
    alert('Hubo un problema al actualizar el producto.')
  }
}

// Cancela el modo edición
function cancelEdit() {
  editingId.value = null
  editedProduct.value = {}
}
</script>

<style scoped>
/* Puedes agregar estilos personalizados adicionales aquí */
</style>
