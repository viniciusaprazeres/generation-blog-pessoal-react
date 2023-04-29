import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Usuario from "../../models/Usuario";

import { TokenState } from "../../store/tokens/tokensReducer";
import { getId } from "../../services/Service";


function Perfil() {
    
  const history = useNavigate();
  
  const userId = useSelector<TokenState, TokenState["id"]>((state) => state.id);

  const token = useSelector<TokenState, TokenState["token"]>(
    (state) => state.token
  );

  const [usuario, setUsuario] = useState<Usuario>({
    id: +userId,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
  });

  async function getUsuarioById(id: number) {
    await getId(`/usuarios/${id}`, setUsuario, {
      headers: { Authorization: token },
    });
  }

  useEffect(() => {
    getUsuarioById(+userId);
  }, []);

  useEffect(() => {
    if (token === "") {
      toast.warn("Você precisa estar logado!", {
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
      <Container>
        <Grid container marginTop={5}>
          <Grid xs={3} alignItems={"center"} justifyContent={"center"}>
            <Avatar
              src={usuario.foto}
              alt={""}
              style={{ width: "15rem", height: "15rem", margin: "0 auto" }}
            />
            <Typography variant="h5" align="center">
              {usuario.nome}
            </Typography>
          </Grid>
          <Grid xs={9} justifyContent={"center"}>
            <Typography variant="h4" align="center">
              Postagens de {usuario.nome}
            </Typography>
            Você tem um total de {usuario.postagem?.length} postagens feitas.
            {usuario.postagem?.map((postagem) => (
              <p>{postagem.titulo}</p>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Perfil;
