import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../services/api'
import { useAuth } from '../context/AuthContext'

const SeriesDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [series, setSeries] = useState(null)
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [reviews, setReviews] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    fetchSeries()
    fetchEpisodes()
    fetchReviews()
    if (isAuthenticated) {
      checkFavorite()
    }
  }, [id, isAuthenticated])

  const fetchSeries = async () => {
    try {
      const response = await api.get(`/api/series/${id}`)
      setSeries(response.data.series)
    } catch (error) {
      console.error('Error fetching series:', error)
      if (error.response?.status === 401) {
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const fetchEpisodes = async () => {
    if (!isAuthenticated) return
    try {
      const response = await api.get('/api/episode')
      const seriesEpisodes = response.data.episodes?.filter(
        (ep) => ep.series?._id === id
      )
      setEpisodes(seriesEpisodes || [])
    } catch (error) {
      console.error('Error fetching episodes:', error)
    }
  }

  const fetchReviews = async () => {
    try {
      const response = await api.get('/api/review')
      const seriesReviews = response.data.reviews?.filter(
        (review) => review.series?._id === id
      )
      setReviews(seriesReviews || [])
    } catch (error) {
      console.error('Error fetching reviews:', error)
    }
  }

  const checkFavorite = async () => {
    try {
      const response = await api.get('/api/user/getFavMovieAndSeries')
      const favSeries = response.data.favSeries || []
      setIsFavorite(favSeries.some((s) => s._id === id))
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
        await api.delete(`/api/user/removeFavSeries/${id}`)
      } else {
        await api.put(`/api/user/addFavSeries/${id}`)
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

  if (!series) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl">Series not found</p>
      </div>
    )
  }

  const posterUrl = series.poster?.startsWith('http')
    ? series.poster
    : `http://localhost:3000/uploads/${series.poster}`

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <img
            src={posterUrl}
            alt={series.name}
            className="w-full rounded-lg shadow-xl"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x600?text=No+Poster'
            }}
          />
        </div>
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold">{series.name}</h1>
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
              {series.genre?.map((genre, idx) => (
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
                <span className="text-gray-400">IMDB:</span> {series.imdb}
              </div>
              <div>
                <span className="text-gray-400">Seasons:</span>{' '}
                {series.numOfSeasons || 1}
              </div>
              <div>
                <span className="text-gray-400">Release Date:</span>{' '}
                {new Date(series.releaseDate).toLocaleDateString()}
              </div>
              <div>
                <span className="text-gray-400">Director:</span> {series.director}
              </div>
              {series.writer && (
                <div>
                  <span className="text-gray-400">Writer:</span> {series.writer}
                </div>
              )}
              {series.language && (
                <div>
                  <span className="text-gray-400">Language:</span> {series.language}
                </div>
              )}
            </div>
            {series.cast && series.cast.length > 0 && (
              <div>
                <span className="text-gray-400">Cast:</span>{' '}
                {series.cast.join(', ')}
              </div>
            )}
            <p className="text-gray-300 leading-relaxed">{series.description}</p>
          </div>

          {series.seriesImages && series.seriesImages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {series.seriesImages.map((img, idx) => {
                  const imgUrl = img.startsWith('http')
                    ? img
                    : `http://localhost:3000/uploads/${img}`
                  return (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`${series.name} ${idx + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      {episodes.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Episodes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {episodes.map((episode) => {
              const videoUrl = episode.videos?.[0]?.video?.startsWith('http')
                ? episode.videos[0].video
                : `http://localhost:3000/uploads/${episode.videos?.[0]?.video}`
              return (
                <div
                  key={episode._id}
                  className="bg-slate-800 p-4 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {episode.name || `Episode ${episode.episodeNumber || ''}`}
                  </h3>
                  {episode.description && (
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                      {episode.description}
                    </p>
                  )}
                  {episode.videos && episode.videos.length > 0 && (
                    <video
                      controls
                      className="w-full rounded"
                      src={videoUrl}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

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

export default SeriesDetail

