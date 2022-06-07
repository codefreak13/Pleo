import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../styles';
import {imageUtils} from '../utils';
import Button from './Button';

type ReceiptModalProps = {
  modalVisible: boolean;
  setModalVisible: (type?: string | undefined) => void;
};

const ReceiptModal = (props: ReceiptModalProps) => {
  const {modalVisible, setModalVisible} = props;

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible();
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              title="Open Camera"
              customstyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => setModalVisible(imageUtils.IMAGE_SOURCE.camera)}
            />
            <Button
              title="Open Library"
              customstyle={styles.buttonStyle}
              textStyle={styles.textStyle}
              onPress={() => setModalVisible(imageUtils.IMAGE_SOURCE.library)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReceiptModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: RFValue(22),
  },
  modalView: {
    margin: RFValue(20),
    backgroundColor: COLORS.White,
    borderRadius: RFValue(20),
    padding: RFValue(100),
    alignItems: 'center',
    shadowColor: COLORS.White,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: RFValue(4),
    elevation: 5,
    borderColor: COLORS.Black,
    borderWidth: 0.5,
  },
  buttonStyle: {
    borderRadius: RFValue(5),
    padding: RFValue(13),
    elevation: 2,
    marginVertical: RFValue(20),
    backgroundColor: COLORS.White,
    borderColor: COLORS.Black,
    borderWidth: 1,
  },
  textStyle: {
    color: COLORS.Black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
