import React from 'react';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

export function NavBar() {

    return (
        <Nav>
            <Nav.Item>
                <Nav.Link disabled>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link>Incidents</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled>Processes</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link disabled>Documents</Nav.Link>
            </Nav.Item>
        </Nav>
    );
}