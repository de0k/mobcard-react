import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

export default api;
