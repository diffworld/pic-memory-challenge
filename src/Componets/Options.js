import React, { useContext } from 'react'
import { Form , Button} from 'react-bootstrap';
import { gamerContext } from '../context/Gamer';

export default function Options(props) {

    const { challenge, setChallenge, 
            cate, setCate, 
            isReset, setIsReset } = useContext(gamerContext);
    
    const handleChallengeChanged = (e) => {
        setChallenge(e.target.value);
    }
    const handleCateChanged = (e) => {
        setCate(e.target.value);
    }
    const handleResetClick = () => {
        let newIsReset = !isReset;
        setIsReset(newIsReset);
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="optionsForm.SelectChallenge">
                    <Form.Label>Challenges</Form.Label>
                    <Form.Control as="select" custom size="lg" onChange={handleChallengeChanged}>
                        <option value='6'>6 items</option>
                        <option value='9'>9 items</option>
                        <option value='12'>12 itmes</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="optionsForm.SelectPicCategory">
                    <Form.Label>Images Category</Form.Label>
                    <Form.Control as="select" custom size="lg" onChange={handleCateChanged}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                        <option value="lama">Lama</option>
                    </Form.Control>
                </Form.Group>
                <Button size="lg" onClick={() => handleResetClick()}>Reset</Button>            
            </Form>
        </div>
    )
}
