import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../styles';
import ReceiptModal from './ReceiptModal';
import {DEVICE_WIDTH} from '../styles/utils';
import {BASEURL} from '../api';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Button from './Button';

const emptyImage = require('../../assets/images/upload.png');
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = SLIDER_WIDTH - RFValue(55);

type UploadProps = {
  receipts: any[];
  onPress: (type: string) => void;
};

const UploadImage = (Props: UploadProps) => {
  const isCarousel = React.useRef(null);
  const [index, setIndex] = React.useState<number>(0);
  const [type, setType] = React.useState<string>('');

  const {receipts, onPress} = Props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    type && imageUpload();
  }, [type]);

  const imageUpload = async () => {
    await onPress(type);
  };
  const CarouselCardItem = ({
    item,
  }: {
    item: {url: string; addReceipt?: boolean};
  }) => {
    if (item?.addReceipt) {
      return (
        <Button onPress={() => setModalVisible(!modalVisible)}>
          <FastImage
            style={styles.imageStyle}
            source={emptyImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        </Button>
      );
    }
    const image = {uri: `${BASEURL}${item.url}`};
    return (
      <FastImage
        style={styles.uriImageStyle}
        source={image}
        resizeMode={FastImage.resizeMode.cover}
      />
    );
  };

  const selectImageMedium = async (type: string | undefined) => {
    setModalVisible(!modalVisible);
    if (type) {
      setType(type);
    }
  };

  return (
    <View style={styles.mainStyle}>
      <Carousel
        activeSlideAlignment="center"
        ref={isCarousel}
        data={[...receipts, {addReceipt: true}]}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={RFValue(1)}
        onSnapToItem={(index: number) => setIndex(index)}
      />

      <ReceiptModal
        modalVisible={modalVisible}
        setModalVisible={selectImageMedium}
      />
    </View>
  );
};

export default UploadImage;

const styles = StyleSheet.create({
  mainStyle: {
    // borderStyle: 'dashed',
    // borderWidth: 1,
    borderRadius: RFValue(1.5),
    marginVertical: RFValue(20),
    // padding: RFValue(70),
    // backgroundColor: COLORS.Grey,
  },
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
  textStyle: {
    alignSelf: 'center',
    marginVertical: RFValue(20),
  },
});
