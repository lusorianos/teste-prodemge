const STORAGE_KEY = 'vue_crud_items_v1'

export async function loadItems() {
  const raw = localStorage.getItem(STORAGE_KEY)

  if (!raw) {
    const response = await fetch('/lista.txt')
    const text = await response.text()

    const sample = text
      .trim()
      .split('\n')
      .slice(1)
      .map(line => line.trim())
      .filter(line => line !== '')
      .map(line => {
        const [id, nome, quantidade] = line.split(';').map(v => v.trim())
        return {
          id: Number(id),
          nome,
          quantidade: Number(quantidade)
        }
      })

    const validArray = Array.isArray(sample) ? sample : []

    localStorage.setItem(STORAGE_KEY, JSON.stringify(validArray))
    return validArray
  }

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveItems(items) {
  const arr = Array.isArray(items) ? items : []
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
}

export function nextId(items) {
  return items.length
    ? Math.max(...items.map(i => Number(i.id))) + 1
    : 1
}