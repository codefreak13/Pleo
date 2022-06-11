import {createRef, RefObject, useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Expense} from '../../api/data/expenses';
import {expenseActions} from '../store';
import Share from 'react-native-share';
import {useAppSelector} from '../store/hooks';
import RNFS from 'react-native-fs';
import RNImageToPdf from 'react-native-image-to-pdf';
import {platformUtils, formatDate, imageUtils} from '../utils';
import ViewShot from 'react-native-view-shot';

const useExpenseDetails = (expenseID: string) => {
  const {
    expenses: {expenses},
    loading,
  } = useAppSelector(state => state);
  const expense = expenses.find((exp: Expense) => exp.id === expenseID);
  const [shared, setShared] = useState<boolean>(false);

  const viewShotRef = createRef<ViewShot>();

  const fileName = `${formatDate.formatByDayMonthAndYear(
    expense!.date,
  )}_${formatDate.formatByTime(expense!.date)}`.replace(
    new RegExp(/[^a-zA-Z0-9-]/, 'g'),
    '-',
  );

  const selectPhoto = async (type: string) => {
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

      expenseActions.addReceipt(expenseID, image);
    } catch (err) {
      console.log(err);
    }
  };

  const openFile = async (attachmentUrl: string) => {
    const pdf = await convertImageToPDF(attachmentUrl);
    const url = platformUtils.isAndroid()
      ? attachmentUrl.replace('file://', '')
      : 'file://' + attachmentUrl;
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;
    const options = {
      fromUrl: url,
      toFile: localFile,
    };

    RNFS.downloadFile(options)
      .promise.then(() => shareTxReceipt(url))
      .then(() => {
        // success
      })

      .catch(error => {
        // error
      });
  };

  const convertImageToPDF = async (url: string) => {
    try {
      const options = {
        imagePaths: [url],
        name: fileName,
      };
      const pdf = await RNImageToPdf.createPDFbyImages(options);
      return pdf;
    } catch (e) {
      console.log(e);
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

  const takeScreenshot = (ref: React.RefObject<any>) =>
    ref.current
      .capture()
      .then((uri: string) => {
        platformUtils.isIos() ? openFile(uri) : shareTxReceipt(uri);
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
    loading,
  };
};

export default useExpenseDetails;
