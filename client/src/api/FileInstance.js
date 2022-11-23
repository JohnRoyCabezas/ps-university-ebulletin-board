import axios from 'axios';
import Cookies from 'js-cookie';

const TOKEN = Cookies.get('token')

const AvatarInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_API}/api`,
  headers: {
    "Content-Type": "multipart/form-data",
    'Authorization': `Bearer ${TOKEN}`,
  }
});

export default AvatarInstance;
