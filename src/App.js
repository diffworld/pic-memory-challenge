import './App.css';
import { GamerProvider } from './context/Gamer';

import Header from './Componets/Header';
import { Container, Row, Col } from 'react-bootstrap';
import Options from './Componets/Options';
import GameUI from './Componets/GameUI';

function App() {
  return (
    <GamerProvider>
      <div className="App">
        < Header />
        <Container>
          <Row>
            <Col sm={3}>
              <Options />
            </Col>
            <Col sm={9}>
              <GameUI />
            </Col>
          </Row>
        </Container>
      </div>
    </GamerProvider>
  );
}

export default App;
