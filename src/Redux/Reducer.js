import {
  ADDEXPENSE,
  ADDINCOME,
  DELETEEXPENSE,
  DELETEINCOME,
  LOCALSTORAGEKEY,
} from "./Constants";

const localData = localStorage.getItem(LOCALSTORAGEKEY);

let initialState = {
  expense: 0,
  income: 0,
  balance: 0,
  transactions: [],
};

if (localData) initialState = JSON.parse(localData);

export default (state = initialState, action) => {
  const { uid, amount, description } = action.payload || {};

  switch (action.type) {
    case ADDEXPENSE:
      return {
        ...state,
        expense: state.expense + amount,
        balance: state.balance - amount,
        transactions: [
          ...state.transactions,
          { uid, type: "expense", amount, description },
        ],
      };

    case ADDINCOME:
      return {
        ...state,
        income: state.income + amount,
        balance: state.balance + amount,
        transactions: [
          ...state.transactions,
          { uid, type: "income", amount, description },
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
    default:
      return state;
  }
};
