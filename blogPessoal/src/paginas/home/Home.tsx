import React, { useEffect } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Box } from "@mui/material";

import TabPostagens from "../../components/postagens/tabPostagens/TabPostagens";
import ModalPostagem from "../../components/postagens/modalPostagem/ModalPostagem";

import "./Home.css";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";

function Home() {
  
  let navigate = useNavigate();
  
  const [token, setToken] = useLocalStorage("token");

  useEffect(() => {
    if (token == "") {
      alert("Você precisa estar logado.");
      navigate("/login");
    }
  }, [token]);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
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
              style={{ color: "white", fontWeight: "bold" }}
            >
              Seja bem vindo(a)!
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              color="textPrimary"
              component="h5"
              align="center"
              style={{ color: "white", fontWeight: "bold" }}
            >
              expresse aqui os seus pensamentos e opiniões!
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box marginRight={1}>
              <ModalPostagem />
            </Box>
            <Button
              variant="outlined"
              style={{
                borderColor: "white",
                backgroundColor: "var(--blue-600)",
                color: "white",
              }}
            >
              Ver Postagens
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://i.imgur.com/XEmGzkd.png"
            alt=""
            className="fotoHome"
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
