import React from 'react';
import './Product.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {

    // console.log(props)

    const { name, img, price, seller, stock } = props.product;

    const icon = <FontAwesomeIcon icon={faShoppingCart} />;

    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-details'>
                <h4>{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: ${price}</p>
                <p><small>Only {stock}, Order Soon...</small></p>
                <button
                    onClick={() => props.HandleaddToCart(props.product)}
                    className='button'>{icon} Add To Cart</button>
            </div>
        </div>
    );
};

export default Product;