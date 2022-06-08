import {configureStore} from '@reduxjs/toolkit';
import expenseSlice, {
  expenseActions as expActions,
  updateExpenses,
} from './features/expenseSlice';

export const store = configureStore({
  reducer: {
    expenses: expenseSlice,
  },
});

export {updateExpenses};
export const expenseActions = expActions(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
