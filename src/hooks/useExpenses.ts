import {useEffect, useState} from 'react';
import {expenseActions} from '../store';
import {useAppSelector} from '../store/hooks';

const useExpenses = () => {
  const limit = 25;

  const {
    expenses: {expenses},
  } = useAppSelector(state => state);
  const {getExpenses} = expenseActions;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getExpenses(offset, limit);
  }, [offset]);

  const getMore = () => {
    setOffset(offset + limit);
  };
  return {expenses, getMore};
};

export default useExpenses;
