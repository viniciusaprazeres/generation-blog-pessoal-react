import React, { useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import TabPostagens from "../../components/postagens/tabPostagens/TabPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

import { TokenState } from "../../store/tokens/tokensReducer";

import "./Home.css";

function Home() {
  const history = useNavigate();

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  useEffect(() => {
    if (token === "") {
      toast.warn('Você precisa estar logado.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      history("/login");
    }
  }, [token]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        className="caixa"
        style={{ backgroundColor: "var(--blue-600)" }}
      >
        <Grid alignItems="center" item xs={6}>
          <Box paddingX={20}>
            <Typography
              variant="h3"
              gutterBottom
              color="textPrimary"
              component="p"
              align="center"
              className="titulo"
            >
              Seja bem vindo(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              className="titulo"
            >
              Expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>
            <Link to="/postagens">
              <Button variant="outlined" className="botaoVerPostagens">
                Ver Postagens
              </Button>
            </Link>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://i.imgur.com/XEmGzkd.png"
            alt=""
            className="imagemHome"
          />
        </Grid>
        <Grid xs={12} style={{ backgroundColor: "white" }}>
          <TabPostagens />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
