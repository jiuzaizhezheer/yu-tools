import type { HttpMethod } from './types'

interface HttpErrorInit {
  message: string
  method: HttpMethod
  url: string
  status?: number | null
  details?: unknown
  response?: Response
  cause?: unknown
  isTimeout?: boolean
  isAborted?: boolean
}

export class HttpError extends Error {
  public readonly method: HttpMethod
  public readonly url: string
  public readonly status: number | null
  public readonly details: unknown
  public readonly response?: Response
  public readonly isTimeout: boolean
  public readonly isAborted: boolean

  constructor(init: HttpErrorInit) {
    super(init.message)
    this.name = 'HttpError'
    this.method = init.method
    this.url = init.url
    this.status = init.status ?? null
    this.details = init.details
    this.response = init.response
    this.isTimeout = init.isTimeout ?? false
    this.isAborted = init.isAborted ?? false

    if (init.cause !== undefined) {
      Object.defineProperty(this, 'cause', {
        value: init.cause,
        enumerable: false,
        configurable: true,
        writable: false,
      })
    }
  }
}
