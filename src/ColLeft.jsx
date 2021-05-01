import React from 'react'
import ListModal from './ListModal'

import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';

import DictLogo from "./logosvg_mw.png"

import { auth } from "./firebase"

function ColLeft() {

    //Auth
    const signOut = () => auth.signOut();

    return (
        <Col lg={3} sm={3} style={{borderRight: "1px solid black", borderBottom: "1px solid black", padding: "32px"}}>
            <h1 style={{fontSize: "calc(1px + 5vw)"}}><strong>Word Collector</strong></h1>
            <hr></hr>

            {/** How to make these buttons dynamically change when resizing */}
            {/** FontSize below should be 150%, but needs to be 80 to display correctly on deploy */}
            <Row>
                <Button variant = "success" onClick={signOut} style = {{fontSize: "80%", width: "100%"}}><i>Sign Out</i></Button>
            </Row>
            <Row>
                <ListModal />
            </Row>
            <br></br>
            <Row>
                Uses the Merriam-Webster API
            </Row>
        </Col>
    )
}

export default ColLeft