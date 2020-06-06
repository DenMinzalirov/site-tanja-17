import React from 'react';
import { Card, Container, Row } from 'react-bootstrap'
// import { tempImg } from '../ItemCard/img'

import './index.css'
import ItemCard from '../ItemCard/ItemCard'

const Item = (props) => {
    // console.log(props)
    return (

        <Container>
            <Row>
                <ItemCard item={{ ...props.item }} />
                <Card>
                    <Card.Body>
                        Подробное описание наверно цена количество
                        1111111111111111111111111111111111111111111
                        111111111111111111111111111111111111111111111
                        111111111111111111111111111111111111111111111
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}

export default Item