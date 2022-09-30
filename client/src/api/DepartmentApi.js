import instance from "./instance";

const DepartmentApi = {
  fetchDepartments: () => {
    const config = {
      method: 'GET',
      url: '/department',
    }
    return instance.request(config);
  }
}

export default DepartmentApi;
