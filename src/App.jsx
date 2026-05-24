import './App.css'
import { useState, useEffect } from 'react'

const n = 123
export default function App() {
  return (
    <div className="dashboard">
      <h1>Ashot Apoyan</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic accusamus officiis aut inventore sit, suscipit consequuntur reiciendis error maiores excepturi eos, laudantium repellat incidunt obcaecati itaque, animi ratione! Vitae, officiis!</p>
      <ISSCard />
      <A />
      <Counter />
      <ISSTracker />
      <PeopleInSpace />
      <Asteroids/>
      <APOD />
      <SolarSystem />
    </div>
  )
}
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
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
          <p>
            Time:{" "}
            {new Date(location.timestamp * 1000).toLocaleTimeString()}
          </p>
        </div>
      ) : (
        <p>Loading ISS...</p>
      )}
    </div>
  )
}

function ISSCard() {
  return (
    <div className="card">
      <h2>ISS </h2>
      <p>{n}</p>
    </div>
  )
}
function A() {
  return (
    <div className="Card">
      <h3>abcd</h3>
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
  const [rocks, setRocks] = useState(null);
  const [selectedRock, setSelectedRock] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];

    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${import.meta.env.VITE_NASA_KEY}`
    )
      .then(r => r.json())
      .then(data => {
        setRocks(data.near_earth_objects[today]);
      });
  }, []);

  return (
    <div className="space-card">
      <div className="card-header">
        <div className="header-title">
          <span>ASTEROIDS TODAY</span>
        </div>
      </div>

      {rocks ? (
        <div className="asteroid-list">
          {rocks.slice(0, 5).map(rock => (
            <div key={rock.id} className="asteroid-row">

              <div className="asteroid-info">
                <span className="asteroid-name">{rock.name}</span>

                <span className="asteroid-size">
                  Max Diameter:
                  {" "}
                  {rock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}m
                </span>
              </div>

              <button
                className={`hazard-badge ${
                  rock.is_potentially_hazardous_asteroid
                    ? 'danger'
                    : 'safe'
                }`}
                onClick={() => setSelectedRock(rock)}
              >
                {rock.is_potentially_hazardous_asteroid
                  ? 'Hazardous'
                  : 'Safe'}
              </button>

            </div>
          ))}
        </div>
      ) : (
        <div className="shimmer-loader">
          Calculating near-Earth trajectories...
        </div>
      )}

      {/* POPUP */}

      {selectedRock && (
        <div
          className="asteroid-popup-overlay"
          onClick={() => setSelectedRock(null)}
        >
          <div
            className="asteroid-popup"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://source.unsplash.com/600x400/?asteroid,space`}
              alt={selectedRock.name}
            />

            <h2>{selectedRock.name}</h2>

            <p>
              Diameter:
              {" "}
              {selectedRock.estimated_diameter.meters.estimated_diameter_max.toFixed(1)}
              m
            </p>

            <button onClick={() => setSelectedRock(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
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
            : <a href={pic.url} target="_blank">Watch video</a>
          }
        </div>
      ) : <p>Loading...</p>}
    </div>
  )
}
function SolarSystem() {
  return (
    <iframe
      src="https://eyes.nasa.gov/apps/solar-system/#/sc_osiris_rex?rate=1814400&time=2021-02-17T21:06:45.412+00:00"
      title="NASA"
      style={{
        width: "100%",
        height: "100vh",
        border: "none"
      }}
    />
  )
}
