import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Home = () => {

    const [products , setProducts] = useState([]);

    useEffect(()=>{
        axios.get('/api/products')
             .then(res =>{
                    setProducts(res.data);
             })
             .catch(error=>{
                 console.log('Error while fetching',error);
             })
        

    },[]);


    return (
        <div className="container">
            <h1 className="my-4">Product List</h1>
            <div className="row">
                {products.map(product => (
                    <div className="col-md-4 mb-4" key={product.id}>
                     <Link to={`/product/${product.id}`}>
                        <div className="card">
                        <img
                            src={`${import.meta.env.VITE_STORAGE_PATH}${product.image}`}
                            className="card-img-top"
                            alt={product.image}
                        />
                            <div className="card-body">
                                <h5 className="card-title">{product.title}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text "><strong>Price: ${product.price}</strong></p>
                                
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Home