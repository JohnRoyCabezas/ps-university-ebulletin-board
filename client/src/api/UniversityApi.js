import instance from "./instance";

const UniversityApi = {
  createUniversity: (params) => {
    const config = {
      method: "POST",
      url: '/university',
      params: {
        ...params,
      }
    }
    return instance.request(config)
  }
}

export default UniversityApi;