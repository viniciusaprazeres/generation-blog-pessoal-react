import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Button,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import useLocalStorage from 'react-use-localstorage';

import { Postagem } from '../../../models/Postagem';
import { Tema } from '../../../models/Tema';

import { getAll, getId, put, post } from '../../../services/Service';

import './CadastroPostagem.css';


function CadastroPostagem() {

  const history = useNavigate();

  const [token, setToken] = useLocalStorage("token");

  const { id } = useParams<{ id: string }>();
  
  const [temas, setTemas] = useState<Tema[]>([]);

  const [postagem, setPostagem] = useState<Postagem>({
    id: 0,
    titulo: "",
    texto: "",
    data: "",
    tema: null,
  });

  const [tema, setTema] = useState<Tema>({
    id: 0,
    descricao: "",
  });

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
  });

  function updateModel(event: ChangeEvent<HTMLInputElement>) {
    setPostagem({
      ...postagem,
      [event.target.name]: event.target.value,
      tema: tema,
    });
  }

  async function getAllTemas() {
    await getAll("/temas", setTemas, {
      headers: {
        Authorization: token,
      },
    });
  }

  async function findByIdPostagem(id: string) {
    await getId(`postagens/${id}`, setPostagem, {
      headers: {
        Authorization: token,
      },
    });
  }

  useEffect(() => {
    getAllTemas();
    if (id !== undefined) {
      findByIdPostagem(id);
    }
  }, [id]);

  useEffect(() => {
    setPostagem({
      ...postagem,
      tema: tema,
    });
  }, [tema]);

  async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    if (id !== undefined) {
      try {
        await put("/postagens", postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Postagem atualizada com sucesso!', {
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
      } catch (error) {
        toast.error('Falha ao atualizar a postagem!', {
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
    } else {
      try {
        await post("/postagens", postagem, setPostagem, {
          headers: {
            Authorization: token,
          },
        });
        toast.success('Postagem cadastrada com sucesso!', {
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
      } catch (error) {
        toast.error('Falha ao cadastrar a postagem!', {
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
  }

  return (
    <>
      <Container maxWidth={"sm"}>
        <form className="cadastroPost" onSubmit={onSubmit}>
          <Typography marginTop={4} variant="h3" align="center">
            Cadastrar postagem
          </Typography>
          <TextField
            value={postagem.titulo}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
            label="Titulo da postagem"
            name="titulo"
            id="titulo"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={postagem.texto}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              updateModel(event)
            }
            label="Texto da postagem"
            name="texto"
            id="texto"
            variant="outlined"
            fullWidth
            multiline
            minRows={4}
          />

          <FormControl>
            <InputLabel>Tema</InputLabel>
            <Select
              variant="standard"
              onChange={(event) =>
                getId(`/temas/${event.target.value}`, setTema, {
                  headers: { Authorization: token },
                })
              }
            >
              {temas.map((tema) => (
                <MenuItem value={tema.id}>{tema.descricao}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Escolha um tema para a sua postagem</FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={tema.id === 0}
          >
            {tema.id === 0 ? "selecione um tema" : "cadastrar"}
          </Button>
        </form>
      </Container>
    </>
  );
}

export default CadastroPostagem;
