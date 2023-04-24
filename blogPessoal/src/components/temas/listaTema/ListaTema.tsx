import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Tema } from '../../../models/Tema';
import { getAll } from '../../../services/Service';
import useLocalStorage from 'react-use-localstorage';

import './ListaTema.css'

function ListaTema() {

  const history = useNavigate()

  const [temas, setTemas] = useState<Tema[]>([])

  const [token, setToken] = useLocalStorage('token')


  async function getAllTemas() {
    await getAll('/temas', setTemas, {
      headers: {
        Authorization: token
      }
    })
  }


  useEffect(() => {
    getAllTemas()
  }, [temas.length])


  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado!')
      history('/login')
    }
  }, [token])


  return (
    <>
      {temas.map((tema) => (
        <Box m={4}>
          <Card >
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Tema:
              </Typography>
              <Typography variant="h5" component="h2">
                {tema.descricao}
              </Typography>

            </CardContent>
            <CardActions>
              <Link to={`/atualizartema/${tema.id}`} className='text-decoration-none'> {/* O link pode estar incorreto no back-end! */}
                <Button color='primary' variant='contained' size="small">Atualizar</Button>
              </Link>
              <Link to={`/deletartema/${tema.id}`} className='text-decoration-none'> {/* O link pode estar incorreto no back-end! */}
                <Button color='secondary' variant='contained' size="small">Deletar</Button>
              </Link>
            </CardActions>
          </Card>
        </Box>
      ))}
    </>
  )
}

export default ListaTema