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

  show: (id) => {
    const config = {
      method: 'GET',
      url: `/auth/${id}`
    }
    return instance.request(config);
  },

  update: (id, params) => {
    const config = {
      method: 'PUT',
      url: `/auth/${id}`,
      params: {
        ...params
      }
    }
    return instance.request(config);
  },

  softDelete: (id) => {
    const config = {
      method: 'DELETE',
      url: `/auth/${id}`,
     
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

  logout: () => {
    const config = {
      method: 'POST',
      url: '/auth/logout'
    }
    return instance.request(config);
  }
  
}

export default AuthApi;
