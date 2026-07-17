import { useEffect, useState } from 'react'
import api from '../services/api'
import SeriesCard from '../components/SeriesCard'

const Series = () => {
  const [series, setSeries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchSeries()
  }, [])

  const fetchSeries = async () => {
    try {
      const response = await api.get('/api/series')
      setSeries(response.data.series || [])
    } catch (error) {
      console.error('Error fetching series:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSeries = series.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">All Series</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search series..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      {filteredSeries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSeries.map((seriesItem) => (
            <SeriesCard key={seriesItem._id} series={seriesItem} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-400">No series found</p>
        </div>
      )}
    </div>
  )
}

export default Series

