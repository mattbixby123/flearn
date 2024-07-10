// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../store/api'
import { useDispatch } from 'react-redux'
import { setUser, setToken } from '../store/authSlice'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register, { isLoading, error }] = useRegisterMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await register({ username, email, password }).unwrap()
      dispatch(setUser(result.user))
      dispatch(setToken(result.token))
      navigate('/')
    } catch (err) {
      console.error('Failed to register:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
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
        {isLoading ? 'Registering...' : 'Register'}
      </button>
      {error && <p>Error: {error.data?.message || 'An error occurred'}</p>}
    </form>
  )
}

export default RegisterPage