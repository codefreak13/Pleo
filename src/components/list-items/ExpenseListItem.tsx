import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {BoldText, MediumText, RegularText} from '..';
import {ExpenseDataProps} from '../../screens/expenses/List';
import {COLORS} from '../../styles';
import {formatDate} from '../../utils';

type ExpenseListItemProps = {
  onPress: () => void;
} & ExpenseDataProps;

const ExpenseListItem = (props: ExpenseListItemProps) => {
  const {
    amount: {currency, value},
    merchant,
    receipt,
    date,
    user: {first, last},
    onPress,
  } = props;

  const {
    imageStyle,
    mainStyle,
    detailContainerStyle,
    detailViewStyle,
    merchantStyle,
  } = styles;

  const emptyImage = require('../../../assets/images/empty.jpeg');
  const image = receipt ? {uri: receipt} : emptyImage;

  return (
    <Pressable style={mainStyle} onPress={() => onPress()}>
      <View style={detailContainerStyle}>
        <FastImage
          style={imageStyle}
          source={image}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={detailViewStyle}>
          <BoldText customstyle={merchantStyle}>{merchant}</BoldText>
          <MediumText>{`${first} ${last}`}</MediumText>
          <RegularText>{formatDate.dateB(date)}</RegularText>
        </View>
      </View>
      <BoldText>{`${value} ${currency}`}</BoldText>
    </Pressable>
  );
};

export default ExpenseListItem;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: RFValue(10),
    backgroundColor: COLORS.Grey,
    padding: RFValue(13),
    elevation: 5,
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
  merchantStyle: {
    color: COLORS.Black,
    fontWeight: 'bold',
  },
});
