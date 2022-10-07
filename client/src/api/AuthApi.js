import instance from "./instance";

const AuthApi = {
  register: (params) => {
    const config = {
      method: 'POST',
      url: '/auth',
      params: {
        ...params
      },
    }
    return instance.request(config);
  },

  login: (params) => {
    const config = {
      method: 'POST',
      url: '/auth/login',
      params: {
        ...params
      },
    }
    return instance.request(config);
  },
  
}

export default AuthApi;
