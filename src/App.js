import './App.scss';
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
            <Col lg={12} xl={12}>
                <Options />
            </Col>
            <Col lg={12} xl={12}>
              <GameUI />
            </Col>
          </Row>
        </Container>
      </div>
    </GamerProvider>
  );
}

export default App;
