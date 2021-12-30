import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsHigh, setBtnIsHigh] = useState(false);
  const ctx = useContext(CartContext);
  const numberOfItems = ctx.items.reduce((currNumber, item) => {
    return currNumber + item.amount;
  }, 0);
  const { items } = ctx;
  const btnClasses = `${classes.button}  ${btnIsHigh ? classes.bump : ""}`;
  useEffect(() => {
    if (ctx.items.length === 0) {
      return;
    }
    setBtnIsHigh(true);
    const timer = setTimeout(() => {
      setBtnIsHigh(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
