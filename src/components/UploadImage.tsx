import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import ReceiptModal from './ReceiptModal';
import {DEVICE_WIDTH, SLIDER_WIDTH, ITEM_WIDTH} from '../styles/utils';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import useUploadImage from '../hooks/useUploadImage';
import {Expense} from '../../api/data/expenses';
import {COLORS} from '../styles';
import CarouselCardItem from './Carousel';

type UploadProps = {
  expense: Expense;
  selectPhoto: (type: string) => void;
};

const UploadImage = (Props: UploadProps) => {
  const {
    expense: {receipts},
    selectPhoto,
  } = Props;
  const {
    index,
    isCarousel,
    setIndex,
    type,
    selectImageMedium,
    modalVisible,
    setModalVisible,
    setType,
  } = useUploadImage();

  useEffect(() => {
    type && imageUpload();
    setType('');
  }, [type]);

  const imageUpload = () => {
    selectPhoto(type);
  };

  return (
    <View style={styles.mainStyle}>
      <Carousel
        activeSlideAlignment="center"
        ref={isCarousel}
        data={[...receipts, {addReceipt: true}]}
        renderItem={({item}: {item: {url: string; addReceipt?: boolean}}) => (
          <CarouselCardItem
            item={item}
            setModalVisible={setModalVisible}
            modalVisible={modalVisible}
          />
        )}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        inactiveSlideShift={RFValue(1)}
        onSnapToItem={(index: number) => setIndex(index)}
      />
      <Pagination
        dotsLength={receipts.length > 0 ? receipts.length + 1 : 0}
        activeDotIndex={index}
        ref={isCarousel}
        dotStyle={styles.carouselIcon_1}
        inactiveDotStyle={styles.carouselIcon_2}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
        dotContainerStyle={{
          marginEnd: RFValue(0.5),
        }}
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
    borderRadius: RFValue(1.5),
    marginVertical: RFValue(20),
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
  carouselIcon_1: {
    width: RFValue(18),
    height: RFValue(5),
    backgroundColor: COLORS.DarkGrey,
    borderRadius: RFValue(5),
  },
  carouselIcon_2: {
    width: RFValue(6),
    height: RFValue(5),
    backgroundColor: COLORS.Black,
    borderRadius: RFValue(5),
  },
});
