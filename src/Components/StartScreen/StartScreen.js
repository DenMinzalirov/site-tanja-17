import React from 'react';
import { Container, Row } from 'react-bootstrap'

import ItemCard from '../ItemCard/ItemCard'
import './index.css'

const StartScreen = (props) => {
    const { location: { pathname } } = props
    // console.log(props)
    return (
        <Container fluid>
            <h1>{pathname.slice(1) === '' ? 'Весь товар' : pathname.slice(1)}</h1>
            <Row>
                {Object.values(props.allBase).map((el) => {
                    if (el.category === pathname.slice(1)) {
                        return <ItemCard {...props} key={el.name} item={el} />
                    }
                    if (pathname.slice(1) === '') {
                        return <ItemCard {...props} key={el.name} item={el} />
                    }
                })}
            </Row>
        </Container>
    )
}

export default StartScreen;