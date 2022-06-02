import {Platform} from 'react-native';

const port = '8888';
const baseUrl =
  Platform.OS === 'android'
    ? `http://10.0.2.2:${port}`
    : `http://localhost:${port}`;

const api = {
  async getBallotData() {
    const res = await fetch(`${baseUrl}/api/getBallotData`);
    return await res.json();
  },

};

export default api;
