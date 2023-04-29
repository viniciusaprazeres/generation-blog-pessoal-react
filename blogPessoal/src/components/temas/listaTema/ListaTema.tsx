import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { Tema } from '../../../models/Tema';

import { getAll } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReducer';

import './ListaTema.css'

function ListaTema() {

  const history = useNavigate()

  const [temas, setTemas] = useState<Tema[]>([])

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

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