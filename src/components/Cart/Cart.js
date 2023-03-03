import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const cartIteams = [{ id: "1", name: "sushui", amount: 3, price: "12.99" }].map(
  (iteam) => <li>{iteam.name}</li>
);

const overlays = document.getElementById("overlays");

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasIteam = cartCtx.iteams.length > 0;

  const cartIteams = (
    <ul className={classes["cart-iteams"]}>
      {cartCtx.iteams.map((iteam) => {
        <li>{iteam.name}</li>;
      })}
    </ul>
  );

  return (
    <Modal onClose={props.onhiddenCart}>
      {cartIteams}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onhiddenCart} className={classes["button--alt"]}>
          Close
        </button>
        {hasIteam && (
          <button onClick={props.onhiddenCart} className={classes.button}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
