import React, { useReducer } from "react";
import { validate } from "../../util/validators";
import "./Input.css";
const inputReducer = (state, action) => {
  // we need to retrun new state
  switch (action.type) {
    case "Change":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.val, action.validators),
      };
    case "Touch":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};
const Input = (props) => {
  const ChangeHandler = (e) => {
    dispatch({
      type: "Change",
      val: e.target.value,
      validators: props.validators,
    });
  };
  /* manage state in component , gives you a function you can call which updates the state and re-render
  the component , it used for complex states, interconnected state
  */
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false,
  });
  const touchHandler = () => {
    dispatch({ type: "Touch" });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={ChangeHandler}
        value={inputState.value}
        onBlur={touchHandler}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={ChangeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
