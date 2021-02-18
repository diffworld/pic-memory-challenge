import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';

export default function Header() {
    return (
        <Navbar bg="light" expand="lg">
            <Container className="justify-content-between">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <div>
                    SCORE: 00
                </div>
            </Container>
        </Navbar>
    )
}
