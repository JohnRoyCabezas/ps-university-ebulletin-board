import instance from "./instance";

const SettingsApi = {
  update: (params) => {
    const config = {
      method: 'PUT',
      url: `settings/changepassword`,
      params: {
        ...params
      }
    }
    return instance.request(config);
  },

  theme: (param, id) => {
    const config = {
      method: 'PUT',
      url: `settings/changetheme/${id}`,
      params: {
        ...param
      }
    }
    return instance.request(config);
  },
}

export default SettingsApi;
