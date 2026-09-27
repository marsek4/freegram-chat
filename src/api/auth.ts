import { request } from './client'

export interface LoginPayload {
  login: string
  password: string
}

export interface LoginResponse {
  // TODO: specify the shape once the API response format is known
  [key: string]: unknown
}

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>('/api/auth/login', {
    method: 'POST',
    body: payload,
  })
}
