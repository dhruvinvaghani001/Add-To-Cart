import CartContext from "./cart-context";
import { useReducer } from "react";


//default state of cart
const defaultCartState = {
  iteams: [],
  totalAmount: 0,
};


//reducer function for useReducer
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

    // removing logic from cart menu
    case "REMOVE":

      //to get  index of existing iteam
      const existingCartIteamIndexr = state.iteams.findIndex(
        (iteam) => iteam.id === action.id
      );

      //existing food  
      const existingIteamr = state.iteams[existingCartIteamIndexr];
      //amount should be reduce after removing from cart
      const updtaedAmount = state.totalAmount - existingIteamr.price;

      let updatedIteamsr;
      
      //if existing iteam count is one then we have to remove from cart
      if (existingIteamr.amount === 1) {
        updatedIteamsr = state.iteams.filter((iteam) => iteam.id !== action.id);
      } else {
        //we have to reduce amount of existing product 
        const updatedIteamr = {
          ...existingIteamr,
          amount: existingIteamr.amount - 1,
        };
        updatedIteamsr = [...state.iteams];
        //we have to update existing food and also have tyo push again in updated iteams
        updatedIteamsr[existingCartIteamIndexr] = updatedIteamr;
      }
      //returning state for updated iteam list and total amount
      return { iteams: updatedIteamsr, totalAmount: updtaedAmount };
      break;

    default:
      break;
  }
};

const CartProvider = (props) => {

  // here useReducerused to manage state of cart list
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

  //cart context which is passed thorught CartContext Provider
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
