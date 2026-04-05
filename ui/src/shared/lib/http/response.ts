import type { ResponseType } from './types'

async function parseJsonText(text: string): Promise<unknown> {
  if (text.trim().length === 0) return undefined
  return JSON.parse(text) as unknown
}

export async function parseErrorDetails(response: Response): Promise<unknown> {
  const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''
  const rawText = await response.text()
  if (rawText.trim().length === 0) return null

  if (contentType.includes('application/json') || contentType.includes('+json')) {
    try {
      return JSON.parse(rawText) as unknown
    } catch {
      return rawText
    }
  }

  return rawText
}

export function errorMessageFromDetails(details: unknown): string | null {
  if (typeof details === 'string' && details.length > 0) return details
  if (!details || typeof details !== 'object') return null
  if ('detail' in details && typeof details.detail === 'string') return details.detail
  if ('message' in details && typeof details.message === 'string') return details.message
  return null
}

export async function parseResponse(
  response: Response,
  responseType: ResponseType,
): Promise<unknown> {
  if (responseType === 'json') {
    return parseJsonText(await response.text())
  }
  if (responseType === 'void' || response.status === 204 || response.status === 205) {
    return undefined
  }
  return response.text()
}
