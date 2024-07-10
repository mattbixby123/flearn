import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import HomePage from './components/HomePage'
// import LoginPage from './components/LoginPage'
// import RegisterPage from './components/RegisterPage'
// import { useAuth } from './hooks/useAuth'

function App() {
  // const { user, logout } = useAuth()
  const [count, setCount] = useState(0)

  return (
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            {/* {!user ? (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
              </>
            ) : (
              <li><button onClick={logout}>Logout</button></li>
            )} */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} /> */}
        </Routes>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
      </div>
  )
}

export default App