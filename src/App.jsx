import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <div className="bg-red-600">Your Todo is here</div>
    </>
  )
}

export default App
