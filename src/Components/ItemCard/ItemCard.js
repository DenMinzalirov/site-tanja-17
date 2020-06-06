import React from 'react';
import { Card, Button } from 'react-bootstrap'

import { tempImg } from './img'
import './index.css'
import { delItem } from '../../firebase/services'

const stylesGroop = {
    width: '18rem',
    margin: '5px'
}

// const stylesOnlyOneCard = {
//     margin: '5px',
//     flexDirection: 'row',
// }

const ItemCard = (props) => {
    // console.log(props)
    if (Object.keys(props.item).length === 0) {
        console.log('пустой обьект')
    }
    return (
        <Card
            style={stylesGroop}
            // border="primary"
            className='card-item'
            onClick={() => {
                if (props.history) {
                    props.history.push({
                        pathname: '/item',
                        state: props.item,
                    })
                }
            }}
        >
            <Card.Img variant="top" src={props.item.imageUrl ? props.item.imageUrl : tempImg} />
            <Card.Body>
                <Card.Title>{props.item.name}</Card.Title>
                <Card.Text>{props.item.discription}</Card.Text>
                <Button variant="primary">{props.item.price} BYN</Button>

                <Button
                    variant="warning"
                    onClick={() => {
                        // console.log(props)
                        delItem(props.item)
                    }}
                >DEL</Button>
            </Card.Body>
        </Card>
    )
}
export default ItemCard