import React, { useState } from 'react'
import {auth, provider, db} from '../firebase'
import {useHistory, Link} from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import {IsLogged, FirstName, LastName, Email, AccountUid, Avatar} from '../redux/actions'


function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [alert, setAlert] = useState(false)
    const [alertContent, setAlertContent] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()


    const signInWithGoogle = () => {
        auth.signInWithPopup(provider).then((auth) => {

          db.collection("users").doc(auth.user.uid).collection('userInfo').doc(auth.user.uid).set({
            firstName : auth.additionalUserInfo.profile.given_name,
            lastName : auth.additionalUserInfo.profile.family_name,
            userAge : '' ,
            email : auth.user.email,
            password : '',
            avatar : auth.user.photoURL
          })
          
          
          dispatch(FirstName(auth.additionalUserInfo.profile.given_name))
          dispatch(LastName(auth.additionalUserInfo.profile.family_name))
          dispatch(Email(auth.user.email))
          dispatch(AccountUid(auth.user.uid))
          dispatch(IsLogged(true))
          dispatch(Avatar(auth.user.photoURL))
          // it successfully created a new user with email and password
          if (auth) {
            history.push('/')
          }
        }).catch(err => {
          console.log(err.message)
          setAlert(true)
          setAlertContent(err.message)
    })
    }

  const signInAccount = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
          
        // it successfully created a new user with email and password
        if (auth) {
          history.push('/')
        }

            
      }).catch(err => {
        setAlert(true)
        setAlertContent(err.message)
        
      })
  }

    if(alert) {
      setTimeout(() => {setAlert(false)}, 3000)
    }
    
    return (
      <>
        {alert? (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {alertContent}
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> {setAlert(false)}}></button>
          </div>
        ) : (null)}
        <Container>
          <h2>sign in</h2>
          <Content>
              <FormWrapper>
                  <Input type='email' placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                  <Input type='password' placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                  <ButtonWrapper>
                    <Button onClick={signInAccount}>sign in</Button>
                    <span>or</span>
                    <GoogleButton onClick={signInWithGoogle}>
                      <GoogleImgWrapper>
                        <GoogleImg  src='./images/googleLogo.png' />
                      </GoogleImgWrapper>
                    </GoogleButton>
                  </ButtonWrapper>
              </FormWrapper>
              <NewAccount>
                  <Heading>Don't have an account?</Heading>
                  <NewAccountButton><Link to='/signup'>Sign Up</Link></NewAccountButton>
              </NewAccount>
          </Content>
        </Container>
      </>
    )
}

export default Login

const Container = styled.div`
  width: 80%;
  margin: auto;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    text-transform: uppercase;
    margin-bottom: 3%;
  }
`

const Content = styled.div`
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;    display: flex;
  width: 750px;
  overflow: hidden;
  border-radius: 10px;

`

const NewAccount = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--yellow-color);

  a, a:hover {
    color: inherit;
    text-decoration: none;
  }
  
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px auto;

  span {
    margin : 0 20px;
  }

`

const Button = styled.button`
  width: 120px;
  outline: none;
  border-radius: 25px;
  border: 1px solid #ccc;
  padding: 2px;
  color: #636e72;
`

const GoogleButton = styled.button`
  border: none;
  background: none;
  outline: none;
`

const GoogleImgWrapper = styled.div`
  width: 24px;
`

const GoogleImg = styled.img`
  width: 100%;
`

const NewAccountButton = styled(Button)`
  color: black;
`

const Heading = styled.h2`
  font-size: 25px;
  text-transform: capitalize;
`

const FormWrapper = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  h2 {
    text-align: center;
    color: white;
    text-transform: uppercase;
  }
`

const Input = styled.input`
  display: block;
  margin: 20px;
  padding: 10px;
  height: 40px;
  text-align: center;
  border-radius: 25px;
  outline: none;
  background: #eee;
  border: 1px solid #ccc
`