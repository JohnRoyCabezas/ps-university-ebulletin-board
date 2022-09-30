import instance from "./instance";

const AuthApi = {
  register: (token, params) => {
    const config = {
      method: 'POST',
      url: '/auth',
      params: {
        ...params
      },
      headers: { Authorization: `Bearer ${token}`}
    }
    return instance.request(config);
  }
}

export default AuthApi;
