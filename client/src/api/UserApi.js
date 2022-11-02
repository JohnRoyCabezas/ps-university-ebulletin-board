import instance from './instance';

const UserApi = {
  fetchUser: () => {
    const config = {
      method: 'GET',
      url: 'users/user',
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
  fetchStudents: ()=>{ 
    const config = {
      method: 'GET',
      url: '/users/students',
    }
    return instance.request(config);
  },
  fetchInstructors: ()=>{ 
    const config = {
      method: 'GET',
      url: '/users/instructors',
    }
    return instance.request(config);
  }
};

export default UserApi;
