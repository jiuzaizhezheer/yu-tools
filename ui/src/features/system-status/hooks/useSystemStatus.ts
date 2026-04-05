import { useEffect, useState } from 'react'

import { HttpError, get } from '@/shared/lib/http'

type HealthResponse = {
  status: string
}

type VersionResponse = {
  name: string
  version: string
}

type SystemStatusState = {
  health: HealthResponse | null
  version: VersionResponse | null
  errorMessage: string | null
  loading: boolean
}

function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return get<HealthResponse>('/health', { signal })
}

function fetchVersion(signal?: AbortSignal): Promise<VersionResponse> {
  return get<VersionResponse>('/version', { signal })
}

export function useSystemStatus(): SystemStatusState {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [version, setVersion] = useState<VersionResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const [healthData, versionData] = await Promise.all([
          fetchHealth(controller.signal),
          fetchVersion(controller.signal),
        ])

        setHealth(healthData)
        setVersion(versionData)
      } catch (error) {
        if (error instanceof HttpError && error.isAborted && !error.isTimeout) {
          return
        }

        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Unknown error happened while requesting API.'
        setErrorMessage(message)
      } finally {
        setLoading(false)
      }
    }

    void load()

    return () => {
      controller.abort()
    }
  }, [])

  return { health, version, errorMessage, loading }
}
