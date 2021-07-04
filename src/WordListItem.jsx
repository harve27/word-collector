import { auth, firestore } from "./firebase"
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

import Axios from "axios"

import { useDispatch, useSelector } from 'react-redux'
import { setDefinitionArray, setSpellStatus } from './redux/defSlice'
import { setWhereWord, setDescription } from './redux/extraSlice'

function WordListItem(props) {
    // REDUX
    const dispatch = useDispatch()
    const listName = useSelector(state => state.listId.value)

    const wordsRef = firestore.collection(`users/${auth.currentUser.uid}/wordList/${listName}/words`)
  
    const onDeleteWord = (id) => wordsRef.doc(id).delete()

    const API_KEY = process.env.REACT_APP_DEFAPI_KEY
    const url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + props.wordText + "?key=" + API_KEY

    async function getWord() {
        const response = await Axios.get(url)
        if(typeof response.data[0] === "object") {
          dispatch(setSpellStatus(true))
          dispatch(setDefinitionArray(response.data[0].shortdef))
        } else {
          dispatch(setSpellStatus(false))
          dispatch(setDefinitionArray(response.data))
        }

        // Because this is run when WordListItem is pressed, it also makes it displayed in ColRight
        dispatch(setWhereWord(props.whereWord))
        dispatch(setDescription(props.description))
    }

    return (
    <ListGroup.Item action onClick = {getWord} style = {{fontSize: "60%"}}>
      {props.wordText}
        <span style={{float: "right"}}>
          <Button variant = "danger" onClick={() => onDeleteWord(props.id)}><strong>delete</strong></Button>
        </span>
    </ListGroup.Item>
    )
  }

export default WordListItem