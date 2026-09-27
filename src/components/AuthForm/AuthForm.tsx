import { useState } from 'react'
import type { FormEvent } from 'react'
import { login } from '@/api'
import styles from './AuthForm.module.css'

export function AuthForm() {
  const [loginValue, setLoginValue] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const response = await login({ login: loginValue, password })
      // TODO: save the session/token and redirect to the chat
      console.log('Logged in:', response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось войти')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Авторизация</h1>

      <label className={styles.label}>
        <span className={styles.labelText}>Логин</span>
        <input
          className={styles.input}
          type="text"
          name="login"
          placeholder="Введите логин"
          value={loginValue}
          onChange={(event) => setLoginValue(event.target.value)}
          autoComplete="username"
          disabled={isLoading}
          required
        />
      </label>

      <label className={styles.label}>
        <span className={styles.labelText}>Пароль</span>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          disabled={isLoading}
          required
        />
      </label>

      {error !== null && <p className={styles.error}>{error}</p>}

      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Входим...' : 'Войти'}
      </button>
    </form>
  )
}
