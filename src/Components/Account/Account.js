import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap'
import { checkAuthStateChanged } from '../../firebase/services'

import LogInForm from './LogInForm'
import CreateItemScreen from './CreateItemScreen'

const Account = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        checkAuthStateChanged(setIsLoggedIn);
    }, [])
    // console.log('isLoggedIn', isLoggedIn)

    return (
        <Container>
            {isLoggedIn ?
                <CreateItemScreen /> :
                <LogInForm />
            }
        </Container>
    )
}

export default Account