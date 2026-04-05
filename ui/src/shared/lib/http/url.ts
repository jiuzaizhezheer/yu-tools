function isAbsoluteUrl(value: string): boolean {
  return /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)
}

export function buildUrl(path: string | URL, baseUrl: string | undefined): string {
  if (path instanceof URL) {
    return path.toString()
  }
  const trimmedBaseUrl = baseUrl?.trim()
  if (isAbsoluteUrl(path) || !trimmedBaseUrl) {
    return path
  }
  return `${trimmedBaseUrl}${path}`
}
