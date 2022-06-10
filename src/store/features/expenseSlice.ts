import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {ExpenseDataProps} from '../../screens/expenses/List';
import api from '../../api';
import {Expense} from '../../../api/data/expenses';
import {AppDispatch} from '..';
import {toggleLoading} from './loadingSlice';

type ExpenseInitialState = {
  expenses: ExpenseDataProps[];
};

const initialState: ExpenseInitialState = {
  expenses: [],
};

const fetchExpenses = createAsyncThunk(
  'getExpenses',
  async (data: {limit?: number; offset: number}) => {
    const {expenses} = await api.getExpenses(data.offset, data.limit);
    return expenses;
  },
);

const addComment = createAsyncThunk(
  'addComment',
  async (input: {expenseId: string; comment: string}) => {
    const data: Expense = await api.addCommentToExpense(
      input.expenseId,
      input.comment,
    );
    return data;
  },
);

const addReceipt = createAsyncThunk(
  'addReceipt',
  async (input: {expenseId: string; file: any}) => {
    const data: Expense = await api.addReceiptToExpense(
      input.expenseId,
      input.file,
    );
    return data;
  },
);

export const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.expenses = [...state.expenses, ...action.payload];
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      const index = state.expenses.findIndex(
        exp => exp.id === action.meta.arg.expenseId,
      );
      state.expenses[index] = action.payload;
    });
    builder.addCase(addReceipt.fulfilled, (state, action) => {
      const index = state.expenses.findIndex(
        exp => exp.id === action.meta.arg.expenseId,
      );
      state.expenses[index] = action.payload;
    });
  },
});

// // called only once, at the point where the slice.action is referenced.
export const expenseActions = (dispatch: AppDispatch) => ({
  getExpenses: (offset: number, limit?: number) => {
    dispatch(toggleLoading());
    dispatch(fetchExpenses({limit, offset}));
    dispatch(toggleLoading());
  },
  addComment: (id: string, comment: string) => {
    dispatch(toggleLoading());
    dispatch(addComment({expenseId: id, comment}));
    dispatch(toggleLoading());
  },
  addReceipt: (expenseId: string, file: any) => {
    dispatch(toggleLoading());
    dispatch(addReceipt({expenseId, file}));
    dispatch(toggleLoading());
  },
});

export {fetchExpenses};
export default expenseSlice.reducer;
