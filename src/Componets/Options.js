import React, { useContext } from 'react'
import { Form , Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import { gamerContext } from '../context/Gamer';

import '../assets/css/Options.scss';

export default function Options(props) {

    const { challenge, setChallenge, 
            cate, setCate, 
            gameNum, setGameNum } = useContext(gamerContext);
    
    const handleChallengeChanged = (e) => {
        setChallenge(e.target.value);
    }
    const handleCateChanged = (e) => {
        setCate(e.target.value);
    }
    const handleResetClick = () => {
        let curGameNum = parseInt(gameNum);
        setGameNum(curGameNum+1);
    }

    return (
        <Form className="optionsUI">
            <Row>
                <Col>
                    <Form.Group controlId="optionsForm.SelectChallenge">
                        <Form.Control as="select" custom size="lg" onChange={handleChallengeChanged}>
                            <option value='6'>Numbers</option>
                            <option value='6'>6 items</option>
                            <option value='8'>8 items</option>
                            <option value='12'>12 itmes</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="optionsForm.SelectPicCategory">
                        <Form.Control as="select" custom size="lg" onChange={handleCateChanged}>
                            <option value="">Category</option>
                            <option value="cat">Cat</option>
                            <option value="dog">Dog</option>
                            <option value="lama">Lama</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>            
        </Form> 
    )
}
