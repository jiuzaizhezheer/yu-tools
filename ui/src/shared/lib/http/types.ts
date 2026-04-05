export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ResponseType = 'json' | 'text' | 'void'

type JsonObject = Record<string, unknown>

export interface HttpRequestOptions extends Omit<
  RequestInit,
  'method' | 'headers' | 'body' | 'signal'
> {
  headers?: HeadersInit
  body?: BodyInit | JsonObject | null
  signal?: AbortSignal
  timeoutMs?: number
  responseType?: ResponseType
}

export interface AbortContext {
  signal: AbortSignal
  cleanup: () => void
  wasTimedOut: () => boolean
}
