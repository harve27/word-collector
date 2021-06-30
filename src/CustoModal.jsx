import firebase, { auth, firestore } from "./firebase";
import { useSelector } from 'react-redux'
import { useState } from 'react'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'


function CustoModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const wordListId = useSelector(state => state.listId.value)
    const [wordTemp, setWordTemp] = useState("")
    const [whereWordTemp, setWhereWordTemp] = useState("");
    const [descriptionTemp, setDescriptionTemp] = useState("");
    const wordsRef = firestore.collection(`users/${auth.currentUser.uid}/wordList/${wordListId}/words`);

    const subChildAdd = (event) => {
        event.preventDefault();
    
        wordsRef.add({
            wordText: wordTemp,
            whereWord: whereWordTemp,
            description: descriptionTemp,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()       
        })
    
        setWordTemp("")
        setWhereWordTemp("")
        setDescriptionTemp("")
        setShow(false)
      }

    

    return (
        <div>

            <Button variant="primary" onClick = {handleShow} style = {{fontSize: "50%", marginBottom: "13px"}}>
            Advanced
            </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Add a word!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group controlId = "wordForm.ControlText1"
                            style = {{fontSize: "60%"}} onChange = {e => setWordTemp(e.target.value)}>
                            <Form.Label>Word</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
 
                        <Form.Group controlId="wordForm.ControlText2" 
                        style = {{fontSize: "60%"}} onChange = {e => setWhereWordTemp(e.target.value)}>
                            <Form.Label>Where did you hear this word?</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="wordForm.ControlTextarea1" 
                        style = {{fontSize: "60%"}} onChange = {e => setDescriptionTemp(e.target.value)}>
                            <Form.Label>Context of the Word</Form.Label>
                            <Form.Control placeholder="What sentence it came from, how it makes you feel, etc." as="textarea" rows={3} />
                        </Form.Group> 

                        <Button variant="primary" type="submit" onClick = {subChildAdd}>
                            Submit
                        </Button>

                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CustoModal

