import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  iteams: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const updatedIteam = state.iteams.concat(action.iteam);
      const updatedTotalAmount = state.totalAmount + (action.iteam.price * action.iteam.amount);
      return { iteams: updatedIteam, totalAmount: updatedTotalAmount };
      break;
    case "REMOVE":
      // return {iteams:[],}
      break;

    default:
      break;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addIteamToCartHandler = (iteam) => {
    dispatchCartAction({ type: "ADD", iteam: iteam });
  };
  const removeIteamFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    iteams: cartState.iteams,
    totalAmount: cartState.totalAmount,
    addIteam: addIteamToCartHandler,
    removeIteam: removeIteamFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
