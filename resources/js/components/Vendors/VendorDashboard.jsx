import React, { useState } from 'react';
import { Button, Row, Col, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import asyncHandler from '../../util/asyncHandler';
import axios from 'axios';
import { handleError, handleResponse } from '../../util/StatusError';

const VendorDashboard = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImage(null);
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = asyncHandler(async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    try {
      const response = await axios.post('api/vendor', { title, description, price, quantity, image }
        , {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add the token if needed
            'Content-Type': 'multipart/form-data',
          }
        });
      handleResponse(response, response.data)
    } catch (error) {
      handleError(error);
    }
    
    handleClose();
  });



  return (
    <div className="container">
      <h1 className="my-4">Vendor Dashboard</h1>

      <Row className="align-items-center mb-3">
        <Col>
          <Form.Control placeholder="Add your item here..." />
        </Col>
        <Col xs="auto">
          <Button variant="secondary">Submit</Button>
        </Col>
      </Row>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Product name" required />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Set Price .."
                required
              />
            </Form.Group>
            <Form.Group controlId='formQuantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type='number'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter Quantity"
                required
              />
            </Form.Group>
            <Form.Group controlId="formDescription" className="mt-3">
              <Form.Label>Item Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe it .." />
            </Form.Group>
            <Form.Group controlId="formFile" className="mt-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Row>
        <div className="col-lg-8 mx-auto">
          <div className="p-2 d-flex justify-content-between">
            <Button variant="warning" onClick={handleShow}>Add</Button>
          </div>

        </div>
      </Row>
    </div>
  );
};

export default VendorDashboard;
