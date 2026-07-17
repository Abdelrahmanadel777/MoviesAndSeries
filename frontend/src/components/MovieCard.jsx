import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster?.startsWith('http')
    ? movie.poster
    : `http://localhost:3000/uploads/${movie.poster}`

  return (
    <Link
      to={`/movies/${movie._id}`}
      className="group block bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden">
        <img
          src={posterUrl || '/placeholder-poster.jpg'}
          alt={movie.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Poster'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{movie.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>IMDB: {movie.imdb}</span>
          <span>{new Date(movie.releaseDate).getFullYear()}</span>
        </div>
        {movie.genre && movie.genre.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genre.slice(0, 3).map((genre, idx) => (
              <span
                key={idx}
                className="text-xs bg-primary-600 px-2 py-1 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

export default MovieCard

