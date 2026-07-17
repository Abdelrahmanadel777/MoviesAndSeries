import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import MovieCard from '../components/MovieCard'
import SeriesCard from '../components/SeriesCard'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [moviesRes, seriesRes] = await Promise.all([
        api.get('/api/movie'),
        api.get('/api/series'),
      ])
      setMovies(moviesRes.data.movies?.slice(0, 6) || [])
      setSeries(seriesRes.data.series?.slice(0, 6) || [])
    } catch (error) {
      console.error('Error fetching data:', error)
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          Welcome to Movies & Series
        </h1>
        <p className="text-xl text-gray-400">
          Discover your next favorite movie or series
        </p>
      </div>

      {movies.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Movies</h2>
            <Link
              to="/movies"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {series.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Series</h2>
            <Link
              to="/series"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {series.map((seriesItem) => (
              <SeriesCard key={seriesItem._id} series={seriesItem} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default Home

