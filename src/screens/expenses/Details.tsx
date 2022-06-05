import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SectionText,
  Input,
  Button,
  MediumText,
  UploadImage,
} from '../../components';
import {COLORS} from '../../styles';
import {ExpenseDataProps} from './List';
import {formatDate} from '../../utils';
import {RootNavigationRouteProp} from '../../navigation/RootTypes';

const ExpenseDetail = (props: RootNavigationRouteProp) => {
  const {
    route: {
      params: {
        item: {
          amount: {currency, value},
          merchant,
          receipt,
          date,
          user: {first, last, email},
          comment,
        },
      },
    },
  } = props;
  const {
    mainStyle,
    imageStyle,
    commentStyle,
    buttonStyle,
    inputStyle,
    buttonTextStyle,
  } = styles;

  const [text, settext] = useState<string>('');
  const emptyImage = require('../../../assets/images/upload.png');
  const image = receipt ? {uri: receipt} : emptyImage;

  const attachRequestImage = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 1,
    };

    try {
      const res = await launchImageLibrary(options);
      // setState({ imageLoading: true })

      const image = {
        uri: res?.assets[0]?.uri,
        type: res?.assets[0]?.type,
      };
      console.log(image, 'image');
      //   const upload = await S3Upload(image)
      //   this.setState({ attachment: image })
      //   this.setState({ imageLoading: false })
      //   setFieldValue('image', upload)
      //   return upload
    } catch (err) {
      console.log(err);
      //   this.setState({ imageLoading: false })
      //   alert('You have not selected any file')
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={mainStyle}>
      <SectionText title="Merchant">{merchant}</SectionText>
      <SectionText title="Employee Name">{`${first} ${last}`}</SectionText>
      <SectionText title="Employee Email">{email}</SectionText>
      <SectionText title="Date">{formatDate.dateB(date)}</SectionText>
      <SectionText title="Amount">{`${value} ${currency}`}</SectionText>

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

      <UploadImage
        receipt=""
        onPress={() => {
          attachRequestImage();
        }}
      />
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
