import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'

import firebase, { firestore, auth } from "./firebase"
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setWordListId, setWordListName } from './redux/listSlice'


function ListModal() {
    const [show, setShow] = useState(false);

    // Internal temporary state manages list name
    const [tempList, setTempList] = useState("")
    const wordListRef = firestore.collection(`users/${auth.currentUser.uid}/wordList`);
    const dispatch = useDispatch()

    // For showing and hiding the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Function that adds new word list to Firebase and changes REDUX
    const addWordList = (event) => {
        event.preventDefault();
    
        wordListRef.add({
          name: tempList,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()      
        })

        // changes REDUX values to change which words are displayed on ColMiddle 
        .then((docRef) => {
          dispatch(setWordListId(docRef.id))
          dispatch(setWordListName(tempList))
        })
    };

    return (

        <div style = {{width: "100%"}}>

            <Button variant="success" onClick = {handleShow} style = {{ width: "100%", fontSize: "80%"}}>
                <i>Create A Word List</i>
            </Button> 

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        What do you want to call your list?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <Form.Group controlId = "listName.ControlText1" onChange = {e => setTempList(e.target.value)}>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Button variant="primary" type="submit" onClick = {addWordList}>
                            Submit
                        </Button>

                    </Form>
                </Modal.Body>

            </Modal>

        </div>
        
    );
}

export default ListModal

