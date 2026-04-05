import type { AbortContext } from './types'

export function createAbortContext(
  externalSignal: AbortSignal | undefined,
  timeoutMs: number,
): AbortContext {
  const controller = new AbortController()
  let timedOut = false
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const onAbortFromCaller = (): void => {
    controller.abort(externalSignal?.reason)
  }

  if (externalSignal) {
    if (externalSignal.aborted) {
      controller.abort(externalSignal.reason)
    } else {
      externalSignal.addEventListener('abort', onAbortFromCaller, { once: true })
    }
  }

  if (timeoutMs > 0) {
    timeoutId = setTimeout(() => {
      timedOut = true
      controller.abort(new DOMException(`Request timed out after ${timeoutMs}ms`, 'TimeoutError'))
    }, timeoutMs)
  }

  return {
    signal: controller.signal,
    cleanup: () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (externalSignal) externalSignal.removeEventListener('abort', onAbortFromCaller)
    },
    wasTimedOut: () => timedOut,
  }
}
