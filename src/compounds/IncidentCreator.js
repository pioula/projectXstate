import React from 'react';
import { General } from './General';
import { Location } from './Location';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export function IncidentCreator({ incidentCreator }) {
    if (!incidentCreator || incidentCreator.state.matches('idle')) {
        return (
            <div></div>
        );
    }
    
    return (
        <Container>
            <Row>
                <Col xs={10}>
                    <h1>New incident</h1>
                </Col>
                <Col> 
                    <Button
                        variant="success"
                        onClick={ () => incidentCreator.send('SAVE') }>
                        Save
                    </Button>{'                      '}
                    <Button 
                        variant="light"
                        onClick={ () => incidentCreator.send("CANCEL") }>
                        Cancel
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Tabs
                        id="incident-tabs"
                        activeKey={ incidentCreator.state.value.form }
                        onSelect={(k) => incidentCreator.send(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="general" title="General">
                            <General machine={ incidentCreator.state.context.generalM }/>
                        </Tab>
                        <Tab eventKey="location" title="Location">
                            <Location machine={ incidentCreator.state.context.locationM }/>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col  xs={10}>
                </Col>
                <Col>
                    <Button 
                        variant="primary"
                        hidden={ incidentCreator.state.matches({ form: 'location' }) }
                        onClick={ () => incidentCreator.send('NEXT') }>
                        Next
                    </Button>
                    <Button
                        variant="light"
                        hidden={ incidentCreator.state.matches({ form: 'general'}) }
                        onClick={ () => incidentCreator.send('BACK') }>
                        Back
                    </Button>
                </Col>
            </Row>
        </Container>  
    );
}