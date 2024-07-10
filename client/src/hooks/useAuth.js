// src/hooks/useAuth.js
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setToken, logout } from '../store/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const token = useSelector((state) => state.auth.token)

  const login = async (credentials) => {
    try {
      // Perform login API call here
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      const data = await response.json()
      if (response.ok) {
        dispatch(setUser(data.user))
        dispatch(setToken(data.token))
        return true
      } else {
        throw new Error(data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  const logoutUser = () => {
    dispatch(logout())
    // Perform any additional logout actions (e.g., clearing local storage)
  }

  return {
    user,
    isAuthenticated,
    token,
    login,
    logout: logoutUser,
  }
}