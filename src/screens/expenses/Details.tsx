import React, {useState, useEffect, createRef} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  SectionText,
  Input,
  Button,
  UploadImage,
  Header,
  LoadingIcon,
} from '../../components';
import {COLORS} from '../../styles';
import {formatDate} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import useExpenseDetails from '../../hooks/useExpenseDetail';
import {Expense} from '../../../api/data/expenses';
import ViewShot from 'react-native-view-shot';
import Share from 'react-native-share';

const ExpenseDetail = (props: any) => {
  console.log(props);
  const {mainStyle, buttonStyle, inputStyle, buttonTextStyle} = styles;
  const [shared, setShared] = useState(false);
  const viewShotRef = createRef();

  useEffect(() => {
    if (!viewShotRef.current || !shared) {
      return;
    }

    takeScreenshot(viewShotRef);
  }, [shared]);
  const {
    expense: details,
    selectPhoto,
    addComment,
  } = useExpenseDetails(props.route.params.id);
  const [expense, setExpense] = useState<Expense>(
    details || props.route.params,
  );
  const {merchant, date, amount, receipts, comment, user} = expense as Expense;
  const [editComment, setEditCommet] = useState(expense.comment);

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
  //   useEffect(() => {
  //     setEditCommet(comment || '');
  //   }, [comment]);
  // temp comment until saved

  const {first, last, email} = user;
  const showReceipt = receipts;
  return (
    <>
      <Header
        leftButton={{
          child: <FontAwesome name="arrow-left" size={16} />,
          onclick: () => {
            props.navigation.goBack();
          },
        }}
        rightButton={{
          child: <FontAwesome name="ellipsis-h" size={16} />,
          onclick: () => {
            setShared(true);
          },
        }}
        showBottomBorder
      />
      <ScrollView showsVerticalScrollIndicator={false} style={mainStyle}>
        <ViewShot
          ref={viewShotRef}
          options={{format: 'jpg', quality: 0.9}}
          style={{
            backgroundColor: COLORS.White,
          }}>
          <SectionText title="Merchant">{merchant}</SectionText>
          <SectionText title="Employee Name">{`${first} ${last}`}</SectionText>
          <SectionText title="Employee Email">{email}</SectionText>
          <SectionText title="Date">{formatDate.dateB(date)}</SectionText>
          <SectionText title="Amount">{`${amount.value} ${amount.currency}`}</SectionText>

          <Input
            value={editComment}
            setValue={setEditCommet}
            customstyle={inputStyle}
            multiline={true}
            placeholder="Add Comment"
            numberOfLines={3}>
            <Button
              customstyle={buttonStyle}
              disabled={false}
              onPress={() => {
                addComment(editComment);
              }}
              title={`${expense.comment ? 'Update' : 'Add'} Comment`}
              textStyle={buttonTextStyle}
            />
          </Input>

          <UploadImage receipts={showReceipt} onPress={selectPhoto} />
        </ViewShot>
      </ScrollView>
    </>
  );
};

export default ExpenseDetail;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    margin: RFValue(10),
    paddingHorizontal: RFValue(10),
  },
  inputStyle: {
    borderColor: COLORS.Grey,
    borderWidth: RFValue(2),
    textAlignVertical: 'top',
    marginTop: RFValue(25),
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    padding: RFValue(8),
    backgroundColor: COLORS.Black,
    marginVertical: RFValue(10),
    borderRadius: RFValue(3),
  },
  buttonTextStyle: {
    color: COLORS.White,
  },
});
