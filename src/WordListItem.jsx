import { auth, firestore } from "./firebase";
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import Axios from "axios"

import { useDispatch, useSelector } from 'react-redux'
import { setDefinitionArray } from './redux/defSlice'
import { setWhereWord, setDescription } from './redux/extraSlice'

const WordListItem = ({ id, wordText, whereWord, description }) => {

    //redux toolkit
    const dispatch = useDispatch()
    const listName = useSelector(state => state.listId.value)

    const wordsRef = firestore.collection(`users/${auth.currentUser.uid}/wordList/${listName}/words`);
  
    const onDeleteWord = (id) => wordsRef.doc(id).delete();

    const API_KEY = process.env.REACT_APP_DEFAPI_KEY

    const getWord = () => {
        Axios.get("https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + wordText + "?key=" + API_KEY)
        .then((response) => {
            dispatch(setDefinitionArray(response.data[0].shortdef))
        })
        dispatch(setWhereWord(whereWord))
        dispatch(setDescription(description))
    }

    // Style should not exist for listgroup item below, only done for deployment
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