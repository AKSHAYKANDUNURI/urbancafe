export const getLS = (key) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    console.error('getLS error', e)
    return null
  }
}

export const setLS = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('setLS error', e)
  }
}

export const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
