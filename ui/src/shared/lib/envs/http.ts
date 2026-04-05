export const HTTP_BASE_URL = import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : '/api'

export const HTTP_DEFAULT_TIMEOUT_MS = import.meta.env.VITE_HTTP_TIMEOUT_MS
  ? Number(import.meta.env.VITE_HTTP_TIMEOUT_MS)
  : 10_000
