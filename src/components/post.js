import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined'
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined'
import QueryBuilderOutlinedIcon from '@material-ui/icons/QueryBuilderOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { auth, db } from '../firebase'
import Modal from '@material-ui/core/Modal'
import CommentsModal from './commentsModal'

function Post(props) {

  const {postText, likes, comments, shares, userUid, timestamp, id} = props;

  const [userInfo, setUserInfo] = useState({})
  const [likeState, setLikeState] = useState(false)
  const [showComments, setShowComments] = useState(false)
  
  useEffect(() => {
    db.collection("users").doc(userUid).collection('userInfo').get().then(doc => {
      doc.docs.map(doc => setUserInfo(doc.data()))
    })
  }, [userUid])

  const like = (e) => {

    let isLiked;

    if(likeState) {
      isLiked = likes - 1
      setLikeState(false)
      e.target.style.color = 'black'
    }else {
      isLiked = likes + 1
      setLikeState(true)
      e.target.style.color = 'var(--yellow-color)'
    }
    
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').doc(id).update({
      likes : isLiked
    })

  }

  const share = () => {
    db.collection("users").doc(auth.currentUser.uid).collection('userPosts').doc(id).update({
      shares : shares + 1
    })
  }

  const comment = () => {
    setShowComments(true)   
    
  }

  const showDate = () => {
    const postDate = new Date(timestamp?.toDate())
  
    let month = postDate.getMonth()
    let day = postDate.getDate()
    let year = postDate.getFullYear()
    let hours = postDate.getHours()
    let minutes = postDate.getMinutes()
    let seconds = postDate.getSeconds()
  
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`
    
  }


  if(showComments){
    return (
      <Modal
        open={showComments}
        onClose={() => setShowComments(false)}
      >
        <>
          <CommentsModal
            profileAvatar = {userInfo.avatar}
            profileName = {userInfo.firstName + " " + userInfo.lastName}
            id = {id}
            comments = {comments}
          />
        </>
      </Modal>
    )
  }
  
  
  return (
    <Container>
      <PostHeader>
        <PostAvatar>
          <img src={userInfo.avatar} alt='profile avatar' />
        </PostAvatar>
        <NameAndDate>
          <DisplayName>
            {userInfo.firstName + " " + userInfo.lastName}
          </DisplayName>
          <PostDate>
            <QueryBuilderOutlinedIcon fontSize='inherit' style={{margin: '0 3px'}} />
            {showDate()}
          </PostDate>
        </NameAndDate>
        <MoreVertIcon style={{marginLeft: 'auto'}}/>
      </PostHeader>
      <PostBody>
        <PostText>{postText}</PostText>
      </PostBody>
      <PostFooter>
        <Likes >
          <ThumbUpIcon fontSize="inherit" onClick={like}/>
          <span>{likes}</span>
        </Likes>
        <Comments >
          <SmsOutlinedIcon fontSize="inherit" onClick={comment}/>
          <span>{comments}</span>
        </Comments>
        <Shares >
          <ShareOutlinedIcon fontSize="inherit" onClick={share}/>
          <span>{shares}</span>
        </Shares>
      </PostFooter>

    </Container>
  )
}

export default Post

const Container = styled.div`
  margin: 20px 0;
  border-radius: 10px;
  background: var(--white-color);
`

const PostHeader = styled.div`
  display: flex;
  padding: 10px;
`

const PostAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;

  img{
    width: 100%;
    height: 100%;
  }
`

const NameAndDate = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`

const DisplayName = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
`

const PostDate = styled.p`
  font-size: 12px;
  display: flex;
  align-items: center;
`

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
`

const PostText = styled.p`
  margin: 0;
  font-size: 19px;
  font-weight: 500;
`

const PostFooter = styled.div`
  display: flex;
  padding: 13px;
  justify-content: space-around;
  font-size: 25px;
`

const Likes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  span {
    padding: 0 9px;
  }
`

const Comments = styled(Likes)``

const Shares = styled(Likes)``

