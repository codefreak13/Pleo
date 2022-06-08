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

const ExpenseDetail = (props: any) => {
  const {
    expense: details,
    selectPhoto,
    addComment,
    shared,
    setShared,
    takeScreenshot,
    viewShotRef,
  } = useExpenseDetails(props.route.params.id);

  const [expense, setExpense] = useState<Expense>(
    details || props.route.params,
  );
  const {merchant, date, amount, user} = expense as Expense;
  const [editComment, setEditCommet] = useState(expense.comment);

  useEffect(() => {
    if (!viewShotRef.current || !shared) {
      return;
    }
    takeScreenshot(viewShotRef);
  }, [shared]);

  const {first, last, email} = user;
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
      <ScrollView showsVerticalScrollIndicator={false} style={styles.mainStyle}>
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
            customstyle={styles.inputStyle}
            multiline={true}
            placeholder="Add Comment"
            numberOfLines={3}>
            <Button
              customstyle={styles.buttonStyle}
              onPress={() => {
                addComment(editComment);
              }}
              title={`${expense.comment ? 'Update' : 'Add'} Comment`}
              textStyle={styles.buttonTextStyle}
            />
          </Input>

          <UploadImage expense={expense} onPress={selectPhoto} />
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
    padding: RFValue(7),
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
