import instance from "./instance";

const AnnouncementApi = {
  fetchAnnouncement: (announcementable_type) => {
    const config = {
      method: 'GET',
      url: '/announcement',
      params: {
        announcementable_type
      }
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
  },

  fetchChannelAnnouncements: (params) => {
    const config = {
      method: 'GET',
      url: `/announcements`,
      params: {
        ...params
      }
    }
    return instance.request(config);
  },
  lockSpecificAnnouncement: (id) => {
    const config = {
      method: 'PUT',
      url: `/announcement/${id}/lock`,
    }
    return instance.request(config);
  },
}

export default AnnouncementApi;
