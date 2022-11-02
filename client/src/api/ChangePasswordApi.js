import instance from "./instance";

const ChangePasswordApi = {
  update: (params) => {
    const config = {
      method: 'PUT',
      url: `/changepassword`,
      params: {
        ...params
      }
    }
    return instance.request(config);
  },
}

export default ChangePasswordApi;
