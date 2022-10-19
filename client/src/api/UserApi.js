import instance from './instance';

const UserApi = {
  fetchUser: () => {
    const config = {
      method: 'GET',
      url: '/user',
    }
    return instance.request(config);
  },
  fetchAllUsers: (params) => {
    const config = {
      method: 'GET',
      url: '/users',
      params: {
        ...params,
      },
    };
    return instance.request(config);
  },
  fetchDeans: () => {
    const config = {
      method: 'GET',
      url: '/users/deans',
    };
    return instance.request(config);
  },
};

export default UserApi;
