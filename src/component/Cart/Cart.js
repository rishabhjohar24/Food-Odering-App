import React, { useContext, useState } from "react";

import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemAdd = (item) => {
    ctx.addItem(item);
  };

  const cartItemRemove = (id) => {
    ctx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const checkoutHandler = () => {
    setIsCheckout(false);
  };

  const submitOrderHandler = async (userData) => {
    try {
      setIsOrdering(true);
      const response = await fetch(
        "https://moreonreact-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({ user: userData, orderItems: ctx.items }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      setIsOrdering(false);
      setDidSubmit(true);
      ctx.clearCart();
    } catch (error) {
      console.log(error.message);
    }
  };
  const CartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          onRemove={cartItemRemove.bind(null, item.id)}
          onAdd={cartItemAdd.bind(null, item)}
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        >
          {item.name}
        </CartItem>
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout hideForm={checkoutHandler} orderSubmit={submitOrderHandler} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Succesfully sent the order.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {!isOrdering && !didSubmit && cartModalContent}
      {isOrdering && isSubmittingModalContent}
      {didSubmit && !isOrdering && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
