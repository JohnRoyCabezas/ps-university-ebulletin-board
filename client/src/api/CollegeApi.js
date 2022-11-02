import instance from "./instance";

const CollegeApi = {
  fetchSpecificCollege: (id) => {
    const config = {
      method: "GET",
      url: `/college/${id}`,
    };
    return instance.request(config);
  },

  createCollege: ({ college_information, college, dean, user_id }) => {
    const config = {
      method: "POST",
      url: "/college",
      params: {
        college_information,
        college,
        dean,
        user_id,
      },
    };
    return instance.request(config);
  },

  updateCollege: ({ collegeInfo, college, defaultValue }, id) => {
    const config = {
      method: "PUT",
      url: `/college/${id}`,
      params: {
        college_information: collegeInfo,
        college,
        dean: defaultValue,
      },
    };
    return instance.request(config);
  },

  deleteCollege: (id) => {
    const config = {
      method: "DELETE",
      url: `/college/${id}`,
    };
    return instance.request(config);
  },

  fetchColleges: () => {
    const config = {
      method: "GET",
      url: "/college",
    };
    return instance.request(config);
  },
};

export default CollegeApi;
