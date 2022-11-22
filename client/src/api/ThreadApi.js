import instance from "./instance";

const ThreadApi = {
  createThreadMessage: (payload) => {
    const config = {
      method: "POST",
      url: "/thread/add",
      data: payload.formData,
      headers: { "Content-Type": "multipart/form-data" },
    };
    return instance.request(config);
  },

  fetchThread: (id) => {
    const config = {
      method: "GET",
      url: `/thread/${id}`,
    };
    return instance.request(config);
  },

  fetchSpecificThread: (id) => {
    const config = {
      method: "GET",
      url: `/thread/specific/${id}`,
    };
    return instance.request(config);
  },

  updateSpecificThread: (params, id) => {
    const config = {
      method: "PUT",
      url: `/thread/update/${id}`,
      params: {
        ...params,
      },
    };
    return instance.request(config);
  },

  deleteThread: (id) => {
    const config = {
      method: "DELETE",
      url: `/thread/destroy/${id}`,
    };
    return instance.request(config);
  },
};

export default ThreadApi;
