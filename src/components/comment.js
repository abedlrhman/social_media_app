import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


function Comment(props) {

  const {profileAvatar, profileName, commentValue} = props

  return (
    <CommentContainer>
      <CommentHeader>
        <ProfileAvatar>
        {
            profileAvatar === undefined? (
              <AccountCircleIcon style={{fontSize: 38}} />
            ) : (
              <img src={profileAvatar} alt='profile avatar' />
            )
          }
        </ProfileAvatar>
        <ProfileName>{profileName}</ProfileName>
      </CommentHeader>
      <CommentBody>
        <span>{commentValue}</span>
      </CommentBody>
    </CommentContainer>
  )
}

export default Comment


const CommentContainer = styled.div`
  width: 60%;
  background: var(--white-color);
  margin-top: 21px;
  border-radius: 0 15px 15px 0;
`

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;

`

const ProfileAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;

  img{
    width: 100%;
    height: 100%;
  }
`

const ProfileName = styled.div`
  margin-left: 20px;
  font-weight: bold;
  text-transform: capitalize;
  font-size: 15px;
`

const CommentBody = styled.div`
  margin-left: 20px;
  padding-bottom: 10px;
  font-size: 17px;
  font-weight: 200;
`