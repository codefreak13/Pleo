import {createRef, useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {Expense} from '../../api/data/expenses';
import {expenseActions, RootState, updateExpenses} from '../store';
import {imageUtils} from '../utils';
import Share from 'react-native-share';
import {useAppDispatch} from '../store/hooks';

const useExpenseDetails = (expenseID: string) => {
  const viewShotRef = createRef();
  const expense = useSelector<RootState, Expense | undefined>(
    state => state.expenses.expenses.find(exp => exp.id === expenseID),
    (a, b) =>
      a?.id === b?.id &&
      a?.comment === b?.comment &&
      a?.receipts === b?.receipts,
  );
  const [shared, setShared] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const selectPhoto = async (id: string, type: string) => {
    const libraryOptions: Parameters<typeof launchImageLibrary>[0] = {
      mediaType: 'photo',
    };
    const cameraOptions: Parameters<typeof launchCamera>[0] = {
      mediaType: 'photo',
    };

    let options;
    if (imageUtils.IMAGE_SOURCE.camera === type) {
      options = cameraOptions;
    } else if (imageUtils.IMAGE_SOURCE.library === type) {
      options = libraryOptions;
    }

    try {
      const res = await imageUtils.fetchImage(type, options);

      const image = {
        uri: res.assets?.[0].uri,
        type: res.assets?.[0].type,
        name: 'receipt',
      };
      dispatch(updateExpenses({id, image}));

      expenseActions.addReceipt(expenseID, image);
    } catch (err) {
      console.log(err);
    }
  };

  const shareTxReceipt = (url: string) => {
    const options = {
      url: url,
      title: 'Transaction Receipt',
      message: '',
    };
    Share.open(options)
      .then(res => {})
      .catch(err => {});
  };

  const takeScreenshot = ref =>
    ref.current
      .capture()
      .then((uri: string) => {
        shareTxReceipt(uri);
      })
      .then(() => setShared(false));

  return {
    expense,
    addComment: (comment: string) => {
      expenseActions.addComment(expenseID, comment);
    },
    selectPhoto,
    shared,
    setShared,
    takeScreenshot,
    viewShotRef,
  };
};

export default useExpenseDetails;
