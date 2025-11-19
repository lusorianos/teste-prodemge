<template>
  <div class="max-w-lg mx-auto p-6 space-y-6">
    <h2 class="text-2xl font-bold">Detalhes do Item</h2>

    <div
      v-if="item"
      class="space-y-3 border rounded-lg p-4 shadow bg-white"
    >
      <p><strong>ID:</strong> {{ item.id }}</p>
      <p><strong>Nome:</strong> {{ item.nome }}</p>
      <p><strong>Quantidade:</strong> {{ item.quantidade }}</p>

      <div class="flex space-x-4 pt-2">
        <router-link
          :to="{ name: 'edit', params: { id: item.id } }"
          class="text-blue-600 hover:underline"
        >
          Editar
        </router-link>
        <router-link
          to="/"
          class="text-gray-600 hover:underline"
        >
          Voltar
        </router-link>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">
      Item não encontrado
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { loadItems } from '../stores/itemsStore'

export default {
  setup() {
    const route = useRoute()
    const item = ref(null)

    onMounted(async () => {
      const items = await loadItems()
      const id = Number(route.params.id)
      item.value = items.find(i => i.id === id) || null
    })

    return { item }
  }
}
</script>
