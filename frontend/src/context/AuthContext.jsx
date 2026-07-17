import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['token'] = token
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/user/getMe')
      setUser(response.data.user)
    } catch (error) {
      console.error('Error fetching user:', error)
      logout()
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/signin', { email, password })
      const { token: newToken, user: userData } = response.data
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      api.defaults.headers.common['token'] = newToken
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || error.response?.data?.message || 'Login failed',
      }
    }
  }

  const signup = async (name, email, password, rePassword) => {
    try {
      const response = await api.post('/api/auth/signup', {
        name,
        email,
        password,
        rePassword,
      })
      // Signup doesn't return a token, so we need to login after signup
      const loginResult = await login(email, password)
      if (loginResult.success) {
        return { success: true }
      } else {
        return {
          success: false,
          message: 'Account created but login failed. Please try logging in.',
        }
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.error || error.response?.data?.message || 'Signup failed',
      }
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    delete api.defaults.headers.common['token']
  }

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

