import Input from '../Input/index'
import styled from 'styled-components'
import { useState } from 'react'
import React from 'react'
import { useEffect } from 'react'
import { getLivros } from '../../servicos/livros'
import { postFavorito } from '../../servicos/favoritos'
import img from '../../imagens/livro.png'

const PesquisaContainer = styled.section`
    background: #000;
    color: #FFF;
    text-align: center;
    padding: 85px 0;
    height: 470px;
    width: 100%;
`

const Titulo = styled.h2`
    color: #FFF;
    font-size: 36px;
    text-align: center;
    width: 100%;
`

const Subtitulo = styled.h3`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 40px;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`

function Pesquisa() {
    const [livrosPesquisados, setLivrosPesquisados] = useState([])
    const [ livros, setLivros] = useState([])

    useEffect(() => {
        fetchLivros()
    }, [])

    async function fetchLivros() {
        const livrosDaAPI = await getLivros()
        setLivros(livrosDaAPI)
    }

    async function insertFavorito(id){
        try{
        await postFavorito(id)
        alert(`Livro de id:${id} inserido com sucesso`)
        } catch (error) {
            console.error('Houve um problema com a chamada postFavorito: ', error)
        }
    }

    return (
        <PesquisaContainer>
            <Titulo>Já sabe por onde começar?</Titulo>
            <Subtitulo>Encontre seu livro em nossa estante.</Subtitulo>
            <Input
                placeholder="Escreva sua próxima leitura"
                onKeyUp={(evento)=> {
                    const textoDigitado = evento.target.value
                    const resultadoPesquisa = livros.filter( livro => livro.nome.includes(textoDigitado))
                    setLivrosPesquisados(resultadoPesquisa)
                }}
            />
            { 
                livrosPesquisados.map( livro => (
                    <Resultado onClick={() => insertFavorito(livro.id)}>
                        <img src={img} alt='livro'/>
                        <p>{livro.nome}</p>
                    </Resultado>
            ) ) 
            }
        </PesquisaContainer>
    )
}

export default Pesquisa