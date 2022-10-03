import instance from "./instance";

const AnnouncementApi = {
  fetchAnnouncement: () => {
    const config = {
      method: 'GET',
      url: '/announcement',
    }
    return instance.request(config);
  }
}

export default AnnouncementApi;
