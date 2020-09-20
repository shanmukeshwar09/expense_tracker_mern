import React from "react";
import styles from "./App.module.css";
import { Header } from "../Header/Header";
import { TrackerCards } from "../TrackerCards/TrackerCards";
import { History } from "../History/History";
import { TransactionForm } from "../TransactionForm/TransactionForm";

export const App = () => {
  return (
    <div className={styles.container}>
      <Header />
      <TrackerCards />
      <div className={styles.block}>
        <TransactionForm />
        <History />
      </div>
    </div>
  );
};
