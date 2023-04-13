import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';

import './Navbar.css'

const pages = ['Home', 'Postagens', 'Temas', 'Logout'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


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

              <Box display="flex" justifyContent="start">
                  <Box mx={1} className='cursor'>
                      <Typography variant="h6" color="inherit">
                          home
                      </Typography>
                  </Box>
                  <Box mx={1} className='cursor'>
                      <Typography variant="h6" color="inherit">
                          postagens
                      </Typography>
                  </Box>
                  <Box mx={1} className='cursor'>
                      <Typography variant="h6" color="inherit">
                          temas
                      </Typography>
                  </Box>
                  <Box mx={1} className='cursor'>
                      <Typography variant="h6" color="inherit">
                          cadastrar tema
                      </Typography>
                  </Box>
                  <Link to='/login' className='text-decoration-none'>
                      <Box mx={1} className='cursor'>
                          <Typography variant="h6">
                              logout
                          </Typography>
                      </Box>
                  </Link>
              </Box>
            </Box>
          </Toolbar>
      </AppBar>
  </>
  )
}

export default Navbar