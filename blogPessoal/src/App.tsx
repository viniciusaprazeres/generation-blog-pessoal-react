import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer'
import Home from './paginas/home/Home';
import Login from './paginas/login/Login'
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTemas from './components/temas/listaTemas/ListaTemas';
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens';

import './App.css'
import './components/estaticos/navbar/Navbar.css'



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
          <Route path='/cadastrousuario' element={<CadastroUsuario />} />
          <Route path='/temas' element={<ListaTemas />} />
          <Route path='/postagens' element={<ListaPostagens />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
