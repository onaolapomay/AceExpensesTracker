import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const [loading, setLoading] = useState(true)

  const [token, setToken] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')

    const storedToken = localStorage.getItem('token')

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser))
      setToken(storedToken)
    }

    setLoading(false)
  }, [])

  const login = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)

    setUser(user)
    setToken(token)
  }

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')

    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }