import React, { useContext } from 'react'
import { Navbar, Container, Image } from 'react-bootstrap';
import { gamerContext } from '../context/Gamer';

import '../assets/css/Header.scss';

export default function Header() {

    const { score, gameNum } = useContext(gamerContext);

    return (
        <Navbar expand="lg">
            <Container className="justify-content-between">
                <Navbar.Brand>
                    <Image src="/logo.png" />
                </Navbar.Brand>
                <div className="score">
                    <div>SCORE</div>
                    <div className="scorenum">
                        {(!score) ? '0' : score}
                    </div>
                </div>
            </Container>
        </Navbar>
    )
}
