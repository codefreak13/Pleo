import {Platform} from 'react-native';

const port = '3000';
const baseUrl =
  Platform.OS === 'android'
    ? `http://10.0.2.2:${port}`
    : `http://localhost:${port}`;

const api = {
  async getExpenses() {
    const res = await fetch(`${baseUrl}/expenses`);
    return await res.json();
  },
};

export default api;
