import { useContext } from "react";

import Modal from "../UI/Modal/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
const Cart = (props) => {
  const ctx = useContext(CartContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;
  const cartItemAdd = (item) => {
    ctx.addItem(item);
  };
  const cartItemRemove = (id) => {
    ctx.removeItem(id);
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
  return (
    <Modal onHideCart={props.onHideCart}>
      {CartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onHideCart}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
