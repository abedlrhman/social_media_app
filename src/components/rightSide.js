import React from 'react'
import styled from 'styled-components'
import TopJobs from './topJobs'
import PayTheWorkers from './payTheWorkers'

function RightSide() {
    return (
        <Container>
            <PayTheWorkers />
            <TopJobs />
        </Container>
    )
}

export default RightSide

const Container = styled.div`
`
