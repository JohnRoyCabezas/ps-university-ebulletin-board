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
  }
}

export default CourseApi;