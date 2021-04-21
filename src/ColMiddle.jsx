import { useState } from "react";
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

const ColMiddle = () => {

  const colStyle = {
    height: "100%",
    overflowY: "scroll",
    borderRight: "1px solid black", 
    borderBottom: "1px solid black"
  }

  const wordListRef = firestore.collection(`users/${auth.currentUser.uid}/wordList`);
  const wordListName = useSelector(state => state.listId.name)

  //REDUX Replacing WordList - wrap each usage setWordListId with dispatch 
  const dispatch = useDispatch()
  const wordListId = useSelector(state => state.listId.value) 

  //Word+ UseState
  const [word, setWord] = useState("");
  const wordsRef = firestore.collection(`users/${auth.currentUser.uid}/wordList/${wordListId}/words`);

  const [words] = useCollectionData(wordsRef, { idField: "id" });
  const [wordLists] = useCollectionData(wordListRef, { idField: "id" })

  //REDUX whereWord and Description
  const whereWordInput = useSelector(state => state.extraInfo.whereWord)
  const description = useSelector(state => state.extraInfo.description)

  const onSubmitWord = (event) => {
    event.preventDefault();

    wordsRef.add({
        wordText: word,
        whereWord: whereWordInput,
        description: description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()       
    })

    setWord("")
    dispatch(setWhereWord(""))
    dispatch(setDescription(""))

  };

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

        <Form className = "mt-4 mb-2" onSubmit = {onSubmitWord}>
          <Form.Row>
            <Col lg={10}>
              <Form.Group controlId="formWord" onChange = {e => setWord(e.target.value)}>
                <Form.Control type="text" value = {word} placeholder="Enter a word" autocapitalize = "none" />
              </Form.Group>
            </Col>
            <Col lg={2}>
              <CustoModal 
              subChildSetWord = {setWord}
              subChildWord = {word}
            />
            </Col>
          </Form.Row>

          <Button variant = "primary" type = "submit" style = {{display: "none"}}>
            Submit
          </Button>

        </Form>

        <ListGroup>
          {words && words.map((word) => 
            <WordListItem key={word.id} {...word} 
            />)}
        </ListGroup> 
    </Col>
  );
};

export default ColMiddle;
