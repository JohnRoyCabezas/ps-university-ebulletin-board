import instance from "./instance";

const UniversityApi = {
  createUniversity: (params) => {
    const config = {
      method: "POST",
      url: "/university",
      params: {
        ...params,
      },
    };
    return instance.request(config);
  },
  fetchUniversities: () => {
    const config = {
      method: "GET",
      url: "/university",
    };
    return instance.request(config);
  },

  fetchSpecificUniversity: (id) => {
    const config = {
      method: "GET",
      url: `/university/${id}`,
    };
    return instance.request(config);
  },
};

export default UniversityApi;
