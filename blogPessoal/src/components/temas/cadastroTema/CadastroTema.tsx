import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from 'react-use-localstorage'
import { Tema } from '../../../models/Tema';
import { post } from '../../../services/Service';

function CadastroTema() {

    const history = useNavigate()

    const [token, setToken] = useLocalStorage('token')

    const [tema, setTema] = useState<Tema>({

        id: 0,
        descricao: ''

    })

    useEffect(() => {
        if (token === '') {
            alert('O token não existe!')
            history('/login')
        }
    }, [])

    function updateModel(event: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [event.target.name]: event.target.value
        })
    }

    async function onSubmit(event: ChangeEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            await post('/temas', tema, setTema, {
                headers: {
                    Authirization: token
                }
            })
            alert('Tema cadastrado com sucesso!')
        } catch (error) {
            alert('O tema não foi cadastrado. Revise os campos antes de enviar novamente!')
        }

    }

    useEffect(() => {
        if (tema.id !== 0) {
            history('/temas')
        }
    }, [tema.id])

    return (
        <>
            <h2>Cadastrar Temas</h2>
            <form onSubmit={onSubmit}>
                <TextField label='Descrição do tema' name='descricao' value={tema.descricao} onChange={(event: ChangeEvent<HTMLInputElement>) => updateModel} />
                <Button type='submit' variant='contained'>Cadastrar tema</Button>
            </form>
        </>
    )
}

export default CadastroTema