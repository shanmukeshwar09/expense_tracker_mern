import React from "react";
import styles from "./TrackerCards.module.css";
import { useSelector } from "react-redux";

export const TrackerCards = () => {
  const cardsData = useSelector((state) => state);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <span className="title b">Balance</span>
        <br />
        <span className="title b amount">₹{cardsData.balance}</span>
      </div>
      <div className={styles.fillRest}></div>
      <div className={styles.card}>
        <span className="title g">Income</span>
        <br />
        <span className="title g amount">₹{cardsData.income}</span>
      </div>
      <hr className="hr h" />
      <div className={styles.card}>
        <span className="title r">Expense</span>
        <br />
        <span className="title r amount">₹{cardsData.expense}</span>
      </div>
    </div>
  );
};
