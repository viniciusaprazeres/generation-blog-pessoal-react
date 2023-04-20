import React, { useState, useEffect } from 'react'

import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material'

import './ListaPostagens.css'
import { Link, useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { getAll } from '../../../services/Service'
import { Postagem } from '../../../models/Postagem'

function ListaPostagens() {

  const history = useNavigate()

  const [postagens, setPostagens] = useState<Postagem[]>([])

  const [token, setToken] = useLocalStorage('token')


  async function getAllTemas() {
    await getAll('/postagens', setPostagens, {
      headers: {
        Authorization: token
      }
    })
  }


  useEffect(() => {
    getAllTemas()
  }, [postagens.length])


  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      history('/login')
    }
  }, [token])


  return (
    <>
      {postagens.map((postagem) => (
        <Box m={4}>
          <Card >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Postagens:
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {postagem.titulo}
              </Typography>
              <Typography variant="h5" component="h2">
                {postagem.texto}
              </Typography>
              <Typography variant="body1" component="p">
                {postagem.tema}
              </Typography>

            </CardContent>
            <CardActions>
              <Link to={`/atualizarpostagem/${postagem.id}`} className='text-decoration-none'> {/* O link pode estar incorreto no back-end! */}
                <Button color='primary' variant='contained' size="small">Atualizar</Button>
              </Link>
              <Link to={`/deletarpostagem/${postagem.id}`} className='text-decoration-none'> {/* O link pode estar incorreto no back-end! */}
                <Button color='secondary' variant='contained' size="small">Deletar</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  )
}

export default ListaPostagens