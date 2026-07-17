import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary-400">
            Movies & Series
          </Link>
          <div className="flex items-center gap-6">
            <Link
              to="/movies"
              className="hover:text-primary-400 transition-colors"
            >
              Movies
            </Link>
            <Link
              to="/series"
              className="hover:text-primary-400 transition-colors"
            >
              Series
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="hover:text-primary-400 transition-colors"
                >
                  Profile
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-300">
                    {user?.name || 'User'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hover:text-primary-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

