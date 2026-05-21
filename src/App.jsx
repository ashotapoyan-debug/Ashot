import './App.css'
import { useState } from 'react'

const n = 123
export default function App() {
  return (    
    <div className="dashboard">
      <h1>Ashot Apoyan</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic accusamus officiis aut inventore sit, suscipit consequuntur reiciendis error maiores excepturi eos, laudantium repellat incidunt obcaecati itaque, animi ratione! Vitae, officiis!</p>
    <ISSCard/>
    <A/>
    <Counter/>
    
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
//function ISSTracker() {
//  const [location, setLocation] = useState(null)
//  useEffect(() => {
//    fetch('https://api.wheretheiss.at/v1/satellites/25544')
//      .then(r => r.json())
//      .then(data => setLocation(data))
//}, [])
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


function ISSCard() {
  return (
  <div className="Card">
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
