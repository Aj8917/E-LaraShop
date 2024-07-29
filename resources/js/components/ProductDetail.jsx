import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Loader from './Loader';

const ProductDetail = () => {
    const { id } = useParams(); // Retrieve the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
        

    useEffect(() => {
        // Fetch product details based on the ID
        axios.get(`/api/product/${id}`)
            .then(response => {
                setProduct(response.data.product);
                setLoading(false); // Set loading to false after data is fetched
                // Set document title based on product title
                document.title = response.data.product.title;
            })
            .catch(err => {
                setError('Error fetching product details');
                setLoading(false);
                // Set a generic title in case of an error
                document.title = 'Product Details';
            });
    }, [id]); // Re-run the effect if the ID changes

    const addToCart = () => {
        const cart = { ...product, quantity: Number(quantity) };
        setCart(prevCart => [...prevCart, cart]);
        alert(`${product.title} has been added to the cart with quantity ${quantity}`);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };
    

    if (loading) return <Loader />;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <Link to="/">
                    <Button variant="danger">
                        Go Back
                    </Button>
                </Link>
            </div>
            {product ? (
                <div className="card mx-auto" style={{ maxWidth: '600px' }}>
                    <img
                        src={`${import.meta.env.VITE_STORAGE_PATH}${product.image}`}
                        className="card-img-top"
                        alt={product.title}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <p className="card-text">{product.description}</p>
                        <p className="card-text"><strong>Price: ${product.price}</strong></p>
                        <p className="card-text"><strong>Qantity: </strong>
                            <select className="form-select" aria-label="Default select example" value={quantity} onChange={handleQuantityChange}>
                            <option selected>Select</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        </p>
                        <Button variant="primary" onClick={addToCart}>Add to Cart</Button>
                    </div>
                </div>
            ) : (
                <div>Product not found</div>
            )}
        </div>
    );
};

export default ProductDetail;
