import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  iteams: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    //adding to state to  show cart meanu
    case "ADD":
      const updatedTotalAmount =
        state.totalAmount + action.iteam.price * action.iteam.amount;

      const existingCartIteamIndex = state.iteams.findIndex(
        (iteam) => iteam.id === action.iteam.id
      );
      const existingCartIteamn = state.iteams[existingCartIteamIndex];

      let updatedIteams;

      if (existingCartIteamn) {
        const updatedIteam = {
          ...existingCartIteamn,
          amount: existingCartIteamn.amount + action.iteam.amount,
        };
        updatedIteams = [...state.iteams];
        updatedIteams[existingCartIteamIndex] = updatedIteam;
      } else {
        updatedIteams = state.iteams.concat(action.iteam);
      }

      return { iteams: updatedIteams, totalAmount: updatedTotalAmount };
      break;

    // removinf logic from cart menu
    case "REMOVE":
      const existingCartIteamIndexr = state.iteams.findIndex(
        (iteam) => iteam.id === action.id
      );
      const existingIteamr = state.iteams[existingCartIteamIndexr];
      const updtaedAmount = state.totalAmount - existingIteamr.price;

      let updatedIteamsr;

      if (existingIteamr.amount === 1) {
        updatedIteamsr = state.iteams.filter((iteam) => iteam.id != action.id);
      } else {
        const updatedIteamr = {
          ...existingIteamr,
          amount: existingIteamr.amount - 1,
        };
        updatedIteamsr = [...state.iteams];
        updatedIteamsr[existingCartIteamIndexr] = updatedIteamr;
      }
      return {iteams:updatedIteamsr,totalAmount:updtaedAmount};

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
