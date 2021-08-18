import React, { Component } from 'react'
import Home from './components/home'
import Header from './components/header'
import Login from './components/login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignUp from './components/signUp';
import {connect} from 'react-redux';
import { auth, db } from './firebase';
import { AccountUid, Avatar, Email, FirstName, LastName, Password, UserAge, IsLogged } from './redux/actions';

class App extends Component {

  
  
  constructor(props) {
    super(props);
    this.state = {
      IsLoggedIn: false,
      authStatus: ""
    }
  }

  
 
  componentDidMount () {
    if(auth.currentUser){
      if(auth.currentUser.uid === this.state.authStatus){
        return false;
      }
    }
    auth.onAuthStateChanged((auth) => {
      if(auth){
        this.setState({
          ...this.state,
          authStatus : auth.uid,
          IsLoggedIn : true
        })
        if(auth.providerData[0].providerId !== 'google.com'){
          db.collection("users").doc(auth.uid).collection('userInfo').get().then(userInfo => {
            let data = []
            userInfo.docs.map(doc => {
              data.push(doc.data())
            })
            this.props.FirstName(data[0].firstName)
            this.props.LastName(data[0].lastName)
            this.props.Email(data[0].email)
            this.props.AccountUid(auth.uid)
            this.props.IsLogged(true)  
            this.props.Avatar(data[0].avatar)
          })
        } else {
          
          this.props.FirstName(auth.displayName)
          this.props.LastName('')
          this.props.Email(auth.email)
          this.props.AccountUid(auth.uid)
          this.props.IsLogged(true)
          this.props.Avatar(auth.photoURL)
        }

      }
    })
  }
  
  render() {
    
    
    return (
      <div className="App">
        <Router>
          <Header />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
          {!auth.currentUser? (
            <Redirect from={'/*'} to="/login" />
            ) : (
              <Redirect from={'/login'|| '/signup'} to="/" />
            )}
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    IsLogged : state.isLogged
  }
}

function mapDispatchToProps(dispatch) {
  return {
    FirstName : firstName => dispatch(FirstName(firstName)),
    LastName : lastName => dispatch(LastName(lastName)),
    Email : email => dispatch(Email(email)),
    Avatar : avatar => dispatch(Avatar(avatar)),
    AccountUid : uid => dispatch(AccountUid(uid)),
    IsLogged : isLogged => dispatch(IsLogged(isLogged)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
