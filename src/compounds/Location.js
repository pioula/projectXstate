import React from 'react';
import Form from 'react-bootstrap/form';
import Row from 'react-bootstrap/row';
import Col from 'react-bootstrap/col';

export function Location({ machine }) {

    return (
        <Form noValidate validated={ machine.state.context.secondTry }>
            <Row className="mb-3">
                <Form.Group as={Col} md="3">
                    <Form.Label>City*:</Form.Label>
                    <Form.Control
                        type="text"
                        onChange={(e) => {
                                        machine.send('CITY_CHANGE', {value: e.target.value})
                                    }}
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                            Field City is required.
                        </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label>Street</Form.Label>
                    <Form.Control 
                        type="text"
                        onChange={(e) => {
                                        machine.send('STREET_CHANGE', {value: e.target.value})
                                    }}
                    />
                </Form.Group>
            </Row>
        </Form>
    );
}