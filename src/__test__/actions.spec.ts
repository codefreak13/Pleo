jest.mock('../api');
import {Button, TouchableOpacity, View} from 'react-native';
import {Expense} from '../../api/data/expenses';
import api from '../api';
import {expenseActions, store} from '../store';

const singleExpense = {
  id: '5b995dff2e3cb74644948a66',
  amount: {
    value: '2149.29',
    currency: 'GBP',
  },
  date: '2017-06-21T08:45:09.326Z',
  merchant: 'QUONK',
  receipts: [],
  comment: '',
  category: '',
  user: {
    first: 'Atkins',
    last: 'Blackburn',
    email: 'atkins.blackburn@pleo.io',
  },
};

describe('api actions', () => {
  it('fetches expenses', () => {
    const mockResponse: Expense[] = [];
    const mockApi = api.getExpenses as jest.Mocked<any>;
    mockApi.mockImplementation(() => {
      return mockResponse;
    });

    expenseActions.getExpenses(15);
    expect(api.getExpenses).toHaveBeenCalled();
    expect(api.getExpenses).toReturnWith(mockResponse);
  });

  it('fetches expenses and updates the store', done => {
    const mockResponse: Expense[] = [singleExpense];
    const mockApi = api.getExpenses as jest.Mocked<any>;
    mockApi.mockImplementation(() => {
      return {expenses: mockResponse};
    });

    expenseActions.getExpenses(15);
    store.subscribe(() => {
      expect(store.getState().expenses.expenses.length).toEqual(1);
      done();
    });
  });
});
