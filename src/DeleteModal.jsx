import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import 'bootstrap/dist/css/bootstrap.min.css'

import { firestore, auth } from "./firebase"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from "react"
import { setWordListId, setWordListName  } from './redux/listSlice'

function DeleteModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const wordListId = useSelector(state => state.listId.value)
    const wordListRef = firestore.collection(`users/${auth.currentUser.uid}/wordList`);
    const dispatch = useDispatch()

    // Deletes specified word list, then returns to main list
    const handleDelete = (id) => {
        wordListRef.doc(id).delete()
        dispatch(setWordListId("List"))
        dispatch(setWordListName("Main List"))
        handleClose()
    }

    let button;

    if(wordListId !== "List") {
        button = <Button style = {{marginTop: "10px", marginLeft: "10px"}} variant = "danger" onClick = {handleShow}>
                    <strong>Delete List</strong>
                 </Button>
    } else {
        button =  <OverlayTrigger 
                    overlay={<Tooltip id="tooltip-disabled">Main List can't be deleted</Tooltip>}
                    key = "bottom"
                    placement = "bottom"
                    >
                        <span className="d-inline-block">
                            <Button disabled style={{ pointerEvents: 'none', marginTop: "10px", marginLeft: "10px"}} variant = "danger">
                                <strong>Delete List</strong>
                            </Button>
                        </span>
                    </OverlayTrigger>
    }

    return (
        <div style = {{width: "100%"}}>

            {button}
            
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>
                        Are you sure you want to delete this list? 
                        <br></br>
                        <span style = {{fontSize: "80%"}}><i>This cannot be undone</i></span>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Button variant="danger" onClick = {() => handleDelete(wordListId)}>
                        Yes, delete this list
                    </Button>
                </Modal.Body>

            </Modal>

        </div>
    );
}

export default DeleteModal

