import React from "react";
import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { Balance } from "../Balance/Balance";
import { TrackerCards } from "../TrackerCards/TrackerCards";
import { History } from "../History/History";
import { TransactionForm } from "../TransactionForm/TransactionForm";

export const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <Balance />
      <History />
      <div className={styles.block}>
        <TrackerCards />
        <TransactionForm />
      </div>
    </div>
  );
};
