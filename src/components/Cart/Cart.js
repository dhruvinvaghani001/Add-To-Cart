import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [actionButton, setActionButton] = useState(true);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [issubmitting, setIssubmitting] = useState(false);
  const hasIteam = cartCtx.iteams.length > 0;
  const [didsubmit, setDidSubmit] = useState(false);

  const removeHandler = (id) => {
    cartCtx.removeIteam(id);
  };

  const addHandler = (iteam) => {
    cartCtx.addIteam({ ...iteam, amount: 1 });
  };

  const handleOrder = () => {
    setIsCheckout(true);
    setActionButton(false);
  };

  const cartIteams = (
    <ul className={classes["cart-items"]}>
      {cartCtx.iteams.map((iteam) => (
        <CartItem
          key={iteam.id}
          price={iteam.price}
          name={iteam.name}
          amount={iteam.amount}
          onAdd={addHandler.bind(null, iteam)}
          onRemove={removeHandler.bind(null, iteam.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button onClick={props.onhiddenCart} className={classes["button--alt"]}>
        Close
      </button>
      {hasIteam && (
        <button onClick={handleOrder} className={classes.button}>
          Order
        </button>
      )}
    </div>
  );

  const submitHandler = async (userData) => {
    setIssubmitting(true);
    const response = await fetch(
      "https://fir-5b228-default-rtdb.firebaseio.com/cartdata.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedIteams: cartCtx.iteams,
        }),
      }
    );
    setIssubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  const cartModelcontet = (
    <React.Fragment>
      {cartIteams}
      {!hasIteam && (
        <div>
          <h2>No Product Added to Cart</h2>
        </div>
      )}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout
          onCancel={props.onhiddenCart}
          onConfirm={submitHandler}
        ></Checkout>
      )}
      {actionButton && modalActions}
    </React.Fragment>
  );

  const issubmittingModelCOnetent = <p>Sending .....</p>;
  const didSubmitContebnt = <p>Sucessfully..</p>;
  return (
    <Modal onClose={props.onhiddenCart}>
      {!issubmitting && !didsubmit && cartModelcontet}
      {issubmitting && issubmittingModelCOnetent}
      {!issubmitting && didsubmit && didSubmitContebnt}
    </Modal>
  );
};

export default Cart;
