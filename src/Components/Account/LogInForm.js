
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'

import { setUser } from '../../firebase/services'

const LogInForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={e => setEmail(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
            </Form.Group>
            <Button
                variant="primary"
                type="submit"
                onClick={(e) => {
                    e.preventDefault()
                    console.log(email, password, 'click')
                    setUser(email, password)
                }}
            >
                Submit
                </Button>
        </Form>
    )
}

export default LogInForm