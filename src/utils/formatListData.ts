import {dateA} from './formatDate';

export const formatData = (data: any) =>
  data.reduce((accum: any, current: any) => {
    const foundIndex = accum.findIndex(
      (element: any) => element.title === dateA(current.date),
    );
    if (foundIndex === -1) {
      return [
        ...accum,
        {
          title: dateA(current.date),
          data: [
            {
              amount: current.amount,
              merchant: current.merchant,
              date: current.date,
              receipts: current.receipts,
              user: current.user,
            },
          ],
        },
      ];
    }
    accum[foundIndex].data = [
      ...accum[foundIndex].data,
      {
        amount: current.amount,
        merchant: current.merchant,
        date: current.date,
        receipts: current.receipts,
        user: current.user,
      },
    ];
    return accum.sort(
      (a: {title: number}, b: {title: number}) => b.title - a.title,
    );
  }, []);
