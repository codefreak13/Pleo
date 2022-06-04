import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, TextInput} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  BoldText,
  SectionText,
  Input,
  Button,
  MediumText,
  UploadImage,
} from '../../components';
import {RootNavigationProp} from '../../navigation/RootTypes';
import FastImage from 'react-native-fast-image';
import {COLORS} from '../../styles';

export type ExpenseDataProps = {
  id: string;
  user: {
    first: string;
    last: string;
    email: string;
  };
  amount: {
    currency: string;
    value: string;
  };
  comment: string;
  date: string;
  merchant: string;
  receipt: Array<string>;
};

const ExpenseDetail = () => {
  const {
    mainStyle,
    imageStyle,
    commentStyle,
    buttonStyle,
    inputStyle,
    buttonTextStyle,
  } = styles;
  const receipt = '';
  const [text, settext] = useState<string>('');
  const emptyImage = require('../../../assets/images/upload.png');
  const image = receipt ? {uri: receipt} : emptyImage;

  //   const attachRequestImage = () => {
  //   toggleAttachMentModal()
  //     const options = {
  //       mediaType: 'photo',
  //       selectionLimit: 1
  //     }

  //     setTimeout(async () => {
  //       try {
  //         const res = await launchImageLibrary(options)
  //         this.setState({ imageLoading: true })

  //         const image = {
  //           uri: res.assets[0].uri,
  //           type: res.assets[0].type
  //         }

  //         const upload = await S3Upload(image)
  //         this.setState({ attachment: image })
  //         this.setState({ imageLoading: false })
  //         setFieldValue('image', upload)
  //         return upload
  //       } catch (err) {
  //         this.setState({ imageLoading: false })
  //         alert('You have not selected any file')
  //       }
  //     }, 1000)
  //   }
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={mainStyle}>
      <SectionText title="Merchant">ddhdhhdh</SectionText>
      <SectionText title="Employee Name">ddhdhhdh</SectionText>
      <SectionText title="Employee Email">ddhdhhdh</SectionText>
      <SectionText title="Date">ddhdhhdh</SectionText>
      <SectionText title="Amount">ddhdhhdh</SectionText>

      <Input
        value={text}
        setvalue={settext}
        customstyle={inputStyle}
        multiline={true}
        placeholder="Add Comment"
        numberOfLines={3}>
        <Button customstyle={buttonStyle} disabled={false}>
          <MediumText customstyle={buttonTextStyle}>Save Comment</MediumText>
        </Button>
      </Input>

      <UploadImage receipt="" onPress={() => {}} />
    </ScrollView>
  );
};

export default ExpenseDetail;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    margin: RFValue(10),
  },
  imageStyle: {
    width: RFValue(50),
    height: RFValue(50),
    alignSelf: 'center',
  },
  commentStyle: {
    fontWeight: 'bold',
    marginVertical: RFValue(15),
  },
  inputStyle: {
    borderColor: COLORS.Grey,
    borderWidth: RFValue(2),
    textAlignVertical: 'top',
    marginTop: 15,
  },
  buttonStyle: {
    alignSelf: 'flex-end',
    padding: RFValue(8),
    backgroundColor: COLORS.Black,
    marginVertical: RFValue(10),
    borderRadius: RFValue(3),
  },
  buttonTextStyle: {
    color: COLORS.White,
  },
});
