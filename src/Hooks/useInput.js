import React, { useState , useReducer } from "react";

const initialState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }
  return inputStateReducer;
};

const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const enterValueIsValid = validateValue(inputState.value);
  const hasError = inputState.isTouched && !enterValueIsValid;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const resetForm = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: enterValueIsValid,
    hasError: hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetForm,
  };
};

export default useInput;
