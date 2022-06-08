import React from 'react';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet} from 'react-native';
import Button from './Button';
import {BASEURL} from '../api';
import {DEVICE_WIDTH} from '../styles/utils';

const emptyImage = require('../../assets/images/upload.png');

type CarouselCardItemProps = {
  item: {url: string; addReceipt?: boolean};
  setModalVisible: (modalVisible: boolean) => void;
  modalVisible: boolean;
};

const CarouselCardItem = (props: CarouselCardItemProps) => {
  const {item, setModalVisible, modalVisible} = props;
  if (item?.addReceipt) {
    return (
      <Button
        onPress={() => setModalVisible(!modalVisible)}
        customstyle={styles.buttonStyle}>
        <FastImage
          style={styles.imageStyle}
          source={emptyImage}
          resizeMode={FastImage.resizeMode.cover}
        />
      </Button>
    );
  }
  const imageUri = {uri: `${BASEURL}${item.url}`};
  return (
    <FastImage
      style={styles.uriImageStyle}
      source={imageUri}
      resizeMode={FastImage.resizeMode.cover}
    />
  );
};

export default CarouselCardItem;

const styles = StyleSheet.create({
  imageStyle: {
    width: RFValue(50),
    height: RFValue(50),
    alignSelf: 'center',
  },
  uriImageStyle: {
    width: DEVICE_WIDTH,
    height: RFValue(400),
    alignSelf: 'center',
  },
  buttonStyle: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    flex: 1,
  },
});
