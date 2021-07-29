import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

export function IncidentsList({ state }) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Incident Date</th>
                    <th>State</th>
                    <th>Priority</th>
                    <th>Risk of recurrence</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {state.context.incidents.map((incident) => (
                        <tr key={incident.title}>
                            <td>
                                {incident.title}
                            </td>
                            <td>
                                {incident.type}
                            </td>
                            <td>
                                {incident.incidentDate}
                            </td>
                            <td>
                                {incident.state}
                            </td>
                            <td>
                                {incident.priority}
                            </td>
                            <td>
                                {incident.riskOfRecurrence}
                            </td>
                            <td>
                                {incident.city}
                            </td>
                        </tr>
                    ))} 
            </tbody>
        </Table>        
    );
}