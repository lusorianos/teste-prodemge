<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 antialiased">
    <header class="bg-white shadow-sm border-b">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold tracking-tight">
          <span class="text-green-700">CRUD</span> | PRODEMGE
        </h1>
        <nav class="flex gap-3">
          <router-link
            class="px-4 py-2 text-sm font-medium rounded-lg bg-gray-600 hover:bg-gray-800 text-white transition"
            to="/"
          >
            Listagem
          </router-link>
          <router-link
            class="px-4 py-2 text-sm font-medium rounded-lg bg-green-700 hover:bg-green-800 text-white transition"
            to="/new"
          >
            Novo item
          </router-link>
        </nav>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>