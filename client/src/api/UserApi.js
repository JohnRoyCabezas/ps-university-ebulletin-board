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
  fetchDeans: (id) => {
    const config = {
      method: 'GET',
      url: '/users/deans',
      params: {
        university_id: id
      }
    };
    return instance.request(config);
  },
  fetchStudents: (id)=>{ 
    const config = {
      method: 'GET',
      url: '/users/students',
      params: {
        university_id: id
      }
    }
    return instance.request(config);
  },
  fetchInstructors: (id)=>{ 
    const config = {
      method: 'GET',
      url: '/users/instructors',
      params: {
        university_id: id
      }
    }
    return instance.request(config);
  }
};

export default UserApi;
