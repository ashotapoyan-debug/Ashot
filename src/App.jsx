import './App.css'
import { useState, useEffect } from 'react'

export default function App() {
  return (
    <div className="dashboard">
      <h1>Ashot Apoyan</h1>
      <h1></h1>
      {/* Cards wrapped in the grid div for clean layout */}
      <div className="grid">
        <Counter />
        <ISSTracker />
        <PeopleInSpace />
        <Asteroids />
        <Constellations /> {/* New English Constellations Section */}
        <NextLaunch />
        <APOD />
      </div>

      <div className="card solar-system">
        <h2> Solar System </h2>
        <iframe
          src="https://eyes.nasa.gov/apps/solar-system/#/home"
          title="NASA Solar System"
        />
      </div>
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className="card">
      <h2>Counter</h2>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  )
}

function ISSTracker() {
  const [location, setLocation] = useState(null)
  useEffect(() => {
    const fetchISS = () => {
      fetch('https://api.wheretheiss.at/v1/satellites/25544')
        .then(r => {
          if (!r.ok) throw new Error("Rate limited");
          return r.json();
        })
        .then(data => setLocation(data))
        .catch(err => console.warn(err));
    }
    const interval = setInterval(fetchISS, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='card'>
      <h2> ISS Live Tracker </h2>
      {location ? (
        <div>
          <p>Latitude: {location.latitude.toFixed(2)}</p>
          <p>Longitude: {location.longitude.toFixed(2)}</p>
          <p>Speed: {location.velocity.toFixed(0)} km/h</p>
          <p>Altitude: {location.altitude.toFixed(0)} km</p>
        </div>
      ) : (
        <p>Loading ISS...</p>
      )}
    </div>
  )
}

function PeopleInSpace() {
  const [people, setPeople] = useState(null)
  useEffect(() => {
    fetch('http://api.open-notify.org/astros.json')
      .then(r => r.json())
      .then(data => setPeople(data.people))
  }, [])

  return (
    <div className="card">
      <h2>People in Space</h2>
      {people ? (
        <ul>
          {people.map(person => (
            <li key={person.name}>
              {person.name} - {person.craft}
            </li>
          ))}
        </ul>
      ) : (<p>Loading...</p>)}
    </div>
  )
}

function Asteroids() {
  const [rocks, setRocks] = useState(null)
  const [selectedRock, setSelectedRock] = useState(null)

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => {
        setRocks(data.near_earth_objects[today])
      })
  }, [])

  return (
    <div className="space-card">
      <div className="card-header">
        <div className="header-title">
          <span> ASTEROIDS TODAY </span>
        </div>
      </div>

      {rocks ? (
        <div className="asteroid-list">
          {rocks.slice(0, 5).map(rock => (
            <div key={rock.id} className="asteroid-row">
              <div className="asteroid-info">
                <span className="asteroid-name">{rock.name}</span>
                <span className="asteroid-size">
                  Max Diameter: {rock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}m
                </span>
              </div>
              <button
                className={`hazard-badge ${rock.is_potentially_hazardous_asteroid ? "danger" : "safe"}`}
                onClick={() => setSelectedRock(rock)}
              >
                {rock.is_potentially_hazardous_asteroid ? "Hazardous" : "Safe"}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="shimmer-loader">
          Calculating near-Earth trajectories...
        </div>
      )}

      {selectedRock && (
        <div className="asteroid-popup-overlay" onClick={() => setSelectedRock(null)}>
          <div className="asteroid-popup" onClick={(e) => e.stopPropagation()}>
            <img src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564" alt={selectedRock.name} />
            <h2>{selectedRock.name}</h2>
            <p>Diameter: {selectedRock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}m</p>
            <p>Speed: {parseFloat(selectedRock.close_approach_data[0].relative_velocity.kilometers_per_hour).toFixed(0)} km/h</p>
            <p>Miss Distance: {parseFloat(selectedRock.close_approach_data[0].miss_distance.kilometers).toFixed(0)} km</p>
            <button onClick={() => setSelectedRock(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

function APOD() {
  const [pic, setPic] = useState(null)
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_KEY}`)
      .then(r => r.json())
      .then(data => setPic(data))
  }, [])

  return (
    <div className="card">
      <h2>Picture of the Day</h2>
      {pic ? (
        <div>
          <h3>{pic.title}</h3>
          {pic.media_type == 'image'
            ? <img src={pic.url} alt={pic.title} style={{ width: '100%' }} />
            : <a href={pic.url} target="_blank" rel="noreferrer">Watch video</a>
          }
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}

// ==========================================
//          CONSTELLATIONS COMPONENT
// ==========================================
function Constellations() {
  const [selectedConst, setSelectedConst] = useState(null)

  const constellationsData = [
    {
      id: "ursa-major",
      name: "Great Bear",
      latin: "Ursa Major",
      brightestStar: "Alioth",
      season: "Spring",
      description: "One of the most famous constellations in the northern sky. Its seven brightest stars form the iconic 'Big Dipper' asterism."
    },
    {
      id: "orion",
      name: "Orion",
      latin: "Orion",
      brightestStar: "Rigel",
      season: "Winter",
      description: "A prominent constellation located on the celestial equator. It is easily recognized globally by the three stars forming 'Orion's Belt'."
    },
    {
      id: "cassiopeia",
      name: "Cassiopeia",
      latin: "Cassiopeia",
      brightestStar: "Schedar",
      season: "Autumn",
      description: "A northern sky constellation named after the vain queen in Greek mythology. It is easily found thanks to its distinct 'W' shape."
    },
    {
      id: "taurus",
      name: "Taurus",
      latin: "Taurus",
      brightestStar: "Aldebaran",
      season: "Winter",
      description: "An ancient zodiac constellation. It features a distinct V-shaped head and hosts two magnificent star clusters: the Pleiades and the Hyades."
    }
  ]

  return (
    <div className="card">
      <h2>Constellations</h2>
      <div className="constellation-list">
        {constellationsData.map(constellation => (
          <div 
            key={constellation.id} 
            className="constellation-row"
            onClick={() => setSelectedConst(constellation)}
          >
            <div>
              <span className="constellation-name">{constellation.name}</span>
              <span className="constellation-latin"> ({constellation.latin})</span>
            </div>
            <span className="constellation-badge">{constellation.season}</span>
          </div>
        ))}
      </div>

      {/* Reusing your existing interactive popup styles */}
      {selectedConst && (
        <div className="asteroid-popup-overlay" onClick={() => setSelectedConst(null)}>
          <div className="asteroid-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-padding">
              <h2 style={{ padding: '0 0 10px 0' }}>{selectedConst.name}</h2>
              <p className="label">{selectedConst.latin}</p>
              <hr style={{ borderColor: 'rgba(74, 222, 128, 0.2)', margin: '15px 0' }} />
              <p><strong>Brightest Star:</strong> {selectedConst.brightestStar}</p>
              <p><strong>Best Visibility:</strong> {selectedConst.season}</p>
              <p style={{ marginTop: '10px', lineHeight: '1.6' }}>{selectedConst.description}</p>
              <button onClick={() => setSelectedConst(null)} style={{ marginTop: '20px', width: '100%', margin: '20px 0 0 0' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function NextLaunch() {
  const [launch, setLaunch] = useState(null)
  const [countdown, setCountdown] = useState('')

  useEffect(() => {
    fetch('https://lldev.thespacedevs.com/2.2.0/launch/upcoming/?limit=1&ordering=net&format=json')
      .then(r => r.json())
      .then(data => {
        const l = data.results?.[0]
        if (l) setLaunch(l)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!launch) return
    function tick() {
      const now = Date.now()
      const target = new Date(launch.net).getTime()
      const diff = target - now
      if (diff <= 0) { setCountdown('LAUNCH!'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(`${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(s).padStart(2, '0')}s`)
    }
    tick()
    const timer = setInterval(tick, 1000)
    return () => clearInterval(timer)
  }, [launch])

  return (
    <div className="card">
      <h2>🚀 Next Rocket Launch</h2>
      {launch ? (
        <div className="launch-content">
          <div className="launch-name">{launch.name}</div>
          <div className="launch-provider">{launch.launch_service_provider?.name}</div>
          <div className="launch-pad">📍 {launch.pad?.location?.name}</div>
          <div className="launch-countdown">{countdown}</div>
          <div className="label">{new Date(launch.net).toUTCString()}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
