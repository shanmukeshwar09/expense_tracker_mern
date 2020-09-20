import {
  ADDEXPENSE,
  ADDINCOME,
  DELETEINCOME,
  DELETEEXPENSE,
  EDITFORM,
  CLEARFORM,
  UPDATEHISTORY,
} from "./Constants";
import { v4 } from "uuid";

export const addExpense = (amount, description) => ({
  type: ADDEXPENSE,
  payload: {
    amount: parseInt(amount),
    description,
    uid: v4(),
  },
});

export const addIncome = (amount, description) => ({
  type: ADDINCOME,
  payload: {
    amount: parseInt(amount),
    description,
    uid: v4(),
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

export const updateHistory = (amount, description, type) => ({
  type: UPDATEHISTORY,
  payload: { amount, description, type },
});

export const editForm = ({ uid, amount, type, description }) => ({
  type: EDITFORM,
  payload: { uid, amount, type, description },
});

export const clearForm = () => ({ type: CLEARFORM, payload: {} });
