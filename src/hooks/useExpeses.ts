import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {expenseActions, RootState} from '../store/store';

const useExpenses = () => {
  const limit = 15;

  const {expenses, loading, error} = useSelector<
    RootState,
    RootState['expenses']
  >(state => state.expenses);

  const {getExpenses} = expenseActions;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getExpenses(offset, limit);
  }, [offset]);

  const getMore = () => {
    if (loading) {
      return;
    }
    setOffset(offset + limit);
  };

  return {expenses, loading, error, getMore};
};

export default useExpenses;
