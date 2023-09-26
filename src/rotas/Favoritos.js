import styled from 'styled-components';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getFavoritos } from '../servicos/favoritos';
import { deleteFavorito } from '../servicos/favoritos';
import livroImg from '../imagens/livro.png'

const AppContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #000;
  }
`
const Titulo = styled.div`
color:#FFF;
font-size:36px;
text-align: center;
width:100%;
padding-top:35px;
`
const Resultado = styled.div`
display:flex;
justify-content:center;
align-items:center;
margin:20px 0;
cursor: pointer;
text-align:center;
padding: 0 100px;
p{
  width:200px;
  color: #fff;
}
&:hover{
  border:1px solid white;
}
`
const ResultadoContainer = styled.div`
display:flex;
flex-wrap: wrap;
justify-content:center;
`
function Favoritos() {
  const [favoritos, setFavoritos] = useState([])
  
  async function fetchFavorito(){
    const favoritosDaApi = await getFavoritos()
    setFavoritos(favoritosDaApi)
  }
  async function deletarFavorito(id){
    await deleteFavorito(id)
    await fetchFavorito()
    alert(`livro de id ${id} deletado!`)
  }
  useEffect(()=>{
    fetchFavorito()
  }, [])
  return (
    <AppContainer>
      <Titulo>Aqui estão seus livros favoritos</Titulo>
      <ResultadoContainer>
      {favoritos.map( favorito => (
        <Resultado onClick={()=> deletarFavorito(favorito.id)}>
            <img src={livroImg} alt=''/>
            <p>{favorito.nome}</p>
        </Resultado>
        ))}
      </ResultadoContainer>
       
    </AppContainer> 
  );
}  
export default Favoritos