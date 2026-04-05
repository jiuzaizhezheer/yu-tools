import { HTTP_BASE_URL, HTTP_DEFAULT_TIMEOUT_MS } from '../envs'
import { createAbortContext } from './abort'
import { HttpError } from './error'
import { errorMessageFromDetails, parseErrorDetails, parseResponse } from './response'
import type { HttpMethod, HttpRequestOptions } from './types'
import { buildUrl } from './url'

const DEFAULT_ACCEPT = 'application/json, text/plain;q=0.9, */*;q=0.8'

function mergeHeaders(requestHeaders?: HeadersInit): Headers {
  return new Headers(requestHeaders)
}

function isReadableStream(value: unknown): value is ReadableStream {
  return typeof ReadableStream !== 'undefined' && value instanceof ReadableStream
}

function isBodyInit(value: unknown): value is BodyInit {
  if (typeof value === 'string') return true
  if (value instanceof Blob || value instanceof FormData || value instanceof URLSearchParams)
    return true
  if (value instanceof ArrayBuffer || ArrayBuffer.isView(value)) return true
  return isReadableStream(value)
}

function prepareBody(body: unknown, headers: Headers): BodyInit | null | undefined {
  if (body === undefined) return undefined
  if (body === null) return null
  if (isBodyInit(body)) return body

  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  return JSON.stringify(body)
}

function toHttpError(
  error: unknown,
  method: HttpMethod,
  url: string,
  timedOut: boolean,
): HttpError {
  if (error instanceof HttpError) return error

  const isAbortError = error instanceof DOMException && error.name === 'AbortError'
  const message = timedOut
    ? `${method} ${url} timed out`
    : isAbortError
      ? `${method} ${url} was aborted`
      : `${method} ${url} failed due to a network/client error`

  return new HttpError({
    message,
    method,
    url,
    status: null,
    cause: error,
    isTimeout: timedOut,
    isAborted: isAbortError,
  })
}

async function request<T = unknown>(
  method: HttpMethod,
  path: string | URL,
  options: HttpRequestOptions = {},
): Promise<T> {
  const {
    headers: requestHeaders,
    body,
    signal,
    timeoutMs = HTTP_DEFAULT_TIMEOUT_MS,
    responseType = 'json',
    ...fetchInit
  } = options

  const url = buildUrl(path, HTTP_BASE_URL)
  const abortContext = createAbortContext(signal, timeoutMs)
  const headers = mergeHeaders(requestHeaders)

  if (!headers.has('Accept')) {
    headers.set('Accept', DEFAULT_ACCEPT)
  }

  try {
    const response = await fetch(url, {
      ...fetchInit,
      method,
      headers,
      body: prepareBody(body, headers),
      signal: abortContext.signal,
    })

    if (!response.ok) {
      const details = await parseErrorDetails(response.clone())
      const detailMessage = errorMessageFromDetails(details)
      throw new HttpError({
        message: detailMessage
          ? `${method} ${url} failed with ${response.status}: ${detailMessage}`
          : `${method} ${url} failed with status ${response.status}`,
        method,
        url,
        status: response.status,
        details,
        response,
      })
    }

    try {
      return (await parseResponse(response, responseType)) as T
    } catch (error) {
      throw new HttpError({
        message: `${method} ${url} returned an unexpected response payload`,
        method,
        url,
        status: response.status,
        response,
        cause: error,
      })
    }
  } catch (error) {
    throw toHttpError(error, method, url, abortContext.wasTimedOut())
  } finally {
    abortContext.cleanup()
  }
}

export function get<T = unknown>(path: string | URL, options: HttpRequestOptions = {}): Promise<T> {
  return request<T>('GET', path, options)
}

export function post<T = unknown>(
  path: string | URL,
  options: HttpRequestOptions = {},
): Promise<T> {
  return request<T>('POST', path, options)
}

export function put<T = unknown>(path: string | URL, options: HttpRequestOptions = {}): Promise<T> {
  return request<T>('PUT', path, options)
}

export function patch<T = unknown>(
  path: string | URL,
  options: HttpRequestOptions = {},
): Promise<T> {
  return request<T>('PATCH', path, options)
}

function remove<T = unknown>(path: string | URL, options: HttpRequestOptions = {}): Promise<T> {
  return request<T>('DELETE', path, options)
}

export { remove as delete }
