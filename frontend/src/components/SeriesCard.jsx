import { Link } from 'react-router-dom'

const SeriesCard = ({ series }) => {
  const posterUrl = series.poster?.startsWith('http')
    ? series.poster
    : `http://localhost:3000/uploads/${series.poster}`

  return (
    <Link
      to={`/series/${series._id}`}
      className="group block bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="relative overflow-hidden">
        <img
          src={posterUrl || '/placeholder-poster.jpg'}
          alt={series.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x400?text=No+Poster'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 line-clamp-1">{series.name}</h3>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>IMDB: {series.imdb}</span>
          <span>Seasons: {series.numOfSeasons || 1}</span>
        </div>
        {series.genre && series.genre.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {series.genre.slice(0, 3).map((genre, idx) => (
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

export default SeriesCard

