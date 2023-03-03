import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

const cartIteams = [{ id: "1", name: "sushui", amount: 3, price: "12.99" }].map(
  (iteam) => <li>{iteam.name}</li>
);

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasIteam = cartCtx.iteams.length > 0;

  const removeHandler = (id) => {};

  const addHandler = (iteam) => {};

  const cartIteams = (
    <ul className={classes['cart-items']}>
      {cartCtx.iteams.map((iteam) => (
        <CartItem
          key={iteam.id}
          price={iteam.price}
          name={iteam.name}
          amount={iteam.amount}
          onAdd={addHandler.bind(null,iteam)}
          onRemove={removeHandler.bind(null,iteam.id)}
        />
      ))}
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
