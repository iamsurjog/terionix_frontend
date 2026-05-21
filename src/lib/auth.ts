const AUTH_KEY = 'terionix_admin'

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(AUTH_KEY) === 'true'
}

export function login(password: string): boolean {
  if (password === 'admin') {
    localStorage.setItem(AUTH_KEY, 'true')
    return true
  }
  return false
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY)
}
