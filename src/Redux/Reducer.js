import {
  ADDEXPENSE,
  ADDINCOME,
  DELETEEXPENSE,
  DELETEINCOME,
  LOCALSTORAGEKEY,
  EDITFORM,
  CLEARFORM,
  UPDATEHISTORY,
} from "./Constants";

const localData = localStorage.getItem(LOCALSTORAGEKEY);

let initialState = {
  expense: 0,
  income: 0,
  balance: 0,
  currentAction: "ADD",
  editPayload: {},
  transactions: [],
};

if (localData) initialState = JSON.parse(localData);

export default (state = initialState, action) => {
  const { type, uid, amount, description } = action.payload || {};

  switch (action.type) {
    case ADDEXPENSE:
      return {
        ...state,
        expense: state.expense + amount,
        balance: state.balance - amount,
        transactions: [
          ...state.transactions,
          { uid, type: "Expense", amount, description },
        ],
      };

    case ADDINCOME:
      return {
        ...state,
        income: state.income + amount,
        balance: state.balance + amount,
        transactions: [
          ...state.transactions,
          { uid, type: "Income", amount, description },
        ],
      };

    case DELETEINCOME:
      const foundIncome = state.transactions.filter(
        (transaction) => transaction.uid === uid
      );

      return {
        ...state,
        income: state.income - foundIncome[0].amount,
        balance: state.balance - foundIncome[0].amount,
        transactions: state.transactions.filter(
          (transaction) => transaction.uid !== uid
        ),
      };
    case DELETEEXPENSE:
      const foundExpense = state.transactions.filter(
        (transaction) => transaction.uid === uid
      );

      return {
        ...state,
        expense: state.expense - foundExpense[0].amount,
        balance: state.balance + foundExpense[0].amount,
        transactions: state.transactions.filter(
          (transaction) => transaction.uid !== uid
        ),
      };
    case UPDATEHISTORY:
      const newState = { ...state };
      const parseAmount = parseInt(amount);
      if (state.editPayload.type === "Income") {
        if (type === "Income") {
          newState.balance =
            state.balance - state.editPayload.amount + parseAmount;
          newState.income =
            state.income - state.editPayload.amount + parseAmount;
        } else {
          newState.balance =
            state.balance - state.editPayload.amount - parseAmount;
          newState.income = state.income - parseAmount;
          newState.expense = state.expense + parseAmount;
        }
      } else {
        if (type === "Income") {
          newState.balance =
            state.balance + state.editPayload.amount + parseAmount;
          newState.income = state.income + parseAmount;
          newState.expense = state.expense - parseAmount;
        } else {
          newState.balance =
            state.balance + state.editPayload.amount - parseAmount;
          newState.expense =
            state.expense - state.editPayload.amount + parseAmount;
        }
      }
      newState.transactions = newState.transactions.map((t) =>
        t.uid !== state.editPayload.uid
          ? t
          : { ...t, description, amount: parseAmount, type }
      );

      return newState;
    case EDITFORM:
      return { ...state, currentAction: "EDIT", editPayload: action.payload };
    case CLEARFORM:
      return { ...state, currentAction: "ADD", editPayload: {} };
    default:
      return state;
  }
};
