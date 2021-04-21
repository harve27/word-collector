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

    //internal temporary state
    const [tempList, setTempList] = useState("")
    const wordListRef = firestore.collection(`users/${auth.currentUser.uid}/wordList`);
    const dispatch = useDispatch()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addWordList = (event) => {
        event.preventDefault();
    
        wordListRef.add({
          name: tempList,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()      
        })
        .then((docRef) => {
          dispatch(setWordListId(docRef.id))
          dispatch(setWordListName(tempList))
        })

        wordListRef.doc("List").set({
            name: "Main List"
        })
    };

    return (

        <div style = {{width: "100%"}}>

            {/** FontSize below should be 150%, but needs to be 80 to display correctly on deploy */}
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

