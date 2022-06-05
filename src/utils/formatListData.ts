import {Expense} from '../../api/data/expenses';
import {dateA} from './formatDate';

export const formatData = (data: Expense[]) => {
  const dataMap = data.reduce((accum, current) => {
    const date = dateA(current.date);
    return {...accum, [date]: (accum[date] || []).concat(current)};
  }, {} as {[x in string]: Expense[]});

  const sortedDate = Object.keys(dataMap).sort((a, b) =>
    new Date(a) < new Date(b) ? -1 : 1,
  );

  return sortedDate.map(dateString => {
    return {
      title: dateString,
      data: dataMap[dateString],
    };
  });
};
