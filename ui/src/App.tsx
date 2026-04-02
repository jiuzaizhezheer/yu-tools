import { useEffect, useState } from 'react'
import './App.css'

type HealthResponse = {
  status: string
}

type VersionResponse = {
  name: string
  version: string
}

async function parseJson<T>(response: Response): Promise<T> {
  return (await response.json()) as T
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [version, setVersion] = useState<VersionResponse | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    const load = async () => {
      try {
        const [healthResponse, versionResponse] = await Promise.all([
          fetch('/api/health', { signal: controller.signal }),
          fetch('/api/version', { signal: controller.signal }),
        ])

        if (!healthResponse.ok) {
          throw new Error(`GET /api/health failed with status ${healthResponse.status}`)
        }

        if (!versionResponse.ok) {
          throw new Error(`GET /api/version failed with status ${versionResponse.status}`)
        }

        const [healthData, versionData] = await Promise.all([
          parseJson<HealthResponse>(healthResponse),
          parseJson<VersionResponse>(versionResponse),
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

  const healthStatus = health?.status ?? 'unknown'
  const healthStatusClass = !loading && healthStatus === 'ok' ? 'status-ok' : 'status-error'

  return (
    <main id="app">
      <section id="center" className="panel">
        <h1>yu-tools</h1>
        <p className="muted">
          Minimal skeleton: React requests FastAPI through the Vite `/api` proxy.
        </p>

        <div className="rows">
          <div className="row">
            <span className="label">Health</span>
            <span className={`value ${loading ? '' : healthStatusClass}`}>
              {loading ? 'loading...' : healthStatus}
            </span>
          </div>

          <div className="row">
            <span className="label">API Name</span>
            <code>{loading ? 'loading...' : (version?.name ?? 'unknown')}</code>
          </div>

          <div className="row">
            <span className="label">API Version</span>
            <code>{loading ? 'loading...' : (version?.version ?? 'unknown')}</code>
          </div>
        </div>

        {errorMessage ? <p className="error">Request failed: {errorMessage}</p> : null}
      </section>
    </main>
  )
}

export default App
