import React from 'react';
import {View, SectionList, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ExpenseListItem from '../list-items/ExpenseListItem';
import {BoldText} from '..';
import {ExpenseDataProps} from '../../screens/expenses/List';
import {formatData} from '../../utils';

type ExpenseListViewProps = {
  expenses: ExpenseDataProps[];
  onPress: (item: ExpenseDataProps) => void;
};

const ExpenseListView = (props: ExpenseListViewProps) => {
  const {expenses, onPress} = props;
  const {titleContainerStyle, emptyListStyle, listStyle} = styles;
  return (
    <SectionList
      style={listStyle}
      keyExtractor={(item, index) => item + index}
      showsVerticalScrollIndicator={false}
      sections={formatData(expenses)}
      ListEmptyComponent={
        <View style={emptyListStyle}>
          <BoldText>No Expenses</BoldText>
        </View>
      }
      renderItem={({item}) => (
        <ExpenseListItem {...item} onPress={() => onPress(item)} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <View style={titleContainerStyle}>
          <BoldText>{title}</BoldText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    width: '100%',
  },
  titleContainerStyle: {
    alignItems: 'flex-start',
    marginHorizontal: RFValue(10),
    marginTop: RFValue(20),
  },
  emptyListStyle: {
    alignItems: 'center',
    marginTop: RFValue(200),
  },
});

export default ExpenseListView;
