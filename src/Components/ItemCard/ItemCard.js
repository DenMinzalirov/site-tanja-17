import React, { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Formspree from "./formspree";

import { tempImg } from "./img";
import "./index.css";
// import { delItem } from "../../firebase/services";

const stylesGroop = {
  width: "18rem",
  margin: "5px",
};

// const stylesOnlyOneCard = {
//     margin: '5px',
//     flexDirection: 'row',
// }

const ItemCard = (props) => {
  let history = useHistory();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(props);
  if (Object.keys(props.item).length === 1) {
    console.log("пустой обьект");
    history.push("/");
  }
  return (
    <Card
      style={stylesGroop}
      // border="primary"
      className="card-item"
      onClick={(e) => {
        console.log(e.target);
        if (e.target.classList.contains("card-img-top")) {
          if (props.history) {
            props.history.push({
              pathname: "/item",
              state: props.item,
            });
          }
        }
      }}
    >
      <Card.Img
        variant="top"
        src={props.item.imageUrl ? props.item.imageUrl : tempImg}
      />
      <Card.Body>
        <Card.Title>{props.item.name}</Card.Title>
        <Card.Text>{props.item.discription}</Card.Text>
        <Button variant="primary">{props.item.price} BYN</Button>
        <Button
          variant="danger"
          onClick={(e) => {
            e.preventDefault();
            console.log("заказать");
            handleShow();
          }}
        >
          ЗАКАЗАТЬ
        </Button>
        {/* {props.item.isLoggedIn ? (
          <Button
            variant="warning"
            onClick={() => {
              // console.log(props)
              delItem(props.item);
            }}
          >
            DEL
          </Button>
        ) : null} */}
      </Card.Body>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Вы хотите купить {props.item.name}{" "}
            <a href="tel:+375295804093">
              <p className="h2 text-right telephoneModal mt-2">
                Звоните: +375(29)580-40-93
              </p>
            </a>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Или оставте свой номер телефона с вами свяжется наш менеджер
        </Modal.Body>
        <Modal.Footer>
          {/* <InputGroup size="sm" className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-sm">
                Ваш тел.:
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
            />
          </InputGroup> */}
          <Formspree />
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>
    </Card>
  );
};
export default ItemCard;
