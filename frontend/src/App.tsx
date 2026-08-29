import { useState, useEffect } from 'react'

interface Joke {
  type: string;
  setup: string;
  punchline: string;
  id: number;
}

function App() {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchJoke = async () => {
    setLoading(true)
    setError(null)
    try {
      // Connect to the backend
      const response = await fetch("/api/joke");
      if (!response.ok) {
        throw new Error('Failed to fetch joke')
      }
      const data = await response.json()
      setJoke(data)
    } catch (err) {
      console.error(err)
      setError('Oops! Failed to connect to the backend.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch a joke on initial load
  useEffect(() => {
    fetchJoke()
  }, [])

  return (
    <div className="comic-container">
      <h1 className="title">Jokes!</h1>
      
      <div className="speech-bubble">
        {loading ? (
          <div className="loader">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
          </div>
        ) : error ? (
          <p className="setup">{error}</p>
        ) : joke ? (
          <>
            <p className="setup">{joke.setup}</p>
            <p className="punchline">{joke.punchline}</p>
          </>
        ) : (
          <p className="setup">Ready for a laugh?</p>
        )}
      </div>

      <button 
        className="comic-button" 
        onClick={fetchJoke}
        disabled={loading}
      >
        {loading ? 'WAIT...' : 'GIMME ANOTHER!'}
      </button>
    </div>
  )
}

export default App
