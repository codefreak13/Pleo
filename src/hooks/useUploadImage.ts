import {useRef, useState} from 'react';

const useUploadImage = () => {
  const isCarousel = useRef(null);
  const [index, setIndex] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const selectImageMedium = async (type: string | undefined) => {
    setModalVisible(!modalVisible);
    if (type) {
      setType(type);
    }
  };

  return {
    index,
    isCarousel,
    setIndex,
    type,
    setType,
    selectImageMedium,
    modalVisible,
    setModalVisible,
  };
};

export default useUploadImage;
