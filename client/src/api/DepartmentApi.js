import instance from "./instance";

const DepartmentApi = {
  fetchDepartments: (token) => {
    const config = {
      method: 'GET',
      url: '/department',
      headers: { Authorization: `Bearer ${token}`}
    }
    return instance.request(config);
  }
}

export default DepartmentApi;
