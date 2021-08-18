import React from 'react'
import styled from 'styled-components'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useSelector} from 'react-redux'

function ProfileShortcut() {

  const avatar = useSelector(state => state.UserInfo.avatar)
  const firstName = useSelector(state => state.UserInfo.firstName)
  
  return (
    <Container>
      <YellowBlock />
      <ImageWrapper>
        {avatar? (
          <img src={avatar} alt="profileImage" />
        ) : (
          <AccountCircleIcon style={{ fontSize: 67, color: 'gray' }} />
        )}
      </ImageWrapper>
      <WhiteBlock>
        <ImgText>
          <h2>{firstName}</h2>
        </ImgText>
        <Following>
          <h2>following</h2>
          <p>34</p>
        </Following>
        <Followers>
          <h2>followers</h2>
          <p>155</p>
        </Followers>
        <ViewProfile>
          <div>
            <a href='#'>view profile</a>
          </div>
        </ViewProfile>
      </WhiteBlock>
          
    </Container>
  )
}

export default ProfileShortcut


const Container = styled.div`
  position: relative;
  margin-top: 28px;
  width: 230px;
  border-radius: 10px;
  overflow: hidden;
`

const YellowBlock = styled.div`
  height: 75px;
  background: var(--yellow-color);
`

const ImageWrapper = styled.div`
  position: absolute;
  width: 75px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid white;
  top: 11%;
  left: 32%;

  img {
    width: 100%;
  }
`

const WhiteBlock= styled.div`
  background: var(--white-color);
  padding-top: 37px;
`

const ImgText = styled.div`
  h2 {
    text-align: center;
    font-size: 26px;
    color: var(--gray-text-color);
    text-transform: capitalize;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
`

const Following = styled.div`
  color: var(--gray-text-color);
  font-size: 22px;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 10px;

  h2 {
    font-size: 22px;
    text-transform: capitalize;
    margin-bottom: 3px;
  }

  p {
    margin: 0;
    font-size: 20px;
  }
`

const Followers = styled(Following)`
  h2 {
    margin-top: 6px;
  }
`

const ViewProfile = styled.div`
  padding: 8px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  text-transform: capitalize;
  align-items: center;
  color: #FFC312;
`
