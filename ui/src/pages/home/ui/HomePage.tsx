import { useSystemStatus } from '@/features/system-status'

type BrandGlyphProps = {
  className?: string
}

function BrandGlyph({ className = '' }: BrandGlyphProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <rect width="100" height="100" fill="#0A0A0A" />
      <path
        d="M 0 15 L 18 15 L 34 48 L 45 38 L 60 38 L 42 58 L 42 85 L 24 85 L 24 58 Z"
        fill="#FFFFFF"
      />
      <path
        d="M 62 15 L 100 15 L 100 34 L 86 34 L 86 72 L 68 85 L 68 34 L 43 34 Z"
        fill="#FFFFFF"
      />
    </svg>
  )
}

export function HomePage() {
  const { health, version, errorMessage, loading } = useSystemStatus()

  const healthStatus = health?.status ?? 'unknown'
  const healthStatusClass = !loading
    ? healthStatus === 'ok'
      ? 'text-emerald-300'
      : 'text-rose-300'
    : 'text-zinc-100'
  const rowClassName =
    'grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2 rounded-2xl border border-white/15 bg-black/35 px-4 py-3.5 backdrop-blur-sm sm:grid-cols-[auto_auto]'
  const codeClassName =
    'inline-flex justify-self-start rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 font-mono text-sm text-zinc-100 sm:justify-self-end'

  return (
    <main className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 px-6 py-10 text-zinc-100 md:px-8">
      <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.1),transparent_25%)]" />

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rotate-12 rounded-[2.5rem] shadow-2xl shadow-black/50 sm:h-96 sm:w-96">
        <BrandGlyph className="h-full w-full rounded-[2.5rem] opacity-90" />
      </div>
      <div className="pointer-events-none absolute -bottom-28 -right-16 h-64 w-64 -rotate-6 rounded-[2rem] opacity-70 blur-[0.5px] sm:h-80 sm:w-80">
        <BrandGlyph className="h-full w-full rounded-[2rem]" />
      </div>

      <section className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-zinc-900/55 p-6 text-left shadow-2xl shadow-black/45 backdrop-blur-xl md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="m-0 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              yu-tools
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300 md:text-base">
              React + FastAPI starter with a clean API status panel, Vite proxying, and strict
              type-safe checks.
            </p>
          </div>
          <BrandGlyph className="hidden h-14 w-14 shrink-0 rounded-2xl border border-white/20 sm:block" />
        </div>

        <div className="mt-6 grid gap-3">
          <div className={rowClassName}>
            <span className="text-sm uppercase tracking-[0.12em] text-zinc-400">Health</span>
            <span
              className={`font-mono text-sm sm:text-base sm:justify-self-end ${healthStatusClass}`}
            >
              {loading ? 'loading...' : healthStatus}
            </span>
          </div>

          <div className={rowClassName}>
            <span className="text-sm uppercase tracking-[0.12em] text-zinc-400">API Name</span>
            <code className={codeClassName}>
              {loading ? 'loading...' : (version?.name ?? 'unknown')}
            </code>
          </div>

          <div className={rowClassName}>
            <span className="text-sm uppercase tracking-[0.12em] text-zinc-400">API Version</span>
            <code className={codeClassName}>
              {loading ? 'loading...' : (version?.version ?? 'unknown')}
            </code>
          </div>
        </div>

        {errorMessage ? (
          <p className="mt-4 rounded-2xl border border-rose-300/40 bg-rose-500/20 px-4 py-3 text-sm text-rose-100">
            Request failed: {errorMessage}
          </p>
        ) : null}
      </section>
    </main>
  )
}
