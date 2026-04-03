import { getJson } from '../lib/http'
import type { HealthResponse, VersionResponse } from '../types/system'

export function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  return getJson<HealthResponse>('/api/health', { signal })
}

export function fetchVersion(signal?: AbortSignal): Promise<VersionResponse> {
  return getJson<VersionResponse>('/api/version', { signal })
}
