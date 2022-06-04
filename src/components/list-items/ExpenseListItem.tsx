import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, MediumText, RegularText} from '../../components/text';
import {ExpenseDataProps} from '../../screens/expenses/List';

const ExpenseListItem = (props: ExpenseDataProps) => {
  const {
    amount: {currency, value},
    merchant,
    receipt,
    user: {first, last},
  } = props;
  const {imageStyle, mainStyle} = styles;

  const emptyImage = require('../../../assets/images/empty.jpeg');
  const image = receipt ? {uri: receipt} : emptyImage;

  return (
    <View style={mainStyle}>
      <FastImage
        style={imageStyle}
        source={image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View>
        <BoldText>{merchant}</BoldText>
        <MediumText>{`${first} ${last}`}</MediumText>
      </View>
      <BoldText>{`${currency} ${value}`}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    width: RFValue(100),
    height: RFValue(100),
    borderRadius: RFValue(50),
  },
});

export default ExpenseListItem;
