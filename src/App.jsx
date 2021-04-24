import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import firebase from "firebase";

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

import ColLeft from './ColLeft'
import ColMiddle from './ColMiddle'
import ColRight from './ColRight'
import './App.css'


const sighInWithGoogle = () =>
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

//   {/** Possibly the most convoluted solution ever devised to center an object. I hate Bootstrap. :( */}
const SignIn = () => (
    <Container>
      {/** Below supposed to be 400%, changed to 200% (Deploy changes) */}
      <Row>
        <h1 className = "mx-auto" style = {{fontSize: "200%", padding: "25px"}}><strong>Word Collector</strong></h1>
      </Row>
      <Row>
        <Button style = {{visibility: "hidden"}}>Sign In With Google</Button>
      </Row>
      {/** Below supposed to be 300%, changed to 100, padding changed to 20px from 10px (Deploy changes*/}
      <Row>
        <Button style = {{fontSize: "100%", padding: "20px"}}onClick={sighInWithGoogle} className = "mx-auto">Sign In With Google</Button>
      </Row>
    </Container>
);

const App = () => {

  

  const [user] = useAuthState(auth);

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

};

export default App

/**

DEPOLYMENT ISSUES (NETLIFY)
- Some comments in this repo will say UI Changes, Deploy Changes
- This is because things looked weird upon first deploy

- MAYBE RESET.CSS is causing the deployment issues?

The commit "...one more" marks the end of stable build 2, which features
definitions, word lists, quasi-reponsive UI, and some more; nevertheless,
it still remains unusable, at least for mobile. 

Stable build 3 features the following (minor) goals:
  - Form for submission should reset after submission (go blank) [DONE], it should also decapitalize [DONE]
  - Sort words/word-lists by timestamp
  - Error handling for definitions [DONE]
  - Improve mobile UI (which is a bit hacky)

 Resources that I used:

 React, Firebase, Auth (all the good stuff)
 https://www.youtube.com/watch?v=cuvP4h6O2x8&list=LL&index=2&t=358s

 Redux Toolkit:
 https://www.youtube.com/watch?v=IUTu2pzz_Gg&t=1128s
 */
