import { useAuthState } from "react-firebase-hooks/auth" 
import { auth } from "./firebase" 
import firebase from "firebase" 

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css' 

import ColLeft from './ColLeft'
import ColMiddle from './ColMiddle'
import ColRight from './ColRight'

// Function for signing into Google
const sighInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

// Sign-in page upon entry
function SignIn() {
    <Container>
      <Row>
        <h1 className = "mx-auto" style = {{fontSize: "200%", padding: "25px"}}><strong>Word Collector</strong></h1>
      </Row>
      <Row>
        <Button style = {{visibility: "hidden"}}>Sign In With Google</Button>
      </Row>
      <Row>
        <Button style = {{fontSize: "100%", padding: "20px"}} onClick={sighInWithGoogle} className = "mx-auto">Sign In With Google</Button>
      </Row>
    </Container>
} 

function App() {
  const [user] = useAuthState(auth) //React-firebase hook to check if logged in

  return user ? 
      <Container fluid>
        <Row style={{height: "100vh"}}>
          <ColLeft />
          <ColMiddle /> 
          <ColRight  />
        </Row>
      </Container>
      : 
    <SignIn />

} 

export default App

/**
Resources that I used:
React, Firebase, Auth (all the good stuff)
https://www.youtube.com/watch?v=cuvP4h6O2x8&list=LL&index=2&t=358s

Redux Toolkit:
https://www.youtube.com/watch?v=IUTu2pzz_Gg&t=1128s
*/
