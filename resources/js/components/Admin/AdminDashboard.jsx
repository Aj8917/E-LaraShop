import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';


import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import { toast } from 'react-toastify';
import NoEncryptionGmailerrorredIcon from '@mui/icons-material/NoEncryptionGmailerrorred';
const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchProducts = (page = 1) => {
    axios
      .get(`/api/products?page=${page}`)
      .then(res => {
        setProducts(res.data.data);
        setCurrentPage(res.data.current_page);
        setLastPage(res.data.last_page);
      })
      .catch(error => {
        console.error('Error while fetching', error);
      });
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      setCurrentPage(page);
    }
  };

  const refuseProduct = async(productId) => {
    try {
      const response = await axios.patch(`/api/products/${productId}/refuse`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      //  the API returns the updated `refuse` status for the product
      const updatedRefuse = response.data.flag_for_refuse;
      
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, refuse: updatedRefuse } : product
        )
      );
    } catch (error) {
      console.error('Error refusing product:', error);
      toast.error('Failed to update product');
    }
  };
  
  return (
    <div className="table-container">
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Decline</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1 + (currentPage - 1) * products.length}</td>
              <td>
                <img
                  src={`${import.meta.env.VITE_STORAGE_PATH}${product.image}`}
                  alt={product.title}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>
              <button className='refuseButton' onClick={() => refuseProduct(product.id)} >
              {product.refuse == '0' ?<EnhancedEncryptionIcon /> : <NoEncryptionGmailerrorredIcon /> } 
              </button>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination-container">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: lastPage }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === lastPage}
          />
        </Pagination>
      </div>
    </div>
  );
  
};

export default AdminDashboard;
