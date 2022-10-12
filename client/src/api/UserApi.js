import instance from './instance';

const UserApi = {
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
};

export default UserApi;
