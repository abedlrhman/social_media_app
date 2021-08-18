import React from 'react'
import RightSide from './rightSide'
import LeftSide from './leftSide'
import Content from './content'
import styled from 'styled-components'


function Home() {

    
    
    return (
        <Container>
            <LeftSide />
            <Content />
            <RightSide />
        </Container>
    )
}

export default Home

const Container = styled.div`
display: flex;
justify-content: space-between;
width: 80%;
margin: auto;
`