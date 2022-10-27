import instance from './instance';

const ThreadApi = {
  createThreadMessage: (data) => {
    const config = {
      method: 'POST',
      url: '/thread/add',
      params: {
        ...data,
      }
    }
    return instance.request(config);
  },

  fetchThread: (id) => {
    const config = {
      method: 'GET',
      url: `/thread/${id}`,
    }
    return instance.request(config);
  },
};

export default ThreadApi;
