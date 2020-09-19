import {
  ADDEXPENSE,
  ADDINCOME,
  DELETEINCOME,
  DELETEEXPENSE,
} from "./Constants";
import { v4 as uid } from "uuid";

export const addExpense = (amount, description) => ({
  type: ADDEXPENSE,
  payload: {
    amount: parseInt(amount),
    description,
    uid: uid(),
  },
});

export const addIncome = (amount, description) => ({
  type: ADDINCOME,
  payload: {
    amount: parseInt(amount),
    description,
    uid: uid(),
  },
});

export const deleteIncome = (uid) => ({
  type: DELETEINCOME,
  payload: { uid },
});

export const deleteExpense = (uid) => ({
  type: DELETEEXPENSE,
  payload: { uid },
});
