// ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
    const { id } = useParams(); // Retrieve the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product details based on the ID
        axios.get(`/api/product/${id}`)
            .then(response => {
               // console.log(response.data.product)
                setProduct(response.data.product);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching product details');
                setLoading(false);
            });
    }, [id]); // Re-run the effect if the ID changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            {product ? (
                <div className="card col-md-6 mb-6" >
                    <img
                        src={`${import.meta.env.VITE_STORAGE_PATH}${product.image}`}
                        className="card-img-top"
                        alt={product.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><strong>Price: ${product.price}</strong></p>
                        <a href="#" className="btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
};

export default ProductDetail;
