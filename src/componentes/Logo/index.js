import logo from '../../imagens/logo.png'
import styled from 'styled-components'
import React from 'react'

const LogoContainer = styled.div`
    display: flex;
    font-size: 30px;
    height: 70px;
`

const LogoImage = styled.img`
    margin-right: 10px;
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage
                src={logo}
                alt='logo' 
            />
            <p><strong></strong> Library</p>
       </LogoContainer>
    )
}

export default Logo