// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../store/api'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../store/authSlice'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { isLoading, error }] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setUser(result.user))
      dispatch(setToken(result.token))
      navigate('/')
    } catch (err) {
      // Error is handled by RTK Query and available in the `error` variable
      console.error('Failed to login:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>Error: {error.data?.message || 'An error occurred'}</p>}
    </form>
  )
}

export default LoginPage