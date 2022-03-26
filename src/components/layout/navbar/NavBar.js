import React from 'react'

import { Navbar, Nav } from 'react-bootstrap';


import './NavBar.css'

export const NavBar = () => {

    return (
        <Navbar bg="light" expand="lg">
            <div className="nav-bar">
                <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="nav-items">
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contributors">Contributors</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )


}