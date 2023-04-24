import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Card, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "react-use-localstorage";
import { Tema } from "../../../models/Tema";
import { deleteId, getId } from "../../../services/Service";

function DeletarTema() {
  const history = useNavigate();
  const [token, setToken] = useLocalStorage("token");
  const { id } = useParams<{ id: string }>();

  const [tema, setTema] = useState<Tema>();

  useEffect(() => {
    if (token === "") {
      alert("Sem token não né meu bom");
      history("/login");
    }
  }, []);

  async function getTemaById(id: string) {
    await getId(`/temas/${id}`, setTema, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    if (id !== undefined) {
      getTemaById(id);
    }
  });

  function deletarTema() {
    deleteId(`/temas/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    alert("Tema deletado com sucesso, eu acho");
    history("/temas");
  }

  function voltar() {
    history("/temas");
  }

  return (
    <>
      <Grid container justifyContent={"center"} mt={4}>
        <Grid item xs={3}>
          <Card variant="outlined">
            <Typography variant="h3" gutterBottom align="center">
              Deletar tema
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              Você tem certeza de que deseja deletar o tema: <br />{" "}
              <strong>{tema?.descricao}</strong>{" "}
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
                onClick={deletarTema}
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

export default DeletarTema;
