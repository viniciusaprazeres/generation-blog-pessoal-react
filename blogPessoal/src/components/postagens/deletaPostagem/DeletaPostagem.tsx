import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  Box,
  CardActions,
  CardContent,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Tema } from "../../../models/Tema";
import { Postagem } from "../../../models/Postagem";
import { TokenState } from "../../../store/tokens/tokensReducer";

import { getId, deleteId } from "../../../services/Service";

import "./DeletaPostagem.css";


function DeletaPostagem() {

  const history = useNavigate();
  
  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );
  
  const { id } = useParams<{ id: string }>();

  const [postagem, setPostagem] = useState<Postagem>();

  useEffect(() => {
    if (token === "") {
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
      history("/login");
    }
  }, []);

  async function getPostagemById(id: string) {
    await getId(`/postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      getPostagemById(id);
    }
  });

  function deletarPostagem() {
    deleteId(`/postagens/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    toast.success('Postagem deletada com sucesso!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    history("/postagens");
  }

  function voltar() {
    history("/postagens");
  }

  return (
    <>
      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={4}>
          <Card variant="outlined">
            <Typography variant="h3" gutterBottom align="center">
              Deletar Postagem
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Você tem certeza de que deseja deletar a postagem com título:{" "}
              <br /> <strong>{postagem?.titulo}</strong>{" "}
            </Typography>

            <Box display="flex">
              <Button
                variant="contained"
                color="primary"
                onClick={voltar}
                fullWidth
              >
                Não
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={deletarPostagem}
                fullWidth
              >
                Sim
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default DeletaPostagem;
