import './App.css'
const n = 123
export default function App() {
  return (
    <div className="dashboard">
      <h1>Ashot Apoyan</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic accusamus officiis aut inventore sit, suscipit consequuntur reiciendis error maiores excepturi eos, laudantium repellat incidunt obcaecati itaque, animi ratione! Vitae, officiis!</p>
    <ISSCard/>
    <A/>
    </div>
  )
}
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
