import {useEffect, useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {Expense} from '../../api/data/expenses';
import {expenseActions, RootState} from '../store/store';
import {imageUtils} from '../utils';

const useExpenseDetails = (expenseID: string) => {
  const expense = useSelector<RootState, Expense | undefined>(
    state => state.expenses.expenses.find(exp => exp.id === expenseID),
    (a, b) =>
      a?.id === b?.id &&
      a?.comment === b?.comment &&
      a?.receipts === b?.receipts,
  );
  const [comment, setComment] = useState<string | null>(null);
  const [modalVisble, setModalVisible] = useState<boolean>(false);

  const selectPhoto = async (type: string) => {
    const libraryOptions: Parameters<typeof launchImageLibrary>[0] = {
      mediaType: 'photo',
    };
    const cameraOptions: Parameters<typeof launchCamera>[0] = {
      mediaType: 'photo',
    };
    const options =
      imageUtils.IMAGE_SOURCE.camera === type ? cameraOptions : libraryOptions;
    try {
      const res = await imageUtils.fetchImage(type, options);
      // const res = await launchImageLibrary(options);
      // setState({ imageLoading: true })

      const image = {
        uri: res.assets?.[0].uri,
        type: res.assets?.[0].type,
        name: 'receipt',
      };
      expenseActions.addReceipt(expenseID, image);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    expense,
    addComment: (comment: string) => {
      setComment(comment);
      expenseActions.addComment(expenseID, comment);
    },
    selectPhoto,
  };
};

export default useExpenseDetails;
