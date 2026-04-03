import { useEffect, useState } from 'react'

import { fetchHealth, fetchVersion } from '../../../shared/api/system'
import type { HealthResponse, VersionResponse } from '../../../shared/types/system'

type SystemStatusState = {
  health: HealthResponse | null
  version: VersionResponse | null
  errorMessage: string | null
  loading: boolean
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
