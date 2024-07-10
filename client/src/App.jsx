import { Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { logout } from './store/authSlice'
import { useGetCurrentUserQuery } from './store/api'

function App() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { data: user, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  })

  const handleLogout = () => {
    dispatch(logout())
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          ) : (
            <li><button onClick={handleLogout}>Logout</button></li>
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