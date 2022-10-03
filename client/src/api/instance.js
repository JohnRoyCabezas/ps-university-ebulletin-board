import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN = Cookies.get('token')

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`,
  }
});

export default instance;
