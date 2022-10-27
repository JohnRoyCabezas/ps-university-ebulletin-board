import instance from "./instance";

const ChatApi = {
  fetchCourseChats: (course_id) => {
    const config = {
      method: 'GET',
      url: 'course-chats',
      params: {
        course_id
      }
    }
    return instance.request(config);
  },
  createChat: (params) => {
    const config = {
      method: 'POST',
      url: 'chat',
      params: {
        ...params
      }
    }
    return instance.request(config)
  },
  showChat: (id) => {
    const config = {
      method: 'GET',
      url: `chat/${id}`,
    }
    return instance.request(config);
  },
  updateChat: ({updateChat, chatid}) => {
    const config =  {
      method: 'PUT',
      url: `chat/${chatid}`,
      params: {
        chat: updateChat
      }
    }
    return instance.request(config);
  },
  deleteChat: (id) => {
    const config =  {
      method: 'DELETE',
      url: `chat/${id}`,
    }
    return instance.request(config);
  }
}

export default ChatApi;