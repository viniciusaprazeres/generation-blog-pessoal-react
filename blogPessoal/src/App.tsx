import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './components/estaticos/navbar/Navbar.css'
import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer'
import Home from './paginas/home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './paginas/login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ minHeight: '100vh' }}>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            {/* <Route path='/cadastro' element={<CadastroUsuario />} /> */}
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
