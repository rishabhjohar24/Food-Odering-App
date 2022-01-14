import { useRef, useState } from "react";

import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredCity = cityInput.current.value;
    const enteredPostal = postalInput.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalIsValid = isFiveChars(enteredPostal);

    setFormsInputValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid;
    if (!formIsValid) {
      return;
    }
    props.orderSubmit({
      name: enteredName,
      postalCode: enteredPostal,
      street: enteredStreet,
      city: enteredCity,
    });
    props.hideForm();
  };
  const nameClass = `${classes.control} ${
    formsInputValidity.name ? "" : classes.invalid
  }`;

  const streetClass = `${classes.control} ${
    formsInputValidity.street ? "" : classes.invalid
  }`;

  const cityClass = `${classes.control} ${
    formsInputValidity.city ? "" : classes.invalid
  }`;

  const postalClass = `${classes.control} ${
    formsInputValidity.name ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" autoComplete="off" ref={nameInput} />
        {!formsInputValidity.name && <p>Please Enter a valid name!</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" autoComplete="off" ref={streetInput} />
        {!formsInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalClass}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" autoComplete="off" ref={postalInput} />
        {!formsInputValidity.postalCode && (
          <p>Please enter a valid Postal Code!</p>
        )}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" autoComplete="off" ref={cityInput} />
        {!formsInputValidity.city && <p>Please enter a valid City!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.hideForm}>
          Cancel
        </button>
        <button className={classes.submit} onClick={confirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
