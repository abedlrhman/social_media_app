import React from 'react'
import styled from 'styled-components'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SuggestionsUsers from './suggestionsUsers'
import { v4 as uuidv4 } from 'uuid';

function Suggestions() {

  const suggestions = [
    {
      avatarUrl : './images/profile.jfif',
      AccountName :'abdulrahman masdi',
      job : 'front-end developer',
      id : uuidv4(),
    },
    {
      avatarUrl : './images/profile.jfif',
      AccountName :'abdulrahman masdi',
      job : 'front-end developer',
      id : uuidv4(),
    },
    {
      avatarUrl : './images/profile.jfif',
      AccountName :'abdulrahman masdi',
      job : 'front-end developer',
      id : uuidv4(),
    },
    {
      avatarUrl : './images/profile.jfif',
      AccountName :'abdulrahman masdi',
      job : 'front-end developer',
      id : uuidv4(),
    },
    {
      avatarUrl : './images/profile.jfif',
      AccountName :'abdulrahman masdi',
      job : 'front-end developer',
      id : uuidv4(),
    },
  ]
  
  return (
    <Container>
      <SectionTitle>
        <span>suggestion</span>
        <MoreVertIcon />
      </SectionTitle>
      <SectionBody>
        {
          suggestions.map(suggestion => {
            return <SuggestionsUsers
              avatarUrl={suggestion?.avatarUrl}
              AccountName={suggestion?.AccountName}
              job={suggestion?.job}
              key={suggestion?.id}
             />
          })
        }
      </SectionBody>
    </Container>
  )
}

export default Suggestions

const Container = styled.div`
  margin-top: 25px;
  background: var(--white-color);
  overflow: hidden;
  border-radius: 10px;
`

const SectionTitle = styled.div`
  padding: 10px;
  text-transform: capitalize;
  color: var(--gray-text-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
`

const SectionBody = styled.div``