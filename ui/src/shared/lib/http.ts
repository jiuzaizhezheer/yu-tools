export async function getJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init)

  if (!response.ok) {
    const method = init?.method ?? 'GET'
    throw new Error(`${method} ${response.url} failed with status ${response.status}`)
  }

  return (await response.json()) as T
}
