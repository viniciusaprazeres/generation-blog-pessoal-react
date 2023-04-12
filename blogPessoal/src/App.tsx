import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/navbar/Navbar.css'
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer'
import Home from './components/home/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  )
}

export default App
