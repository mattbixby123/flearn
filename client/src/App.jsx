import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HomePage from './components/Home'
import LoginPage from './components/Login'
import RegisterPage from './components/Register'
import Logout from './components/Logout'
import { setUser } from './redux/authSlice'  // Make sure this import is correct
import { useMeQuery } from './redux/api'

function App() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const { data: userData, isLoading, error } = useMeQuery(undefined, 
    {
    skip: !token,
    },
  )

  // console.log('Token:', token)  // Log the token
  // console.log('User data:', userData)  // Log the user data
  // console.log('Is loading:', isLoading)  // Log the loading state
  // console.log('Error:', error)  // Log any errors

  useEffect(() => {
    if (userData) {
      console.log('Dispatching setUser with:', userData)
      dispatch(setUser(userData))
    }
  }, [userData, dispatch])


  // const handleLogout = () => {
  //   dispatch(clearUser())
  // }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!userData ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <>
            <p>hi - this shows if you are logged in and the auth/me endpoint is being accessed correctly</p>
            // view decks
            // add decks
            // account
            <Logout/>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </div>
  )
}

export default App