import React, { useRef } from "react";
import styles from "./TransactionForm.module.css";
import { useDispatch } from "react-redux";
import { addExpense, addIncome } from "../Redux/Actions";

export const TransactionForm = () => {
  const name = useRef();
  const amount = useRef();
  const dispatch = useDispatch();

  const handleIncome = () => {
    if (checkForDispatch()) {
      dispatch(addIncome(amount.current.value, name.current.value));
      resetInputs();
    }
  };

  const handleExpense = () => {
    if (checkForDispatch()) {
      dispatch(addExpense(amount.current.value, name.current.value));
      resetInputs();
    }
  };

  const checkForDispatch = () => {
    if (amount.current.value && name.current.value) return true;
    return false;
  };

  const resetInputs = () => {
    amount.current.value = "";
    name.current.value = "";
  };

  return (
    <div className={styles.container}>
      <span className="title">Add Transactions</span>
      <hr className="hr v" />
      <div>
        <input ref={name} type="text" placeholder="Transaction name" />
        <br />
        <input ref={amount} type="number" placeholder="Amount" />
        <br />
        <div className={styles.buttonGrid}>
          <button className="g" onClick={handleIncome}>
            INCOME
          </button>
          <button className="r" onClick={handleExpense}>
            EXPENSE
          </button>
        </div>
      </div>
    </div>
  );
};
