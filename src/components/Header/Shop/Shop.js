import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState([])

    const [displayProducts, setdisplayProducts] = useState([]);
    useEffect(() => {

        // console.log('Product API Called')
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setdisplayProducts(data)
                // console.log('Product Received');

            });
    }, [])


    useEffect(() => {
        // console.log(' Local Storage Called')
        const savedCart = getStoredCart();
        if (products.length) {
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key]
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }

            }
            setCart(storedCart)
            // console.log(storedCart);
        }
    }, [products])
    const HandleaddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);

        // Save to local storage 
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
        setdisplayProducts(matchedProducts);

        console.log(matchedProducts.length);
    }
    return (

        <div>
            <div className="search-container">
                <input type="text"
                    onChange={handleSearch}
                    placeholder='Search Product' />
            </div>
            <div className='shop-container'>
                <div className="product-container">

                    <h3>Products:{displayProducts.length}</h3>
                    {
                        displayProducts.map(product => <Product product={product}
                            key={product.key}
                            HandleaddToCart={HandleaddToCart}

                        ></Product>)
                    }


                </div>
                <div className="car-container">


                    <Cart cart={cart}></Cart>

                </div>

            </div>
        </div>
    );
};

export default Shop;