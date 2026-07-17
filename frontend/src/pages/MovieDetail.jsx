import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const MovieDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedQuality, setSelectedQuality] = useState(null)

  useEffect(() => {
    fetchMovie()
    fetchReviews()
    if (isAuthenticated) {
      checkFavorite()
    }
  }, [id, isAuthenticated])

  const fetchMovie = async () => {
    try {
      const response = await api.get(`/api/movie/${id}`)
      setMovie(response.data.movie)
      if (response.data.movie.videos?.length > 0) {
        setSelectedQuality(response.data.movie.videos[0])
      }
    } catch (error) {
      console.error('Error fetching movie:', error)
      if (error.response?.status === 401) {
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await api.get('/api/review')
      const movieReviews = response.data.reviews?.filter(
        (review) => review.movie?._id === id
      )
      setReviews(movieReviews || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const checkFavorite = async () => {
    try {
      const response = await api.get('/api/user/getFavMovieAndSeries')
      const favMovies = response.data.favMovies || []
      setIsFavorite(favMovies.some((m) => m._id === id))
    } catch (error) {
      console.error('Error checking favorite:', error)
    }
  }

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      if (isFavorite) {
        await api.delete(`/api/user/removeFavMovie/${id}`)
      } else {
        await api.put(`/api/user/addFavMovie/${id}`)
      }
      setIsFavorite(!isFavorite)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Movie not found</p>
      </div>
    )
  }

  const posterUrl = movie.poster?.startsWith('http')
    ? movie.poster
    : `http://localhost:3000/uploads/${movie.poster}`

  const videoUrl = selectedQuality?.video?.startsWith('http')
    ? selectedQuality.video
    : `http://localhost:3000/uploads/${selectedQuality?.video}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img
            src={posterUrl}
            alt={movie.name}
            className="w-full rounded-lg shadow-xl"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Poster'
            }}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">{movie.name}</h1>
            {isAuthenticated && (
              <button
                onClick={toggleFavorite}
                className={`px-4 py-2 rounded transition-colors ${
                  isFavorite
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
              </button>
            )}
          </div>
          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {movie.genre?.map((genre, idx) => (
                <span
                  key={idx}
                  className="bg-primary-600 px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-400">IMDB:</span> {movie.imdb}
              </div>
              <div>
                <span className="text-gray-400">Release Date:</span>{' '}
                {new Date(movie.releaseDate).toLocaleDateString()}
              </div>
              <div>
                <span className="text-gray-400">Director:</span> {movie.director}
              </div>
              {movie.writer && (
                <div>
                  <span className="text-gray-400">Writer:</span> {movie.writer}
                </div>
              )}
              {movie.time && (
                <div>
                  <span className="text-gray-400">Duration:</span> {movie.time}
                </div>
              )}
              {movie.language && (
                <div>
                  <span className="text-gray-400">Language:</span> {movie.language}
                </div>
              )}
            </div>
            {movie.cast && movie.cast.length > 0 && (
              <div>
                <span className="text-gray-400">Cast:</span>{' '}
                {movie.cast.join(', ')}
              </div>
            )}
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          </div>

          {movie.videos && movie.videos.length > 0 && (
            <div className="mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Quality:
                </label>
                <select
                  value={selectedQuality?.quality || ''}
                  onChange={(e) => {
                    const quality = movie.videos.find(
                      (v) => v.quality === parseInt(e.target.value)
                    )
                    setSelectedQuality(quality)
                  }}
                  className="bg-slate-800 border border-slate-700 rounded px-4 py-2"
                >
                  {movie.videos.map((video, idx) => (
                    <option key={idx} value={video.quality}>
                      {video.quality}p
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  className="w-full"
                  src={videoUrl}
                  poster={posterUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}

          {movie.movieImages && movie.movieImages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {movie.movieImages.map((img, idx) => {
                  const imgUrl = img.startsWith('http')
                    ? img
                    : `http://localhost:3000/uploads/${img}`
                  return (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`${movie.name} ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="bg-slate-800 p-4 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">{review.user?.name}</span>
                  <span className="text-yellow-400">
                    {'⭐'.repeat(review.rating)}
                  </span>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No reviews yet</p>
        )}
      </div>
    </div>
  )
}

export default MovieDetail

