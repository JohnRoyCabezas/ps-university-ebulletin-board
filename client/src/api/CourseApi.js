import instance from "./instance";

const CourseApi = {
  createCourse: (params) => {
    const config = {
      method: "POST",
      url: '/course',
      params: {
        ...params,
      }
    }
    return instance.request(config)
  },
  fetchSpecificCourse: (id) => {
    const config = {
      method: "GET",
      url: `/course/${id}`,
    };
    return instance.request(config);
  },

  updateCourse: (params, oldData, id) => {
    const config = {
      method: "PUT",
      url: `/course/${id}`,
      params: {
        ...params,
        ...oldData,
      }
    }
    return instance.request(config)
  },
}

export default CourseApi;