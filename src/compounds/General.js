import React from 'react';
import Form from 'react-bootstrap/form';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';

const types = ['Accident', 'Automatic', 'Concern', 'COVID-19', 'Hazard', 'Injury', 'Near Miss', 'Non-Conformity', 'Unsafe Act'];
const states = ['New', 'In progress', 'Pending', 'Resolved', 'Closed', 'Invalid'];
const priorities = ['Critical', 'High', 'Medium', 'Low'];
const risks = ['High', 'Medium', 'Low'];

export function General({ machine }) {
    return (
        <Form noValidate validated={ machine.state.context.secondTry }>
            <Row className="mb-3">
                <Form.Group as={Col} md="6">
                    <Form.Label>Type*:</Form.Label>
                    <Form.Select
                        className="me-sm-2" 
                        defaultValue=""
                        onChange={(e) => {
                                        machine.send('TYPE_CHANGE', {value: e.target.value})
                                    }}
                        required
                    >
                        <option disabled={true} value=""> Select</option>
                        {types.map((type) => {
                            return <option key={type}>{type}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Field Type is required.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>Reported by:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                                        machine.send('REPORTED_BY_CHANGE', {value: e.target.value})
                                    }}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Contact number:</Form.Label>
                    <Form.Control 
                        type="number"
                        onChange={(e) => {
                                        machine.send('CONTACT_NUMBER_CHANGE', {value: e.target.value})
                                    }}
                    />
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Incident date*:</Form.Label>
                    <Form.Control 
                        type="date"
                        onChange={(e) => {
                                        machine.send('INCIDENT_DATE_CHANGE', {value: e.target.value})
                                    }}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Field Incident date is required.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="9">
                    <Form.Label>Title*:</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={ e => { 
                                    machine.send('TITLE_CHANGE', { value: e.target.value })
                                }}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Field Title is required.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>State*:</Form.Label>
                    <Form.Select 
                        className="me-sm-2" 
                        defaultValue=""
                        onChange={(e) => {
                                        machine.send('STATE_CHANGE', {value: e.target.value})
                                    }}
                        required
                    >
                        <option disabled={true} value=""> Select</option>
                        {states.map((state) => {
                            return <option key={state}>{state}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Field State is required.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Priority*:</Form.Label>
                    <Form.Select 
                        className="me-sm-2" 
                        defaultValue=""
                        onChange={(e) => {
                                        machine.send('PRIORITY_CHANGE', {value: e.target.value})
                                    }}
                        required
                    >
                        <option disabled={true} value=""> Select</option>
                        {priorities.map((priority) => {
                            return <option key={priority}>{priority}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Field Priority is required.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Risk of recurrence*:</Form.Label>
                    <Form.Select 
                        className="me-sm-2" 
                        defaultValue=""
                        onChange={(e) => {
                                        machine.send('RISK_OF_RECURRENCE', {value: e.target.value})
                                    }}
                        required
                    >
                        <option disabled={true} value=""> Select</option>
                        {risks.map((risk) => {
                            return <option key={risk}>{risk}</option>
                        })}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                        Field Risk of recurrence is required.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
        </Form>
    );
}