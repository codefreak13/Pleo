import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SectionText,
  Input,
  Button,
  MediumText,
  UploadImage,
  Header,
  BoldText,
} from '../../components';
import {COLORS} from '../../styles';
import {formatDate} from '../../utils';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import useExpenseDetails from '../../hooks/useExpenseDetail';
import {Expense} from '../../../api/data/expenses';

const ExpenseDetail = (props: any) => {
  console.log(props);
  const {mainStyle, buttonStyle, inputStyle, buttonTextStyle} = styles;

  const {route} = props;
  const {expense: details, selectPhoto} = useExpenseDetails(
    props.route.params.id,
  );
  const [expense, setExpense] = useState<Expense>(
    details || props.route.params.item,
  );
  const {merchant, date, amount, receipts, comment, user} = expense as Expense;
  // temp comment until saved
  const [editComment, setEditCommet] = useState(expense.comment);
  const {first, last, email} = user;
  const showReceipt = receipts && receipts[0];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={mainStyle}>
      <Header
        leftButton={{
          child: <FontAwesome name="arrow-left" size={16} />,
          onclick: () => {
            props.navigation.goBack();
          },
        }}
        showBottomBorder
      />
      <SectionText title="Merchant">{merchant}</SectionText>
      <SectionText title="Employee Name">{`${first} ${last}`}</SectionText>
      <SectionText title="Employee Email">{email}</SectionText>
      <SectionText title="Date">{formatDate.dateB(date)}</SectionText>
      <SectionText title="Amount">{`${amount.value} ${amount.currency}`}</SectionText>

      {editComment ? (
        <BoldText>{comment}</BoldText>
      ) : (
        <Input
          value={editComment}
          setvalue={setEditCommet}
          customstyle={inputStyle}
          multiline={true}
          placeholder="Add Comment"
          numberOfLines={3}>
          <Button customstyle={buttonStyle} disabled={false}>
            <MediumText customstyle={buttonTextStyle}>Save Comment</MediumText>
          </Button>
        </Input>
      )}

      <UploadImage
        receipt={showReceipt}
        onPress={async () => {
          await selectPhoto();
        }}
      />
    </ScrollView>
  );
};

export default ExpenseDetail;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    margin: RFValue(10),
  },
  inputStyle: {
    borderColor: COLORS.Grey,
    borderWidth: RFValue(2),
    textAlignVertical: 'top',
    marginTop: 15,
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
