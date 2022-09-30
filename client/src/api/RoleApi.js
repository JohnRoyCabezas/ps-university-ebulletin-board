import instance from "./instance";

const RoleApi = {
  fetchRoles: (token) => {
    const config = {
      method: 'GET',
      url: '/role',
      headers: { Authorization: `Bearer ${token}`}
    }
    return instance.request(config);
  }
}

export default RoleApi;
