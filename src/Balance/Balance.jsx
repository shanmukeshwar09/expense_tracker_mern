import React from "react";
import styles from "./Balance.module.css";
import { useSelector } from "react-redux";

export const Balance = () => {
  const amount = useSelector((state) => state.balance);
  return (
    <>
      <div className={styles.container}>
        <span className="title">Balance</span>
        <span className={styles.money}>₹{amount}</span>
      </div>
      <hr className="hr v" />
    </>
  );
};
