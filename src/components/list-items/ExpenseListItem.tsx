import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, MediumText, RegularText} from '..';
import {ExpenseDataProps} from '../../screens/expenses/List';
import {COLORS} from '../../styles';
import {formatCurrency} from '../../utils/formatCurrency';

const ExpenseListItem = (props: ExpenseDataProps) => {
  const {
    amount: {currency, value},
    merchant,
    receipt,
    date,
    user: {first, last},
  } = props;
  const {imageStyle, mainStyle, detailContainerStyle, detailViewStyle} = styles;

  const emptyImage = require('../../../assets/images/empty.jpeg');
  const image = receipt ? {uri: receipt} : emptyImage;

  return (
    <View style={mainStyle}>
      <View style={detailContainerStyle}>
        <FastImage
          style={imageStyle}
          source={image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={detailViewStyle}>
          <BoldText>{merchant}</BoldText>
          <MediumText>{`${first} ${last}`}</MediumText>
          <RegularText>{date}</RegularText>
        </View>
      </View>
      <BoldText>{`${value} ${currency}`}</BoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: RFValue(10),
    backgroundColor: COLORS.Grey,
    padding: RFValue(13),
  },
  imageStyle: {
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(50),
  },
  detailContainerStyle: {
    flexDirection: 'row',
  },
  detailViewStyle: {
    marginLeft: RFValue(30),
  },
});

export default ExpenseListItem;
