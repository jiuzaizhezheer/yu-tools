import { useSystemStatus } from '../../../features/system-status'

export function HomePage() {
  const { health, version, errorMessage, loading } = useSystemStatus()

  const healthStatus = health?.status ?? 'unknown'
  const healthStatusClass = !loading
    ? healthStatus === 'ok'
      ? 'text-emerald-700 dark:text-emerald-400'
      : 'text-rose-700 dark:text-rose-400'
    : 'text-zinc-900 dark:text-zinc-100'
  const rowClassName =
    'flex items-center justify-between gap-4 rounded-lg border border-zinc-200 px-3.5 py-3 dark:border-zinc-700 md:flex-row md:items-center'
  const codeClassName =
    'inline-flex rounded bg-zinc-100 px-2 py-1 font-mono text-sm text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'

  return (
    <main className="flex min-h-svh items-center justify-center px-6 py-10 md:px-8">
      <section className="w-full max-w-3xl rounded-xl border border-zinc-200 bg-white/95 p-6 text-left shadow-lg shadow-black/10 dark:border-zinc-700 dark:bg-zinc-900/95">
        <h1 className="m-0 text-4xl font-medium tracking-tight text-zinc-950 md:text-5xl dark:text-zinc-100">
          yu-tools
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Minimal skeleton: React requests FastAPI through the Vite `/api` proxy.
        </p>

        <div className="mt-5 grid gap-3">
          <div className={rowClassName}>
            <span className="text-zinc-600 dark:text-zinc-400">Health</span>
            <span className={`font-mono ${healthStatusClass}`}>
              {loading ? 'loading...' : healthStatus}
            </span>
          </div>

          <div className={rowClassName}>
            <span className="text-zinc-600 dark:text-zinc-400">API Name</span>
            <code className={codeClassName}>
              {loading ? 'loading...' : (version?.name ?? 'unknown')}
            </code>
          </div>

          <div className={rowClassName}>
            <span className="text-zinc-600 dark:text-zinc-400">API Version</span>
            <code className={codeClassName}>
              {loading ? 'loading...' : (version?.version ?? 'unknown')}
            </code>
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-lg border border-rose-500/70 bg-rose-500/10 px-3.5 py-3 text-rose-800 dark:text-rose-300">
            Request failed: {errorMessage}
          </p>
        ) : null}
      </section>
    </main>
  )
}
