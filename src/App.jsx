import './App.css'
import { useState, useEffect } from 'react'

const n = 123
export default function App() {
  return (    
    <div className="dashboard">
      <h1>Ashot Apoyan</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic accusamus officiis aut inventore sit, suscipit consequuntur reiciendis error maiores excepturi eos, laudantium repellat incidunt obcaecati itaque, animi ratione! Vitae, officiis!</p>
    <ISSCard/>
    <A/>
    <Counter/>
    <ISSTracker/>
    <PeopleInSpace/>
    <APOD/>
    <SolarSystem/>
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
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(r => r.json())
      .then(data => setLocation(data))
}, [])
return (
  <div className="card">
    <h2>ISS Position</h2>
    {location? (
      <p>{location.latitude.toFixed(2)}, {location.longitude.toFixed(2)}</p> 
    ) : (
    <p>Loading...</p>
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
  return(
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

function APOD() {
  const [pic, setPic] = useState(null)

  useEffect(() => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
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
            ? <img src={pic.url} alt={pic.title} style={{width: '100%'}} />
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