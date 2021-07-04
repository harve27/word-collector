import { useState, useEffect } from "react";
import firebase, { auth, firestore } from "./firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from 'react-redux'

import WordListItem from './WordListItem'
import CustoModal from './CustoModal'
import DeleteModal from './DeleteModal'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'

import { setWordListId, setWordListName  } from './redux/listSlice'
import { setWhereWord, setDescription } from './redux/extraSlice'

import {isMobile} from 'react-device-detect';

function ColMiddle() {

  // Defines a style for the column
  const colStyle = {
    height: "100%",
    overflowY: "scroll",
    borderRight: "1px solid black", 
    borderBottom: "1px solid black"
  }

  // REDUX
  const dispatch = useDispatch()
  const wordListId = useSelector(state => state.listId.value) 
  const wordListName = useSelector(state => state.listId.name)
  const whereWordInput = useSelector(state => state.extraInfo.whereWord)
  const description = useSelector(state => state.extraInfo.description)

  // FIREBASE
  const wordListRef = firestore.collection(`users/${auth.currentUser.uid}/wordList`)
  const wordsRef = firestore.collection(`users/${auth.currentUser.uid}/wordList/${wordListId}/words`).orderBy("createdAt", "desc")
 
  // REACT FIREBASE HOOKS
  const [words] = useCollectionData(wordsRef, { idField: "id" }) //See ListGroup for use
  const [wordLists] = useCollectionData(wordListRef, { idField: "id" }) //see DropdownButton for use

  // REACT HOOKS
  const [word, setWord] = useState("");

  // On mount: checks if list doc exists, adds name if it doesn't (for new accounts)
  useEffect(() => {
    const subRef = wordListRef.doc(wordListId)

    subRef.get().then((doc) => {
      if (!doc.exists) {
        subRef.set({
          name: "Main List"
        })
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    })

    if(isMobile) {
      alert("You're on mobile!!")
    }

    // eslint-disable-next-line
  }, []) // Note: [] is used to simulate componentDidMount() in functional component

  // Adds submitted word to firestore database and sets word state to ""
  const onSubmitWord = (event) => {
    event.preventDefault();

    firestore.collection(`users/${auth.currentUser.uid}/wordList/${wordListId}/words`).add({
        wordText: word,
        whereWord: whereWordInput,
        description: description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()       
    })

    setWord("")
  }


  return (
    <Col lg={5} sm={7} style={colStyle}>
        <Row>
          <Col lg = {6}>
            <h3 style = {{marginTop: "15px", marginLeft: "15px"}}>{wordListName}</h3>
          </Col>

          <Col lg = {3}>
            <DeleteModal/>
          </Col>

          <Col lg = {3}>

            {/** Gets dropdown of word list names. When clicked, state change re-renders WordListItem. */}    
            <DropdownButton as = {ButtonGroup}
              variant = "success" id="dropdown-basic-button" title="My Lists" style = {{marginTop: "10px", marginLeft: "10px"}}>
              {wordLists && wordLists.map((wordList) => 
                <Dropdown.Item key={wordList.id} onClick = {() => 
                  dispatch(setWordListId(wordList.id)) && dispatch(setWordListName(wordList.name))
                }>{wordList.name}</Dropdown.Item>
              )}
            </DropdownButton>
            
          </Col>

        </Row>
        
        {/** Form to add word to database */}
        <Form className = "mt-4 mb-2" onSubmit = {onSubmitWord}>
          <Form.Row>
            <Col lg={10}>
              <Form.Group controlId="formWord" onChange = {e => setWord(e.target.value)}>
                <Form.Control type="text" value = {word} placeholder="Enter a word" autoCapitalize = "none" />
              </Form.Group>
            </Col>
            <Col lg={2}>
              <CustoModal/> {/** 'Advanced' button for additional info with word */}
            </Col>
          </Form.Row>
          
          {/** Button hidden for space, 'Enter' key can be pressed. See below for why 'dispatches' are present. */}
          <Button variant = "primary" type = "submit" onClick = {() => {dispatch(setWhereWord("")) && dispatch(setDescription(""))}} 
            style = {{display: "none"}}>
            Submit
          </Button>

        </Form>
        
        {/** ListGroup with multiple ListGroup.Item (returned by WordListItem) */}
        <ListGroup>
          {words && words.map((word) => 
            <WordListItem key={word.id} {...word} 
            />)}
        </ListGroup>  
    </Col>
  )
}

export default ColMiddle;

/**
 'Dispatches' are present on the submit button for this case: 
    A 'WordListItem' is pressed, and the Redux state is updated for whereWord and description on 
    extraSlice.js. Then, when a new word is typed and added in the form, because no whereWord and
    description was specified, Word Collector will take the previous whereWord and description.
    For this reason, the dispatches set whereWord and description to ""
 */