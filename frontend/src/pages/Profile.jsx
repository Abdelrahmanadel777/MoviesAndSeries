import { useEffect, useState } from 'react'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SeriesCard from '../components/SeriesCard'

const Profile = () => {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState({ movies: [], series: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFavorites()
  }, [])

  const fetchFavorites = async () => {
    try {
      const response = await api.get('/api/user/getFavMovieAndSeries')
      setFavorites({
        movies: response.data.favMovies || [],
        series: response.data.favSeries || [],
      })
    } catch (error) {
      console.error('Error fetching favorites:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  const profilePhotoUrl = user?.profilePhoto?.startsWith('http')
    ? user.profilePhoto
    : user?.profilePhoto
      ? `http://localhost:3000/uploads/${user.profilePhoto}`
      : null

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            {profilePhotoUrl ? (
              <img
                src={profilePhotoUrl}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-primary-600 flex items-center justify-center text-3xl font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold mb-2">{user?.name}</h1>
              <p className="text-gray-400">{user?.email}</p>
              <span className="inline-block mt-2 bg-primary-600 px-3 py-1 rounded-full text-sm">
                {user?.role}
              </span>
            </div>
          </div>
        </div>

        {favorites.movies.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Favorite Movies</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.movies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {favorites.series.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-4">Favorite Series</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.series.map((series) => (
                <SeriesCard key={series._id} series={series} />
              ))}
            </div>
          </section>
        )}

        {favorites.movies.length === 0 && favorites.series.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400 mb-4">No favorites yet</p>
            <Link
              to="/movies"
              className="text-primary-400 hover:text-primary-300"
            >
              Browse Movies
            </Link>
            {' | '}
            <Link
              to="/series"
              className="text-primary-400 hover:text-primary-300"
            >
              Browse Series
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

