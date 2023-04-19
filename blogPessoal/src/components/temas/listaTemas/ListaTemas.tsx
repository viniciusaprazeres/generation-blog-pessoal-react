import React from 'react'

import { Link } from 'react-router-dom'
import { Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import { Box } from '@mui/material';

import './ListaTemas.css'

function ListaTemas() {
  return (
    <>
      <Box m={4}>
        <Card >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Tema:
            </Typography>
            <Typography variant="h5" component="h2">
              descrição do tema
            </Typography>

          </CardContent>
          <CardActions>
            <Button color='primary' variant='contained' size="small">Editar</Button>
            <Button color='secondary' variant='contained' size="small">Deletar</Button>
          </CardActions>
        </Card>
      </Box>
    </>
  )
}

export default ListaTemas