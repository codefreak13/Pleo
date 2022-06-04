import React from 'react';
import {View, SectionList, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ExpenseListItem} from '../list-items';
import {BoldText} from '../../components/text';
import {ExpenseDataProps} from '../../screens/expenses/List';
import {formatData} from '../../utils';

type ExpenseListViewProps = {
  expenses: ExpenseDataProps[];
  onPress?: (item: any) => void;
};

const ExpenseListView = (props: ExpenseListViewProps) => {
  const {expenses, onPress} = props;

  return (
    <SectionList
      //   keyExtractor={item => item.indexOf(item).toString()}
      showsVerticalScrollIndicator={false}
      sections={formatData(expenses)}
      // ListEmptyComponent={
      //   <View style={styles.emptyList}>
      //     <Text style={styles.emptyListText}>
      //       You have not made any{'\n'}transaction with this card yet.
      //     </Text>
      //   </View>
      // }
      renderItem={({item}) => (
        <ExpenseListItem
          {...item}
          // onPress={() => onPress(item)}
        />
      )}
      renderSectionHeader={({section: {title}}) => <BoldText>{title}</BoldText>}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
  },
});

export default ExpenseListView;
