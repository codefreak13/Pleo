import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const IMAGE_SOURCE = {
  library: 'library',
  camera: 'camera',
};

const FILE_SELECT_STATUS = {
  cancelled: 'cancelled',
};

const fetchImage = async (type = IMAGE_SOURCE.camera, options = {}) => {
  const photoLibOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  };

  const cameraOptions = {
    cameraType: 'back',
  };

  let func: any = () => {};
  let config;

  if (type === IMAGE_SOURCE.camera) {
    func = launchCamera;
    config = cameraOptions;
  } else if (type === IMAGE_SOURCE.library) {
    func = launchImageLibrary;
    config = photoLibOptions;
  }

  config = {
    ...config,
    ...options,
  };

  try {
    const res = await func(config);
    if (res && res.didCancel) {
      throw FILE_SELECT_STATUS.cancelled;
    }
    return res;
  } catch (e) {
    throw e;
  }
};

export default {
  IMAGE_SOURCE,
  fetchImage,
};
