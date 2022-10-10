import instance from "./instance";

const AnnouncementApi = {
  fetchAnnouncement: () => {
    const config = {
      method: 'GET',
      url: '/announcement',
    }
    return instance.request(config);
  },

  createAnnouncement: (params) => {
    const config = {
      method: 'POST',
      url: '/announcement',
      params: {
        ...params
      }
    }
    return instance.request(config);
  },

  fetchSpecificAnnouncement: (id) => {
    const config = {
      method: 'GET',
      url: `/announcement/${id}`,
    }
    return instance.request(config);
  },

  updateSpecificAnnouncement: (id, params) => {
    const config = {
      method: 'PUT',
      url: `/announcement/${id}`,
      params: {
        ...params
      }
    }
    return instance.request(config);
  },

  deleteAnnouncement: (id) => {
    const config = {
      method: 'DELETE',
      url: `/announcement/${id}`
    }
    return instance.request(config);
  }
}

export default AnnouncementApi;
