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
  }
}

export default AuthApi;
