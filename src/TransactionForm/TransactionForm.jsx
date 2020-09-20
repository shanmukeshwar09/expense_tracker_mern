import React, { useEffect, useRef } from "react";
import styles from "./TransactionForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  addIncome,
  clearForm,
  updateHistory,
} from "../Redux/Actions";

const options = [
  {
    value: "Income",
    key: 1,
  },
  {
    value: "Expense",
    key: 2,
  },
];

export const TransactionForm = () => {
  const name = useRef();
  const amount = useRef();
  const type = useRef("Income");

  const dispatch = useDispatch();
  const state = useSelector((state) => state.currentAction);
  const editPayload = useSelector((state) => state.editPayload);

  useEffect(() => {
    if (editPayload.type) {
      name.current.value = editPayload.description;
      amount.current.value = editPayload.amount;
      type.current.value = editPayload.type;
    }
  }, [editPayload]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (state === "ADD") {
      if (type.current.value === "Income") handleIncome();
      else handleExpense();
    } else {
      dispatch(
        updateHistory(
          amount.current.value,
          name.current.value,
          type.current.value
        )
      );
      dispatch(clearForm());
    }

    resetInputs();
  };

  const handleIncome = () => {
    dispatch(addIncome(amount.current.value, name.current.value));
  };

  const handleExpense = () => {
    dispatch(addExpense(amount.current.value, name.current.value));
  };

  const resetInputs = () => {
    amount.current.value = "";
    name.current.value = "";
  };

  return (
    <div className={styles.container}>
      <span className="title">{state.toUpperCase()} Transactions</span>
      <hr className="hr v" />
      <form onSubmit={handleSubmit}>
        <input
          required
          className={styles.input}
          ref={name}
          type="text"
          placeholder="Transaction name"
        />
        <br />
        <input
          required
          className={styles.input}
          ref={amount}
          type="number"
          placeholder="Amount"
        />
        <br />
        <select
          required
          ref={type}
          className={`${styles.input} ${styles.select}`}
        >
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>
        {state === "ADD" ? (
          <button type="submit" className={`${styles.button} g`}>
            ADD
          </button>
        ) : (
          <div className={styles.buttonGrid}>
            <button type="submit" className="r">
              EDIT
            </button>
            <button
              onClick={() => {
                dispatch(clearForm());
                resetInputs();
              }}
            >
              CANCEL
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
