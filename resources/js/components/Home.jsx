import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchProducts = (page = 1) => {
        axios.get(`/api/products?page=${page}`)
            .then(res => {
                setProducts(res.data.data); // The actual products are inside the 'data' array
               // setCurrentPage(res.data.current_page);
                setLastPage(res.data.last_page);
            })
            .catch(error => {
                console.log('Error while fetching', error);
            });
    };

    useEffect(() => {
        fetchProducts(currentPage); // Fetch products for the current page
        document.title = 'Welcome to E-Larashop';
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= lastPage) {
            setCurrentPage(page);
        }
    };


    return (
        <div className="container">
            <h1 className="my-4">Product List</h1>
            <div className="row">
                {products.map(product => {
                    const isOutOfStock = product.stock === 0;

                    return (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className={`card cart ${isOutOfStock ? 'disabled-card' : ''}`}>
                                <Link to={isOutOfStock ? "#" : `/product/${product.id}`} className={isOutOfStock ? "disabled-link" : ""}>
                                    <img
                                        src={`${import.meta.env.VITE_STORAGE_PATH}${product.image}`}
                                        className={`card-img-top ${isOutOfStock ? 'blurred' : ''}`}
                                        alt={`image of  ${product.title}`}

                                    />
                                </Link>
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text"><strong>Price: ${product.price}</strong></p>
                                    {isOutOfStock && <p className="text-danger">Out of Stock</p>}
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

            <div className="d-flex justify-content-center align-items-center mt-4 text-white dark:text-white/70">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn btn-warning mx-1"
                >
                    ←
                </button>
                <span> Page {currentPage} of {lastPage} </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    className="btn btn-warning mx-1"
                >
                    →
                </button>
            </div>
        </div>
    )
}

export default Home