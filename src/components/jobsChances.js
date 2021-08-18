import React from 'react'
import styled from 'styled-components'

function jobsChances(props) {
  return (
    <Container>
      <JobInfo>
        <h2>{props.title}</h2>
        <p>{props.desc}</p>
      </JobInfo>
      <Price>
        <span>{props.price}</span>
      </Price>
    </Container>
  )
}

export default jobsChances

const Container = styled.div`
  width: 300px;
  display: flex;
  border-bottom: 1px solid #ccc;
`

const JobInfo = styled.div`
  padding: 15px;

  h2 {
    font-size: 18px;
    margin: 0;
  }

  p {
    margin: 0;
    font-size: 12px;
  }
`

const Price = styled.div`
  font-size: 17px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 11px 15px;
`
