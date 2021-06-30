import { auth, firestore } from "./firebase";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import Axios from "axios"

import { useDispatch, useSelector } from 'react-redux'
import { setDefinitionArray, setSpellStatus } from './redux/defSlice'
import { setWhereWord, setDescription } from './redux/extraSlice'

const WordListItem = ({ id, wordText, whereWord, description }) => {

    // REDUX
    const dispatch = useDispatch()
    const listName = useSelector(state => state.listId.value)

    const wordsRef = firestore.collection(`users/${auth.currentUser.uid}/wordList/${listName}/words`);
  
    const onDeleteWord = (id) => wordsRef.doc(id).delete();

    const API_KEY = process.env.REACT_APP_DEFAPI_KEY

    const getWord = () => {
        Axios.get("https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + wordText + "?key=" + API_KEY)
        .then((response) => {
            if(typeof response.data[0] === "object") {
              dispatch(setSpellStatus(true))
              dispatch(setDefinitionArray(response.data[0].shortdef))
            } else {
              dispatch(setSpellStatus(false))
              dispatch(setDefinitionArray(response.data))
            }
        })

        // Because this is run when WordListItem is pressed, it also makes it displayed in ColRight
        dispatch(setWhereWord(whereWord))
        dispatch(setDescription(description))
    }

    return (
    <ListGroup.Item action onClick = {getWord} style = {{fontSize: "60%"}}>
      {wordText}
        <span style={{float: "right"}}>
          <Button variant = "danger" onClick={() => onDeleteWord(id)}><strong>delete</strong></Button>
        </span>
    </ListGroup.Item>
    );
  };

export default WordListItem