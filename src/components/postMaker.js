import React, { useState } from 'react'
import styled from 'styled-components'
import SentimentSatisfiedRoundedIcon from '@material-ui/icons/SentimentSatisfiedRounded'
import ImageRoundedIcon from '@material-ui/icons/ImageRounded'
import GifRoundedIcon from '@material-ui/icons/GifRounded';
import { Button } from '@material-ui/core';


const ButtonStyle = {
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'uppercase',
  fontSize: '15px',
  fontWeight: 700,
  padding: '2px 18px',
  background: 'var(--yellow-color)',
  borderRadius: '6px',
}


function PostMaker({postContentText}) {
  const [postValue, setPostValue] = useState('')

  
  const sendPostData = () => {
    postContentText(postValue)
    setPostValue('')
  }
  
  
  return (
    <Container>
      <textarea placeholder='write something...' value={postValue} onChange={ e => setPostValue(e.target.value) }  />
      <ButtonsWrapper>
        <Icons>
          <ImageRoundedIcon />
          <GifRoundedIcon />
          <SentimentSatisfiedRoundedIcon />
        </Icons>
        <Button style={ButtonStyle} onClick={sendPostData}>post</Button>
      </ButtonsWrapper>
    </Container>
  )
}

export default PostMaker

const Container = styled.div`
  margin-top: 28px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  background: var(--white-color);
  border-radius: 10px;
  overflow: hidden;

  textarea {
    outline: none;
    width: 100%;
    padding: 9px 14px;
    border: none;
    resize: none;
    overflow-y: overlay;
    background: var(--white-color);
    border-bottom: 1px solid #ccc;

    ::placeholder {
      text-transform: capitalize;
    }

    ::-webkit-scrollbar {
      display: none;
    }
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 14px;
`

const Icons = styled.div``
