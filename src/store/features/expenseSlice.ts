import {
  createSlice,
  createAsyncThunk,
  AsyncThunk,
  createAction,
  AnyAction,
  createReducer,
} from '@reduxjs/toolkit';
import {ExpenseDataProps} from '../../screens/expenses/List';
import api from '../../api';
import {Expense} from '../../../api/data/expenses';

type ExpenseInitialState = {
  loading: boolean;
  expenses: ExpenseDataProps[];
  error: {};
};

const initialState: ExpenseInitialState = {
  expenses: [],
  loading: false,
  error: {},
};
type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

const resetAction = createAction('reset-tracked-loading-state');

function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}
function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}
function isFullfilledAction(action: AnyAction): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}

const loadingThunkReducer = createReducer(initialState, builder => {
  // @ts-ignore
  builder
    .addCase(resetAction, () => initialState)
    .addMatcher(isPendingAction, (state, action) => {
      state.loading = true;
    })
    .addMatcher(
      action => isRejectedAction(action) || isFullfilledAction(action),
      (state, action) => {
        console.log('/rejected match got called', action, state);
        state.loading = false;
      },
    );
});

// type Expense = {

// }

const fetchExpenses = createAsyncThunk(
  'getExpenses',
  async (data: {limit?: number; offset: number}, {dispatch}) => {
    const {expenses} = await api.getExpenses(data.offset, data.limit);
    return expenses;
  },
);

const addComment = createAsyncThunk(
  'addComment',
  async (input: {expenseId: string; comment: string}, {dispatch}) => {
    const data: Expense = await api.addCommentToExpense(
      input.expenseId,
      input.comment,
    );
    return data;
  },
);

const addReceipt = createAsyncThunk(
  'addReceipt',
  async (input: {expenseId: string; file: any}, {dispatch}) => {
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
  reducers: {
    updateExpenses: (state, {payload}) => {
      const expenses = state.expenses;
      const expense = state.expenses.findIndex(exp => payload.id === exp.id);

      const getExpense = expenses[expense];
      getExpense.receipts.push(payload.image);

      state.expenses[expense] = getExpense;
      return state;
    },
    loadingThunkReducer,
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      // Add user to the state array
      state.expenses = state.expenses.concat(action.payload);
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      // Add user to the state array
      const index = state.expenses.findIndex(
        exp => exp.id === action.meta.arg.expenseId,
      );
      const expense = state.expenses[index];
      state.expenses[index] = action.payload;
    });
    builder.addCase(addReceipt.fulfilled, (state, action) => {
      // Add user to the state array
      const index = state.expenses.findIndex(
        exp => exp.id === action.meta.arg.expenseId,
      );
      state.expenses[index] = action.payload;
    });
  },
});

const {updateExpenses} = expenseSlice.actions;

// // called only once, at the point where the slice.action is referenced.
export const expenseActions = (dispatch: any) => ({
  getExpenses: (offset: number, limit?: number) => {
    dispatch(fetchExpenses({limit, offset}));
  },
  addComment: (id: string, comment: string) => {
    dispatch(addComment({expenseId: id, comment}));
  },
  addReceipt: (expenseId: string, file: any) => {
    dispatch(addReceipt({expenseId, file}));
  },
});

// const selectExpense = useSelector((state: any) => state.expenses.find((exp: any) => exp.id === expenseID));
// export const selectUser = (state: RootState) => state.expenses;
export {updateExpenses};
export default expenseSlice.reducer;
