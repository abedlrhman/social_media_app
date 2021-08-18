import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import firebase from 'firebase'
import { auth, db } from '../firebase'
import Comment from './comment'
import { v4 as uuidv4 } from 'uuid';


function CommentsModal(props) {

  const {profileAvatar, profileName, id, comments} = props

  const [commentValue, setCommentValue] = useState('')
  const [comment, setComment] = useState([])
  const scrollRef = useRef()

  
  const submitComment = e => {
    e.preventDefault()

    if(commentValue == null || commentValue == ' ' || commentValue == '') {
      return false
    }
  
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').doc(id).update({
      comments : comments + 1,
    })

    setCommentValue('')
    
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').doc(id).collection('postComments').doc().set({
      commentValue,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() => {
      db.collection("users").doc(auth.currentUser.uid).collection('userPosts').doc(id).collection('postComments').orderBy('timestamp', 'asc').onSnapshot(querySnapshot => {
        const Comments = []
        querySnapshot.docs.map(comment => Comments.push(comment.data()))
        setComment(Comments)
      })
    
    }) 

  }

  useEffect(() => {
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').doc(id).collection('postComments').orderBy('timestamp', 'asc').onSnapshot(querySnapshot => {
      const Comments = []
      querySnapshot.docs.map(comment => Comments.push(comment.data()))
      setComment(Comments)
    })
  }, [])

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [comment])
  
  return (
    <CommentsContainer>

    {
      comment.map(comment => {
        return <Comment
          profileAvatar={profileAvatar}
          profileName={profileName}
          commentValue ={comment?.commentValue}
          key={uuidv4()}
         />
      })
    }
      
      <form onSubmit={submitComment}>
        <input value={commentValue} ref={scrollRef} onChange={e => setCommentValue(e.target.value)} placeholder='enter your comment' />
        <button type="submit">submit</button>
      </form>
    </CommentsContainer>
  )
}

export default CommentsModal

const CommentsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 75vh;
  width: 35vw;
  background-color: white;
  border-radius: 8px;
  max-height: 480px;
  overflow: overlay;

  form {
    display : flex;
    justify-content: flex-end;
    flex-direction: column;
  }
  
  form > input {
    display: block;
    margin: auto;
    margin-bottom: 15px;
    margin-top: 15px;
    padding: 3px 15px;
    
    ::placeholder {
      text-transform: capitalize;
    }
  }

  form > button {
    display: none;
  }
  
`


