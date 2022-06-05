import {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {Expense} from '../../api/data/expenses';
import {expenseActions, RootState} from '../store/store';

const useExpenseDetails = (expenseID: string) => {
  const expense = useSelector<RootState, Expense | undefined>(
    state => state.expenses.expenses.find(exp => exp.id === expenseID),
    (a, b) =>
      a?.id === b?.id &&
      a?.comment === b?.comment &&
      a?.receipts === b?.receipts,
  );
  const [comment, setCommnet] = useState<string | null>(null);

  const selectPhoto = async () => {
    const options: Parameters<typeof launchImageLibrary>[0] = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    try {
      const res = await launchImageLibrary(options);
      // setState({ imageLoading: true })

      const image = {
        uri: res.assets?.[0].uri,
        type: res.assets?.[0].type,
        data: res.assets?.[0].base64,
      };
      const base64 = res.assets?.[0].base64;
      if (!base64) {
        throw new Error('Unable to read selected photo');
      }
      expenseActions.addReceipt(expenseID, base64);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    expense,
    addComment: (comment: string) => {
      setCommnet(comment);
      expenseActions.addComment(expenseID, comment);
    },
    selectPhoto,
  };
};

export default useExpenseDetails;
