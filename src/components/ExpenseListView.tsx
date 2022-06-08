import React from 'react';
import {View, SectionList, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ExpenseListItem from './ExpenseListItem';
import {ExpenseDataProps} from '../screens/expenses/List';
import {formatData} from '../utils';
import {MediumText, BoldText} from './text/Text';

type ExpenseListViewProps = {
  expenses: ExpenseDataProps[];
  onPress: (item: ExpenseDataProps) => void;
  loadMore: () => void;
};

const ExpenseListView = (props: ExpenseListViewProps) => {
  const {expenses, onPress} = props;
  return (
    <SectionList
      style={styles.listStyle}
      keyExtractor={(item, index) => item.date + index}
      showsVerticalScrollIndicator={false}
      sections={formatData(expenses)}
      ListEmptyComponent={
        <View style={styles.emptyListStyle}>
          <BoldText>No Expenses</BoldText>
        </View>
      }
      renderItem={({item}) => (
        <ExpenseListItem {...item} onPress={() => onPress(item)} />
      )}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.titleContainerStyle}>
          <MediumText>{title}</MediumText>
        </View>
      )}
      stickyHeaderHiddenOnScroll={true}
      onEndReachedThreshold={0.4}
      onEndReached={() => props.loadMore()}
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
    backgroundColor: 'transparent',
  },
  emptyListStyle: {
    alignItems: 'center',
    marginTop: RFValue(200),
  },
});

export default ExpenseListView;
