import React from 'react'
import styled from 'styled-components'
import ProfileShortcut from './profileShortcut'
import Suggestions from './suggestions'


function LeftSide() {
    return (
        <Container>
            <ProfileShortcut />
            <Suggestions />
        </Container>
    )
}

export default LeftSide

const Container = styled.div`
`