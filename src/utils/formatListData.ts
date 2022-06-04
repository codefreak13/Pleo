export const formatData = (data: any) =>
  data.reduce((accum: any, current: any) => {
    const foundIndex = accum.findIndex(
      (element: any) =>
        element.title === new Date(current.date).toLocaleDateString('en'),
    );
    if (foundIndex === -1) {
      return [
        ...accum,
        {
          title: new Date(current.date).toLocaleDateString('en'),
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
    return accum.sort((a: {title: number}, b: {title: number}) =>
      a.title > b.title ? 1 : b.title > a.title ? -1 : 0,
    );
  }, []);
