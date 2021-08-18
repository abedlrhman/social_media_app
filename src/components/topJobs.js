import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import JobsChances from './jobsChances'

function TopJobs() {

  const Chances = [
    { 
      title : 'front end developer',
      desc : 'lorem end developer and my name isLogged ',
      price : '$15/hr',
      id: 1,
    },
    { 
      title : 'back end developer',
      desc : 'it is my name and I am logged in and its job',
      price : '$10/hr',
      id : 2,
    },
    { 
      title : 'full stack developer',
      desc : 'lorem end developer and my isLogged ',
      price : '$30/hr',
      id : 3,
    },
  ]

  // console.log(Chances[0].id)
  
  return (
    <Container>
      <SectionTitle>
        <span>top jobs</span>
        <MoreVertIcon />
      </SectionTitle>
      <SectionBody>
        {
        Chances.map((chance) => {
          return <JobsChances
            title={chance.title}
            desc={chance.desc}
            price={chance.price}
            key={chance.id}
           />
        })
        }
      </SectionBody>
    </Container>
  )
}

export default TopJobs

const Container = styled.div`
  margin-top: 25px;
  background: var(--white-color);
  overflow: hidden;
  border-radius: 10px;
`

const SectionTitle = styled.div`
  padding: 10px 20px;
  text-transform: capitalize;
  color: var(--gray-text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`

const SectionBody = styled.div``
