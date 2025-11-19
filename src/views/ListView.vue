<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6">
    <h2 class="text-2xl font-bold">Lista de Itens</h2>

    <div>
      <input
        v-model="query"
        placeholder="Filtrar por nome..."
        class="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    <table class="w-full border-collapse shadow overflow-hidden rounded-lg">
      <thead class="bg-gray-200">
        <tr>
          <th class="p-3 text-left">ID</th>
          <th class="p-3 text-left">Nome</th>
          <th class="p-3 text-left">Quantidade</th>
          <th class="p-3 text-left">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in filtered"
          :key="item.id"
          class="border-b hover:bg-gray-50 transition"
        >
          <td class="p-3">{{ item.id }}</td>
          <td class="p-3">{{ item.nome }}</td>
          <td class="p-3">{{ item.quantidade }}</td>
          <td class="p-3 space-x-1 flex">
            <router-link
              :to="{ name: 'view', params: { id: item.id } }"
              class="bg-blue-800 rounded flex-1 text-center py-1 px-2 text-white transition hover:brightness-110"
            >Ver</router-link>

            <router-link
              :to="{ name: 'edit', params: { id: item.id } }"
              class="bg-green-700 rounded flex-1 text-center py-1 px-2 text-white transition hover:brightness-110"
            >Editar</router-link>

            <button
              @click.prevent="remove(item.id)"
              class="bg-red-600 rounded flex-1 text-center py-1 px-2 text-white transition hover:brightness-110"
            >
              Excluir
            </button>
          </td>
        </tr>

        <tr v-if="!filtered.length">
          <td colspan="4" class="p-4 text-center text-gray-500">
            Nenhum item encontrado
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { loadItems, saveItems } from '../stores/itemsStore'

export default {
  setup() {
    const items = ref([])
    const query = ref('')

    onMounted(async () => {
      items.value = await loadItems()
    })

    const filtered = computed(() => {
      const q = query.value.trim().toLowerCase()
      if (!q) return items.value
      return items.value.filter(i =>
        i.nome.toLowerCase().includes(q)
      )
    })

    function remove(id) {
      if (!confirm('Confirma exclusão?')) return
      items.value = items.value.filter(i => i.id !== id)
      saveItems(items.value)
      alert('Item excluído')
    }

    return { items, query, filtered, remove }
  }
}
</script>
