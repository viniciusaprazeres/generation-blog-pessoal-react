import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './components/estaticos/navbar/Navbar';
import Footer from './components/estaticos/footer/Footer'
import Home from './paginas/home/Home';
import Login from './paginas/login/Login'
import CadastroUsuario from './paginas/cadastroUsuario/CadastroUsuario';
import ListaTema from './components/temas/listaTema/ListaTema';
import ListaPostagem from './components/postagens/listaPostagem/ListaPostagem';
import CadastroTema from './components/temas/cadastroTema/CadastroTema';
import CadastroPostagem from './components/postagens/cadastroPostagem/CadastroPostagem';
import DeletarTema from './components/temas/deletarTema/DeletarTema';

import './App.css'
import './components/estaticos/navbar/Navbar.css'

import store from './store/store';
import { Provider } from 'react-redux';




function App() {
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <div style={{ minHeight: '100vh' }}>
          <Routes>
          <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
            <Route path='/cadastrarUsuario' element={<CadastroUsuario />} />

            <Route path='/temas' element={<ListaTema />} />
            <Route path='/postagens' element={<ListaPostagem />} />
            
            <Route path='/cadastrarpostagem' element={<CadastroPostagem />} />
            <Route path='/editarpostagem/:id' element={<CadastroPostagem />} />
            <Route path='/deletarpostagem/:id' element={<CadastroPostagem />} />
            
            <Route path='/cadastrartema' element={<CadastroTema />} />
            <Route path='/editartema/:id' element={<CadastroTema />} />
            <Route path='/deletartema/:id' element={<DeletarTema />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    <Provider/>
  )
}

export default App
