import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { auth, db } from '../firebase'
import ImageCropper from './imageCropper'
import {GenerateUpload} from "./cropImage";


function SignUp() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alert, setAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')
  const [image, setImage] = useState(null)
  const [croppedArea, setCroppedArea] = useState(null)
  const history = useHistory()


  const createAccount = () => {
    
    auth
        .createUserWithEmailAndPassword(email, password)
        .then(auth => {
          db.collection("users").doc(auth.user.uid).collection('userInfo').doc(auth.user.uid).set({
            firstName,
            lastName,
            age,
            email,
            password,
          }).then(() => {
            GenerateUpload(image, croppedArea)
          })
          
          // it successfully created a new user with email and password
          if (auth) {
            history.push('/')
          }
          
        }).catch(err => {
          setAlert(true)
          setAlertContent(err.message)
        })
}

  const submitForm = (e) => {
    e.preventDefault()
    createAccount()
  }

  if(alert) {
    setTimeout(() => {setAlert(false)}, 3000)
  }

  return (
    <Container>
      {alert? (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {alertContent}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={()=> {setAlert(false)}}></button>
            </div>
          ) : (null)}
      <FormContainer className='container'>
        <LogoWrapper>
          <BlackLogoImg>
            <img src='./images/Logo.svg' alt='Logo'/>
          </BlackLogoImg>
          <h2>
            signup for free to be one of us
          </h2>
        </LogoWrapper>
        <Form onSubmit={submitForm}>
          <InputWrapper>
            <Input value={firstName} type="text" onChange={ (e) => {setFirstName(e.target.value)}} placeholder="First Name"required/>
            <Input value={lastName} type="text" onChange={ (e) => {setLastName(e.target.value)}} placeholder="Last Name"required/>
          </InputWrapper>
          <InputWrapper>
            <Input value={email} type="email" onChange={(e) => {setEmail(e.target.value)}} placeholder="Your Email" required/>
            <Input value={password} type="password" onChange={(e) => {setPassword(e.target.value)}} placeholder="Your New Password"required/>
          </InputWrapper>
          <InputWrapper>
            <Age>
              <Input value={age} type="number" onChange={(e) => {setAge(e.target.value)}} placeholder='Your Age' style={{padding: 10}}required/>
            </Age>
            <GenderWrapper>
              <p>gender :</p>
              <div>
                <InputRadio type="radio" id="male" name="gender" value="male" required/>
                <Label htmlFor="male">male</Label>
              </div>
              <div>
                <InputRadio type="radio" id="female" name="gender" value="female" required/>
                <Label htmlFor="female">female</Label>
              </div>
            </GenderWrapper>
          </InputWrapper>
          <ImageCropper 
            image={image => setImage(image)}
            croppedArea ={croppedArea => setCroppedArea(croppedArea)}
          />
          <SubmitButton type="submit">submit</SubmitButton>
        </Form>
      </FormContainer>
    </Container>
  )
}

export default SignUp

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const FormContainer = styled.div`
  width: 80%;
  height: calc(80vh - 50px);
  display: flex;
  flex-direction: row;
  overflow: hidden;
  border-radius: 10px;
  padding: 0;
`

const Form = styled.form`
  background-color: var(--yellow-color);
  width: 70%;
  height: 100%;
  padding: 40px;

`

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
`

const LogoWrapper = styled.div`
  background: var(--main-color);
  width : 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  line-height: 1.4;
  h2 {
    color: white;
    width : 80%;
    text-align: center;
    text-transform: capitalize;
    font-size: 25px;
    margin-top: 20px;
  }
`

const BlackLogoImg = styled.div`
  width : 285px;
  img {
    width: 100%;
  }
`

const Input = styled.input`
  width: 250px;
  border: 1px solid #ccc;
  height: 35px;
  text-align: center;
  border-radius: 25px;
  outline: none;
  background: #eee;
`
const GenderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
`

const SubmitButton = styled.button`
  border: 1px solid #ccc;
  outline: none;
  padding: 8px 20px;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  border-radius: 25px;
  background: var(--main-color);
  color: white;
  display: block;
  margin-left: auto;
  margin-top: 5%;
`

const InputRadio = styled.input``

const Label = styled.label`
  text-transform: capitalize;
`

const Age = styled.div``