import instance from "./instance";

const RoleApi = {
  fetchRoles: () => {
    const config = {
      method: 'GET',
      url: '/role',
    }
    return instance.request(config);
  }
}

export default RoleApi;
