import React,{useContext} from "react";
import classes from './MealIteam.module.css';
import MealIteamForm from "./MealIteamForm";
import CartContext from "../../../store/cart-context";

const MealIteam = (props) => {
  const price = `$ ${props.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addTocartHandler = amount => {
    cartCtx.addIteam({
      id:props.id,
      name:props.name,
      amount:amount,
      price:props.price,
    })
  }

  return (
    <>
      <li className={classes.meal}>
        <div>
          <h3>{props.name}</h3>
          <div className={classes.description}>{props.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
        <MealIteamForm id={props.id} onAddToCart={addTocartHandler}/>
        </div>
      </li>
    </>
  );
};

export default MealIteam;
