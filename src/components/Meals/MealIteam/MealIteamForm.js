import React, { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealIteamForm.module.css";

const MealIteamForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enterAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enterAmountNumber < 1 ||
      enterAmountNumber > 5
    ) {
      setAmountIsValid(false);
      return;
    }

    props.onAddToCart(enterAmountNumber);
  };

  return (
    <>
      <form className={classes.form} onSubmit={submitHandler}>
        <Input
          ref={amountInputRef}
          label="Amount"
          input={{
            id: `amount_${props.id}`,
            type: "number",
            min: "1",
            max: "5",
            step: "1",
            defaultValue: "1",
          }}
        />
        <button>+ Add</button>
        {!amountIsValid && <p>please enter amount in the range of (1-5)</p>}
      </form>
    </>
  );
};

export default MealIteamForm;
