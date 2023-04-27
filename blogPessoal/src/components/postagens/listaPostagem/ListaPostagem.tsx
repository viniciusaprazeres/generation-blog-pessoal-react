import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { TokenState } from '../../../store/tokens/tokensReducer';

import { Postagem } from '../../../models/Postagem' 

import { getAll } from '../../../services/Service'

import './ListaPostagem.css'

function ListaPostagem() {

  const history = useNavigate()

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const [postagens, setPostagens] = useState<Postagem[]>([])

  async function getAllPostagens() {
    await getAll('/postagens', setPostagens, {
      headers: {
        Authorization: token,
      }
    })
  }


  useEffect(() => {
    getAllPostagens()
  }, [postagens.length])


  useEffect(() => {
    if (token === '') {
      toast.warn('Você precisa estar logado!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      history('/login')
    }
  }, [token])


  return (
    <div className='listaPost'>
      {postagens.map((post) => (
        <Box m={4} >
          <Card variant='outlined' style={{padding: '8px'}}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {post.titulo}
              </Typography>
              <Typography variant="h5" component="h2">
                {post.texto}
              </Typography>
              <Typography variant="body1" component="p">
                Tema: {post.tema?.descricao}
              </Typography>
              <Typography variant="body1" component="p">
                {/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat */}
                Data: {Intl.DateTimeFormat('pt-BR', {dateStyle: 'full', timeStyle: 'medium'}).format(new Date(post.data))}
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/editarpostagem/${post.id}`}>
              <Button color="primary" variant="contained" size="small" fullWidth>
                Editar
              </Button>
              </Link>
              <Link to={`/deletarpostagem/${post.id}`}>
              <Button color="error" variant="contained" size="small" fullWidth>
                Deletar
              </Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </div>
  )
}

export default ListaPostagem