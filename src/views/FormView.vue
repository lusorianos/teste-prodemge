<template>
  <div class="max-w-lg mx-auto p-6 space-y-6">
    <h2 class="text-2xl font-bold">
      {{ isEdit ? 'Editar Item' : 'Novo Item' }}
    </h2>

    <form @submit.prevent="submit" class="space-y-4">
      <div>
        <label class="font-medium">Nome</label>
        <input
          v-model="form.nome"
          class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p v-if="errors.nome" class="text-red-500 text-sm mt-1">
          {{ errors.nome }}
        </p>
      </div>

      <div>
        <label class="font-medium">Quantidade</label>
        <input
          v-model.number="form.quantidade"
          type="number"
          step="1"
          class="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <p v-if="errors.quantidade" class="text-red-500 text-sm mt-1">
          {{ errors.quantidade }}
        </p>
      </div>

      <div class="flex items-center space-x-4 pt-4">
        <button
          type="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
        >
          {{ isEdit ? 'Salvar' : 'Criar' }}
        </button>

        <router-link
          to="/"
          class="text-gray-600 hover:underline"
        >
          Cancelar
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { loadItems, saveItems, nextId } from '../stores/itemsStore'
import { useRoute, useRouter } from 'vue-router'

export default {
  props: ['id'],
  setup() {
    const route = useRoute()
    const router = useRouter()
    
    const items = ref([])
    
    const form = ref({
      id: null,
      nome: '',
      quantidade: 0
    })

    const errors = ref({})
    const isEdit = !!route.params.id

    onMounted(async () => {
      items.value = await loadItems()

      if (isEdit) {
        const id = Number(route.params.id)
        const found = items.value.find(i => i.id === id)
        if (found) {
          form.value = { ...found }
        } else {
          alert('Item não encontrado')
        }
      }
    })

    function validate() {
      errors.value = {}
      if (!form.value.nome || !form.value.nome.trim()) {
        errors.value.nome = 'Nome obrigatório'
      } else {
        const nomeLower = form.value.nome.trim().toLowerCase()
        const duplicate = items.value.some(i =>
          i.nome.trim().toLowerCase() === nomeLower &&
          i.id !== form.value.id
        )

        if (duplicate) {
          errors.value.nome = 'Já existe um item com esse nome'
        }
      }
      if (
        form.value.quantidade == null ||
        form.value.quantidade === '' ||
        isNaN(form.value.quantidade)
      ) {
        errors.value.quantidade = 'Quantidade inválida'
      } else if (Number(form.value.quantidade) < 0) {
        errors.value.quantidade = 'Quantidade deve ser >= 0'
      }
      return Object.keys(errors.value).length === 0
    }

    function submit() {
      if (!validate()) return

      if (isEdit) {
        const idx = items.value.findIndex(i => i.id === form.value.id)
        if (idx !== -1) {
          items.value[idx] = { ...form.value }
        }
      } else {
        const newItem = {
          ...form.value,
          id: nextId(items.value)
        }
        items.value.push(newItem)
      }

      saveItems(items.value)
      router.push({ name: 'list' })
    }

    return { form, errors, isEdit, submit }
  }
}
</script>