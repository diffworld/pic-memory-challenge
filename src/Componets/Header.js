import React, { useContext } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { gamerContext } from '../context/Gamer';

export default function Header() {

    const { score } = useContext(gamerContext);

    return (
        <Navbar bg="light" expand="lg">
            <Container className="justify-content-between">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <div>
                    SCORE: {(!score) ? '0' : score}
                </div>
            </Container>
        </Navbar>
    )
}
