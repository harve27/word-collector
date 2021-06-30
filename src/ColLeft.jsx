import React from 'react'
import ListModal from './ListModal'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

import { auth } from "./firebase"

function ColLeft() {

    //Sign out function for sign out button
    const signOut = () => auth.signOut();

    return (
        <Col lg={3} sm={3} style={{borderRight: "1px solid black", borderBottom: "1px solid black", padding: "32px"}}>
            <h1 style={{fontSize: "calc(1px + 5vw)"}}><strong>Word Collector</strong></h1>
            <hr></hr>

            <Row>
                <Button variant = "success" onClick={signOut} style = {{fontSize: "80%", width: "100%"}}><i>Sign Out</i></Button>
            </Row>
            <Row>
                <ListModal />
            </Row>
            <br></br>
            <Row>
                <p style = {{fontSize: "70%"}}><strong>How to use:</strong></p>
                <p style = {{fontSize: "50%"}}>
                    Word Collector is a simple way to collect words that interest you. 
                    Simply enter a word and press "Enter", and we'll store it for you. If you want to add
                    extra info about your word, click the "Advanced" button and type your word there. You can also
                    create lists too!
                </p>
            </Row>
        </Col>
    )
}

export default ColLeft