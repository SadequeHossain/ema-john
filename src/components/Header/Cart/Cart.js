import React from 'react';
import './Cart.css'

const Cart = (props) => {

    // console.log(props.cart)

    const { cart } = props;
    // console.log(cart)

    let total = 0;
    let subTotal = 0;
    let Tax = 0
    let totalQuantity = 0;
    for (const product of cart) {
        if (!product.quantity) {
            product.quantity = 1;
        }
        totalQuantity = totalQuantity + product.quantity;
        total = total + parseFloat(product.price) * totalQuantity;


        Tax = total * 0.15
        Tax = Tax.toFixed(2)
        subTotal = parseFloat(total) + parseFloat(Tax);
        subTotal = subTotal.toFixed(2)
    }
    return (
        <div>
            <h3>Order Summary</h3>
            <h5>Items Ordered:{totalQuantity}</h5>
            <h4>Total: ${total.toFixed(2)}</h4>
            <h4>Tax: ${Tax}</h4>
            <h4 className='SubTotal'>Subtotal: ${subTotal}</h4>


        </div>
    );
};

export default Cart;