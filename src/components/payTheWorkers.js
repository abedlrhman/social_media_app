import React from 'react'
import styled from 'styled-components'

function PayTheWorkers() {
  return (
    <Container>
      <SectionBody>
        <LogoWrapper>
          <img src='./images/blackLogo.png' alt='logo' />
        </LogoWrapper>
        <Description>
          <h2>track time on workwise</h2>
          <p>pay only for the hours worked</p>
        </Description>
      </SectionBody>
      <ButtonWrapper>
        <button><a href="#">sign up</a></button>
        <a href="#">learn more</a>
      </ButtonWrapper>

    </Container>
  )
}

export default PayTheWorkers


const Container = styled.div`
  width: 300px;
  background: var(--white-color);
  margin-top: 28px;
  overflow: hidden;
  border-radius: 10px;
`

const SectionBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const LogoWrapper = styled.div`

  width: 200px;

  img {
    width: 100%;
  }
`

const Description = styled.div`
  margin-top: 15px;

  h2 {
    font-size: 21px;
    text-transform: capitalize;
    margin: 0;
    font-weight: bold;
    text-align: center;
  }

  p {
    margin: 0;
    font-size: 16px;
    text-align: center;
    margin-top: 8px;
    text-transform: capitalize;
    color: var(--gray-text-color);
  }
`

const ButtonWrapper = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc;

  button {
    border: none;
    background: transparent;
    text-align: center;
    text-transform: uppercase;
    color: black;
    font-size: 21px;
  }

  > a {
    text-align: center;
    color: #FFC312;
    font-size: 14px;
  }
`