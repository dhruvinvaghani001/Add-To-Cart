import React from "react";


const CartContext = React.createContext({
    iteams:[],
    totalAmount : 0 ,
    addIteam : (iteam)=>{},
    removeIteam : (id)=>{}
})
export default CartContext