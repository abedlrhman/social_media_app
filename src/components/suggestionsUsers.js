import React from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';

function SuggestionsUsers(props) {  

  let splittedName =[props.AccountName];
  
  if(props.AccountName.length > 16){
    splittedName = props.AccountName.split(' ')
  }

  
  return (
    <Container>
      <ImgWrapper>
        <img src={props.avatarUrl} alt='profile avatar' />
      </ImgWrapper>
      <AccountInfo>
        <AccountName>{splittedName[0]}</AccountName>
        <Job>{props.job}</Job>
      </AccountInfo>
      <FollowOption>
        <AddIcon />
      </FollowOption>

    </Container>
  )
}

export default SuggestionsUsers

const Container = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
`

const ImgWrapper = styled.div`
  width: 40px;
  overflow: hidden;
  border-radius: 50%;

  img{
    width: 100%;
  }
`

const AccountInfo = styled.div`
  text-align: left;
  width: 54%;
  text-transform: capitalize;

`

const AccountName = styled.div`
  font-size: 13px;
  font-weight: bold;
`

const Job = styled.div`
  font-size: 12px;
  color: gray;
`

const FollowOption = styled.div``