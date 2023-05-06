import React, { ChangeEvent, useState, useEffect } from 'react'
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import UsuarioLogin from '../../models/UsuarioLogin';

import { login } from '../../services/Service';
import { addId, addToken } from '../../store/tokens/action';

import './Login.css'


function Login() {

  const history = useNavigate();

  const dispatch = useDispatch();

  const [token, setToken] = useState('')

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
  {
    id: 0,
    usuario: '',
    senha: '',
    token:''
  })

  const [respostaUsuarioLogin, setRespostaUsuarioLogin] = useState<UsuarioLogin>({
    id: 0,
    usuario: '',
    senha: '',
    token:''
  })

  function updateModel(event: ChangeEvent<HTMLInputElement>){
    setUsuarioLogin({
      ...usuarioLogin,
      [event.target.name]: event.target.value
    })
  }

  useEffect(() => {
    if(token !== ''){
      dispatch(addToken(token))
      history('/home')
    }
  }, [token])

  useEffect(() => {
    if(respostaUsuarioLogin.token !== ''){
      dispatch(addToken(respostaUsuarioLogin.token))
      dispatch(addId(respostaUsuarioLogin.id.toString()))
      history('/home')
    }
  }, [respostaUsuarioLogin.token])

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault()

    try {

      await login('/usuarios/logar', usuarioLogin, setRespostaUsuarioLogin)
      toast.success('Usuário logado com sucesso!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    } catch (error) {
      toast.warn('Dados do usuário inconsistentes. Não foi possível logar!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  return (
    <>
      <Grid container direction='row' justifyContent='center' alignItems='center'>
        <Grid xs={6} justifyContent='center' alignItems='center'>
          <Box paddingX={20}>
            <form onSubmit={onSubmit}>
              <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textoLogin'>Entrar</Typography>
              <TextField value={usuarioLogin.usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id='usuario' label='usuario' variant='outlined' name='usuario' margin='normal' fullWidth />
              <TextField value={usuarioLogin.senha} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel(event)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
              <Box marginTop={2} textAlign='center'>
                  <Button type='submit' variant='contained' className='botaoLogar'>
                    Logar
                  </Button>
              </Box>
            </form>
            <Box display={'flex'} justifyContent={'center'} marginTop={2}>
              <Box marginRight={1}>
                <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
              </Box>
                <Link to={'/cadastrousuario'}>
                  <Typography variant='subtitle1' gutterBottom align='center' className='textoLogin'>Cadastre-se</Typography>
                </Link>
            </Box>
          </Box>
        </Grid>

        <Grid xs={6} className="imagemLogin">
        </Grid>
      
      </Grid>
    </>
  )
}

export default Login