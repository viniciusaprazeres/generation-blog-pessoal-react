import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import {Box} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/action';

import './Navbar.css'

function Navbar() {

  const history = useNavigate()

  const dispatch = useDispatch();

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  function logout() {
    dispatch(addToken(''))
    alert('Usuário deslogado.')
    history('/login')
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Box display={'flex'} justifyContent={'space-between'} width={'100%'}>
            <Box className='cursor'>
              <Typography variant="h5" color="inherit">
                BlogPessoal
              </Typography>
            </Box>

            <Box display="flex" justifyContent="start" className='text-decoration-none'>
              <Link to={'/home'}>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    Home
                  </Typography>
                </Box>
              </Link>

              <Link to={'/postagens'} className='text-decoration-none'>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    Postagens
                  </Typography>
                </Box>
              </Link>


              <Link to={'/temas'} className='text-decoration-none'>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    Temas
                  </Typography>
                </Box>
              </Link>

              <Link to={'/cadastrartema'} className='text-decoration-none'>
                <Box mx={1} className='cursor'>
                  <Typography variant="h6" color="inherit">
                    Cadastrar Tema
                  </Typography>
                </Box>
              </Link>

              <Box mx={1} className='cursor' onClick={logout}>
                <Typography variant="h6">
                  Logout
                </Typography>
              </Box>

            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar