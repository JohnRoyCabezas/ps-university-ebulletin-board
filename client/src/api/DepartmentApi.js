import instance from "./instance";

const DepartmentApi = {
  createDepartment: ({department_information, college_id, user_id, department }) => {
    const config = {
      method: 'POST',
      url: '/department',
      params: {
        department_information, 
        department,
        user_id,
        college_id
      }
    }
    return instance.request(config);
  },

  fetchDepartments: () => {
    const config = {
      method: 'GET',
      url: '/department',
    }
    return instance.request(config);
  },

  fetchSpecificDepartment: (id) => {
    const config = {
      method: 'GET',
      url: `/department/${id}`,
    }
    return instance.request(config);
  }
}

export default DepartmentApi;
