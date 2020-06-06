import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import { logOutUser } from '../../firebase/services'
import FileBase64 from 'react-file-base64';

import './index.css'
import { setItem } from '../../firebase/services'

const CreateItemScreen = () => {
    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [discription, setDiscription] = useState('')
    const [price, setPrice] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const getFiles = (files) => {
        setImageUrl(files[0].base64)
    }
    return (
        <>
            <div className='logout-btn'>
                <Button
                    variant="primary"
                    onClick={logOutUser}
                >
                    LogOut(Выход)
            </Button >
            </div>
            <Form>
                <Form.Group controlId="formBasicCategory">
                    <Form.Label>Категория</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Категория"
                        onChange={e => setCategory(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Наименование</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Наименование"
                        onChange={e => setName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicDiscription">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Описание"
                        onChange={e => setDiscription(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPrice">
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Цена"
                        onChange={e => setPrice(e.target.value)}
                    />
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault()
                        // console.log(category, name, discription, price, 'click')
                        setItem(category, name, discription, price, imageUrl)
                        // setName('')
                    }}
                >
                    Submit
                </Button>
            </Form>
            <FileBase64
                multiple={true}
                onDone={((getFiles.bind(this)))} />
            <div className="text-center">
                {
                    imageUrl ? 
                    <img src={imageUrl} /> :
                    null
                }
                {/* {this.state.files.map((file, i) => {
                    return <img key={i} src={file.base64} />
                })}
                <img src="" /> */}
            </div>

            {/* <AddImg /> */}
        </>

    )
}

export default CreateItemScreen
