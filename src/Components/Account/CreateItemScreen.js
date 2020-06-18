import React, { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { logOutUser } from "../../firebase/services";
import FileBase64 from "react-file-base64";
import EditorText from "./EditorText";
import EditItem from "./EditItem";
import "./index.css";
import { setItem, delCategory, delItem } from "../../firebase/services";
import { MDBDataTable } from "mdbreact";

const DelModal = (props) => {
  // console.log("DelModal", props);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (props.changeCategory || props.changeItem) {
      handleShow();
    }
  }, [props]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {props.changeCategory ? (
            <Modal.Title>
              Удалить категорию {props.changeCategory} ?
            </Modal.Title>
          ) : (
            <Modal.Title>Удалить товар {props.changeItem?.name} ?</Modal.Title>
          )}
          {/* <Modal.Title>Удалить категорию {props.changeCategory} ?</Modal.Title> */}
        </Modal.Header>
        {/* <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body> */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (props.changeCategory) {
                console.log(props.changeCategory);
                delCategory(props.changeCategory);
              } else {
                console.log(props.changeItem);
                delItem(props.changeItem);
                props.setAllBase({});
              }
              // delCategory(props.changeCategory)
              handleClose();
            }}
          >
            УДАЛИТЬ
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const ListCtegory = (props) => {
  const [changeCategory, setChangeCategory] = useState("");
  let listCat;
  const {
    allbase: {
      allbase: { allCollections },
    },
  } = props;
  if (Array.isArray(allCollections)) {
    listCat = allCollections.map((el) => {
      // console.log(el);
      return {
        category: el,
        clickEvent: () => {
          console.log(el);
          setChangeCategory(el);
          // delCategory(el)
        },
      };
    });
  }

  const [isShowMyOrders, setisShowMyOrders] = useState(false);
  const data = {
    columns: [
      {
        label: "Category",
        field: "category",
        sort: "asc",
        // width: 150
      },
    ],
    rows: listCat,
  };
  return (
    <div>
      {isShowMyOrders ? (
        <div>
          <MDBDataTable striped bordered small hover data={data} />
          <DelModal changeCategory={changeCategory} />
        </div>
      ) : (
        <div className="logout-btn">
          <Button
            variant="primary"
            color="primary"
            onClick={() => {
              setisShowMyOrders(true);
            }}
          >
            Удалить категорию из списка со всем товаром
          </Button>
        </div>
      )}
    </div>
  );
};

const ListItem = (props) => {
  // console.log("ListItem", props);
  const [changeItem, setChangeItem] = useState("");
  let listProduct;
  const {
    allbase: {
      allbase: { allBase, setAllBase },
    },
  } = props;
  listProduct = Object.values(allBase).map((el) => {
    return {
      ...el,
      clickEvent: () => {
        // console.log(el);
        setChangeItem(el);
        // delItem(el)
      },
    };
  });
  const [isShowMyOrders, setisShowMyOrders] = useState(false);
  const data = {
    columns: [
      {
        label: "Category",
        field: "category",
        sort: "asc",
        // width: 150
      },
      {
        label: "Discription",
        field: "discription",
        sort: "asc",
        // width: 150
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        // width: 150
      },
      {
        label: "Brand",
        field: "brand",
        sort: "asc",
        // width: 150
      },
      {
        label: "Price",
        field: "price",
        sort: "asc",
        // width: 150
      },
    ],
    rows: listProduct,
  };
  return (
    <div>
      {isShowMyOrders ? (
        <div>
          <MDBDataTable striped bordered small hover data={data} />
          <DelModal changeItem={changeItem} setAllBase={setAllBase} />
        </div>
      ) : (
        <div className="logout-btn">
          <Button
            variant="primary"
            // className={buttonOrder}
            color="primary"
            onClick={() => {
              setisShowMyOrders(true);
            }}
          >
            Удалить еденицу товара
          </Button>
        </div>
      )}
    </div>
  );
};

const CreateItemScreen = (props) => {
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [allDiscription, setAllDiscription] = useState("");
  const [brand, setBrand] = useState("");
  const [showModal, setShowModal] = useState(false);

  const getFiles = (files) => {
    setImageUrl(files[0].base64);
  };

  return (
    <>
      <div className="logout-btn">
        <Button variant="primary" onClick={logOutUser}>
          LogOut(Выход)
        </Button>
      </div>
      <EditItem allbase={props} />
      <ListCtegory allbase={props} />
      <ListItem allbase={props} />
      <Form>
        <Form.Group controlId="formBasicCategory">
          <Form.Label>Категория</Form.Label>
          <Form.Control
            type="text"
            placeholder="Категория"
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicBrand">
          <Form.Label>Бренд</Form.Label>
          <Form.Control
            type="text"
            placeholder="Бренд"
            onChange={(e) => setBrand(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicName">
          <Form.Label>Наименование</Form.Label>
          <Form.Control
            type="text"
            placeholder="Наименование"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicDiscription">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            type="text"
            placeholder="Описание"
            onChange={(e) => setDiscription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPrice">
          <Form.Label>Цена</Form.Label>
          <Form.Control
            type="text"
            placeholder="Цена"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <EditorText setAllDiscription={setAllDiscription} />
        {/* <Form.Label>Подробное описание</Form.Label> <br />
        <InputGroup>
          <FormControl
            onChange={(e) => setAllDiscription(e.target.value)}
            as="textarea"
            aria-label="With textarea"
          />
        </InputGroup> */}
        <СheckModal showModal={{ showModal, setShowModal }} />
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (
              category &&
              name &&
              discription &&
              price &&
              imageUrl &&
              allDiscription &&
              brand
            ) {
              setItem(
                category,
                name,
                discription,
                price,
                imageUrl,
                allDiscription,
                brand
              );
            } else {
              setShowModal(true);
              console.log("не все заполнено");
            }

            // setName('')
          }}
        >
          Submit
        </Button>
      </Form>
      <div className="logout-btn">
        <Button className="btnImgLoad">
          <FileBase64 multiple={true} onDone={getFiles.bind(this)} />
        </Button>
      </div>

      <div className="text-center">
        {imageUrl ? <img src={imageUrl} alt="" /> : null}
        {/* {this.state.files.map((file, i) => {
                    return <img key={i} src={file.base64} />
                })}
                <img src="" /> */}
      </div>

      {/* <AddImg /> */}
    </>
  );
};

export const СheckModal = (props) => {
  // console.log('СheckModal', props.showModal)
  const {
    showModal: { setShowModal, showModal },
  } = props;
  // const [show, setShow] = useState(showModal);

  const handleClose = () => setShowModal(false);
  // const handleShow = () => setShow(true);

  // useEffect(() => {
  //   if (props.changeCategory || props.changeItem) {
  //     handleShow();
  //   }
  // }, [props]);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Не все поля заполнены</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateItemScreen;
