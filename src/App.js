import React from 'react';
import { useMachine } from '@xstate/react';
import { incidentsMachine } from './machine/incidentsMachine';

import { IncidentsList } from './compounds/IncidentsList';
import { IncidentCreator } from './compounds/IncidentCreator';
import { NavBar } from './compounds/NavBar';

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function App() {
    const [state, send] = useMachine(incidentsMachine);

    return (
        <Container>
            <NavBar />
            <Row hidden={ !state.matches('incidentsList') }>
                <Col xs={10}>
                    <h1>Incidents List</h1>
                </Col>
                <Col>
                    <Button 
                            variant="success"
                            hidden={ !state.matches('incidentsList') }
                            onClick={ () => send('CREATE') }
                        >
                            +Create new
                    </Button>
                </Col>
            </Row>
            <Row hidden={ !state.matches('incidentsList') }>
                <Col xs={10}>
                    <IncidentsList state={state}/>
                </Col>
                <Col></Col>
            </Row>
            <Row hidden={ !state.matches('creatingIncident') }>
                <IncidentCreator incidentCreator={ state.context.incidentCreatorM }/>
            </Row>
        </Container>
    );
}

export default App;
