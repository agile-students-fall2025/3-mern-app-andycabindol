// src/About.js
import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'        // reuse your existing styles if you want
import loadingIcon from './loading.gif'

/**
 * About component modeled after the Messages template.
 * Fetches one About document from the backend and displays it.
 */
const About = () => {
  const [about, setAbout] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  // Normalize API response to a single object whether backend returns array or object
  const coerceAbout = apiAbout => {
    if (!apiAbout) return null
    if (Array.isArray(apiAbout)) return apiAbout[0] || null
    return apiAbout
  }

  const fetchAbout = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        const normalized = coerceAbout(response.data.about)
        setAbout(normalized)
        setError('')
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
      })
      .finally(() => {
        setLoaded(true)
      })
  }

  useEffect(() => {
    fetchAbout()

    // Optional polling (About rarely changes; 30s is enough)
    const intervalHandle = setInterval(fetchAbout, 30000)
    return () => clearInterval(intervalHandle)
  }, [])

  return (
    <>
      <h1>About Us</h1>

      {error && <p className="About-error">{error}</p>}
      {!loaded && <img src={loadingIcon} alt="loading" />} 

      {loaded && !error && !about && (
        <p className="About-empty">No About data found.</p>
      )}

      {about && (
        <section>
          <div>
            {about.picture ? (
              <img src={about.picture} style={{ width: 300}}/>) : <></>}
          </div>

          <div>
            <h2 style={{ margin: 0 }}>{about.name}</h2>
            {about.description && <p style={{ marginTop: '0.75rem' }}>{about.description}</p>}
          </div>
        </section>
      )}
    </>
  )
}

export default About
