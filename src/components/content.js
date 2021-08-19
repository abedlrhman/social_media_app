import React, { useState, useEffect } from 'react'
import firebase from 'firebase'

import styled from 'styled-components'
import { auth, db } from '../firebase'
import Post from './post'
import PostMaker from './postMaker'

function Content() {
  
  
  const [postContentText, setPostContentText] = useState('')
  const [showPosts, setShowPosts] = useState([])
  const [show, setShow] = useState(true)
  

  useEffect(() => {
    if(!auth.currentUser || postContentText === ''){
      return false
    }
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').add({
      postText: postContentText,
      likes : 0,
      comments : 0,
      shares : 0,
      timestamp : firebase.firestore.FieldValue.serverTimestamp(),
      userUid : auth.currentUser.uid,
    })
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').orderBy("timestamp", "desc").onSnapshot(querySnapshot => {
      const posts = []
      
      querySnapshot.docs.map((doc, index) => {
        posts.push(doc.data())
        posts[index].id = doc.id

        console.log(posts[index].id = doc.id)
      })
      setShowPosts(posts)
      setShow(true)
    })

    return true
  }, [postContentText])

  useEffect(() => {
    if(!auth.currentUser){
      return false
    }

    
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').orderBy("timestamp", "desc").onSnapshot(querySnapshot => {
      const posts = []
      
      querySnapshot.docs.map((doc, index) => {
        posts.push(doc.data())
        posts[index].id = doc.id
      })
      setShowPosts(posts)
      setShow(true)
    })
  }, []);

  return (
    <Container>
      <PostMaker 
        postContentText={text => setPostContentText(text)}
       />

      {show? (
        showPosts.map(post => {
          return( 
            <Post
              postText={post.postText}
              likes={post.likes}
              comments={post.comments}
              shares={post.shares}
              userUid={post.userUid}
              key={post.id}
              id={post.id}
              timestamp = {post.timestamp}
            />
          )
        })
      ): (null)
      }
      
    </Container>
  )
}

export default Content

const Container = styled.div`
  width: 100%;
  margin: 0 30px;
`