import React, { useState, useEffect } from 'react';
import { MDBDataTable } from "mdbreact";
import { Button, Form, Modal } from "react-bootstrap";
import EditorText from "./EditorText";
import { СheckModal } from './CreateItemScreen'
import FileBase64 from "react-file-base64";
import { setItem } from "../../firebase/services";

const EditModal = ({ show, setShow, curentEl }) => {
    console.log("EditModal", curentEl);

    useEffect(() => {
        setCategory(curentEl.category)
        setName(curentEl.name)
        setDiscription(curentEl.discription)
        setPrice(curentEl.price)
        setImageUrl(curentEl.imageUrl)
        setAllDiscription(curentEl.allDiscription)
        setBrand(curentEl.brand)
    }, [curentEl.allDiscription, curentEl.brand, curentEl.category, curentEl.discription, curentEl.imageUrl, curentEl.name, curentEl.price]
    )

    const handleClose = () => setShow(false);

    const [category, setCategory] = useState(curentEl.category);
    const [name, setName] = useState(curentEl.name);
    const [discription, setDiscription] = useState(curentEl.discription);
    const [price, setPrice] = useState(curentEl.price);
    const [imageUrl, setImageUrl] = useState(curentEl.imageUrl);
    const [allDiscription, setAllDiscription] = useState(curentEl.allDiscription);
    const [brand, setBrand] = useState(curentEl.brand);
    const [showModal, setShowModal] = useState(false);
    console.log('EditModal123', curentEl)

    const getFiles = (files) => {
        setImageUrl(files[0].base64);
    };

    // const handleShow = () => setShow(true);

    // useEffect(() => {
    //     handleShow();
    // }, []);
    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="example-modal-sizes-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Редактировать
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicCategory">
                            <Form.Label>Категория</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={curentEl.category}
                                placeholder="Категория"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicBrand">
                            <Form.Label>Бренд</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={curentEl.brand}
                                placeholder="Бренд"
                                onChange={(e) => setBrand(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Наименование</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={curentEl.name}
                                placeholder="Наименование"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicDiscription">
                            <Form.Label>Описание</Form.Label>
                            <Form.Control
                                type="text"
                                value={discription}
                                placeholder="Описание"
                                onChange={(e) => setDiscription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Цена</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={curentEl.price}
                                placeholder="Цена"
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <EditorText setAllDiscription={setAllDiscription} allDiscription={curentEl.allDiscription} />
                        <СheckModal showModal={{ showModal, setShowModal }} />
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={(e) => {
                                e.preventDefault();
                                console.log(category,
                                    name,
                                    discription,
                                    price,
                                    imageUrl,
                                    allDiscription,
                                    brand)
                                if (
                                    category &&
                                    name &&
                                    discription &&
                                    price &&
                                    imageUrl &&
                                    allDiscription &&
                                    brand
                                ) {
                                    // delItem(curentEl)
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
                        <img className='imgModalEdit' src={imageUrl} alt="" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

const EditItem = (props) => {
    // console.log(props)
    const { allbase: { allbase: { allBase } } } = props

    const [show, setShow] = useState(false);
    const [curentEl, setCurentEl] = useState('')

    // console.log(allBase)
    const [isShowEditOrders, setisShowEditOrders] = useState(false);
    const listProduct = Object.values(allBase).map((el) => {
        return {
            ...el,
            clickEvent: () => {
                setCurentEl(el)
                // console.log(el);
                setShow(true)
                // setChangeItem(el);
                // // delItem(el)
            },
        };
    });
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
        < div >
            {
                isShowEditOrders ?
                    <div>
                        <EditModal show={show} setShow={setShow} curentEl={curentEl} />
                        <MDBDataTable striped bordered small hover data={data} />
                    </div>
                    :
                    (
                        <div className="logout-btn">
                            <Button
                                variant="primary"
                                color="primary"
                                onClick={() => {
                                    setisShowEditOrders(true);
                                }}
                            >
                                Редактировать позицию
                            </Button>
                        </div>
                    )
            }
        </div >
    )
}

export default EditItem