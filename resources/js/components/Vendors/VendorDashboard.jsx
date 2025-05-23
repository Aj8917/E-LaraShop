import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Modal, Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import asyncHandler from '../../util/asyncHandler';
import axios from 'axios';
import { handleError, handleResponse } from '../../util/StatusError';

const VendorDashboard = () => {

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShow(false);
  
  const handleShow = () => {
    setShow(true);
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setImage(null);
  }

  const handleCloseEdit = () => {
    setShowEdit(false);
    setSelectedProduct(null);
  }; 

  const handleShowEdit = (product) => {
    setSelectedProduct(product);
    setTitle(product.title);
    setDescription(product.description);
    setPrice(product.price);
    setQuantity(product.quantity);
    setImage(null); // Reset image for upload
    setShowEdit(true);
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem('token');
  
  const handleSubmit = asyncHandler(async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    try {
      const response = await axios.post('api/vendor', { title, description, price, quantity, image }
        , {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token if needed
            'Content-Type': 'multipart/form-data',
          }
        });
      handleResponse(response, response.data)
      fetchProducts()
    } catch (error) {
      handleError(error);
    }

    handleClose();
  });

  const handleEditSubmit = asyncHandler(async (e) => {
    e.preventDefault();
    console.log(title);
    try {
      const response = await axios.put(
        `/api/vendor/${selectedProduct.id}`,
        { title, description, price, quantity},
        {
          headers: {
            Authorization: `Bearer ${token}`,
           
          },
        }
      );
      handleResponse(response, response.data);
      fetchProducts();
    } catch (error) {
      handleError(error);
    }
    handleCloseEdit();
  });

  const handleDelete = asyncHandler(async (productId) => {
    try {
      const response = await axios.delete(`/api/vendor/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleResponse(response, response.data);
      fetchProducts(); // Refresh the product list
    } catch (error) {
      handleError(error);
    }
  });
  
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/vendor', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setProducts(res.data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const filteredProducts = Array.isArray(products)
  ? products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toString().includes(searchTerm)
    )
  : [];




  return (
    <div className="container">
      <h1 className="my-4">Vendor Dashboard</h1>

      <Row className="align-items-center mb-3">
        <Col>
          <Form.Control 
                placeholder="Add your item here..." 
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}  
            />
        </Col>
        {/* <Col xs="auto">
          <Button variant="secondary">Submit</Button>
        </Col> */}
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
      {/* Edit Product Modal */}
      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formTitle">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Update Product name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Update Price"
                required
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Update Quantity"
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
                placeholder="Update description"
              />
            </Form.Group>
            {/* <Form.Group controlId="formFile" className="mt-3">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group> */}
            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
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



      <div className="d-flex justify-content-center align-items-center flex-column min-vh-50  cart">
        <div className="text-center" style={{ color: 'black' }}>
          {products.length > 0 ? (
            <table className="table table-boardered">
              <thead>
                <tr>
                  <th>product ID</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>

                  <th>Upload date</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={index}>
                    <td><img
                      src={`${import.meta.env.VITE_STORAGE_PATH}${product.image}`}
                      alt="product" style={{ width: '50px', height: '50px' }}
                    /></td>
                    <td>{product.title}</td>
                    <td title={product.description}>
                      {product.description.length > 50
                        ? `${product.description.substring(0, 50)}...`
                        : product.description}
                    </td>
                    <td>{product.quantity}</td>
                    <td>${product.price}</td>
                    <td>{product.created_at}</td>
                    <td>
                    <i
                        className="bi bi-pencil-square"
                        onClick={() => handleShowEdit(product)}
                        style={{ cursor: 'pointer' }}
                      ></i>

                    </td>
                    <td>
                      <i class="bi bi-trash-fill" 
                      onClick={() => handleDelete(product.id)}
                      style={{ cursor: 'pointer' }}></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No product details available.</p>
          )}
        </div>

      </div>



    </div>
  );
};

export default VendorDashboard;
