import React from "react";
import { Card, Container, Row } from "react-bootstrap";
// import { tempImg } from '../ItemCard/img'

import "./index.css";
import ItemCard from "../ItemCard/ItemCard";

const Item = (props) => {
  // console.log(props);
  return (
    <Container>
      <Row>
        <ItemCard item={{ ...props.item, isLoggedIn: props.isLoggedIn }} />
        {props.item.allDiscription ? (
          <Card>
            <Card.Body> <div dangerouslySetInnerHTML={{ __html: props.item.allDiscription }}></div></Card.Body>
          </Card>
        ) : null}
      </Row>
    </Container>
  );
};

export default Item;
