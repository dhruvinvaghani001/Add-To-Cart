import React, { useState } from "react";
import { useRef } from "react";
import classes from "./checkout.module.css";

const validate = (value) => value.trim() === "";
const postlcodeValidate = (value) => value.trim() !== 5;

const Checkout = (props) => {
  const nameRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const postlcodeRef = useRef();

  const [forValidity, setFormValidity] = useState({
    name: true,
    street: true,
    postlcode: true,
    city: true,
  });
  console.log(setFormValidity.name);
  const confirmHandler = (e) => {
    e.preventDefault();
    const enterName = nameRef.current.value;
    const enterStreet = streetRef.current.value;
    const enterPostlocode = postlcodeRef.current.value;
    const enterCity = cityRef.current.value;

    const nameIsValid = !validate(enterName);
    const streetIsValid = !validate(enterStreet);
    const postlcodeIsValid = postlcodeValidate(enterPostlocode);
    const cityIsValid = !validate(enterCity);

    setFormValidity({
      name: nameIsValid,
      street: streetIsValid,
      postlcode: postlcodeIsValid,
      city: cityIsValid,
    });

    const formIsValid =
      nameIsValid && streetIsValid && postlcodeIsValid && cityIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
      name: enterName,
      street: enterStreet,
      postlcode: enterPostlocode,
      city: enterCity,
    });
  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameRef} />
        {!forValidity.name && (
          <p className={classes.error}>Your name is not valid </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="adress">Street</label>
        <input type="text" id="street" ref={streetRef} />
        {!forValidity.street && (
          <p className={classes.error}> Street is not valid </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="postlcode">PostlCode</label>
        <input type="text" id="postlcode" ref={postlcodeRef} />
        {!forValidity.postlcode && (
          <p className={classes.error}> postal code is not valid </p>
        )}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityRef} />
        {!forValidity.city && (
          <p className={classes.error}> city is not valid </p>
        )}
      </div>

      <div className={classes.actions}>
        <button className={classes.button} type="button">
          cancel
        </button>
        <button className={classes.submit} type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
