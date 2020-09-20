import React from "react";
import styles from "./History.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteIncome, deleteExpense, editForm } from "../Redux/Actions";

export const History = () => {
  const dispatch = useDispatch();
  const history = useSelector((state) => state.transactions);

  return (
    <div className={styles.container}>
      <span className="title">Transactions</span>
      <hr className="hr v" />
      {history.length ? (
        history.map((transaction, index) => (
          <div className={styles.cardComponent} key={index}>
            <div className={`${styles.historyCards} ${transaction.type}`}>
              <span className="text">{transaction.description}</span>
              <span className="text">₹{transaction.amount}</span>
            </div>
            <div className={styles.options}>
              <i
                className="fa fa-pencil pencil"
                onClick={() => dispatch(editForm(transaction))}
              ></i>
              <i
                className="fa fa-trash trash"
                onClick={() => {
                  if (transaction.type === "Income")
                    dispatch(deleteIncome(transaction.uid));
                  else dispatch(deleteExpense(transaction.uid));
                }}
              ></i>
            </div>
          </div>
        ))
      ) : (
        <div className={styles.null}>No Expenses Found</div>
      )}
    </div>
  );
};
