import {formatByMonthAndYear} from './formatDate';

export const formatData = (data: any) => {
  return data.reduce((accum: any, current: any) => {
    const foundIndex = accum.findIndex(
      (element: any) => element.title === formatByMonthAndYear(current.date),
    );
    if (foundIndex === -1) {
      return [
        ...accum,
        {
          title: formatByMonthAndYear(current.date),
          data: [
            {
              id: current.id,
              amount: current.amount,
              merchant: current.merchant,
              date: current.date,
              receipts: current.receipts,
              comment: current.comment,
              user: current.user,
            },
          ],
        },
      ];
    }
    accum[foundIndex].data = [
      ...accum[foundIndex].data,
      {
        id: current.id,
        amount: current.amount,
        merchant: current.merchant,
        date: current.date,
        receipts: current.receipts,
        comment: current.comment,
        user: current.user,
      },
    ];
    return accum.sort(
      (a: {title: number}, b: {title: number}) => b.title - a.title,
    );
  }, []);
};
