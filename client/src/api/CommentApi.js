import instance from "./instance";

const CommentApi = {
  fetchComments: (chat_id) => {
    const config = {
      url: 'chat-comments',
      method: 'GET',
      params: {
        chat_id
      }
    }
    return instance.request(config);
  },
  showComment: (comment_id) => {
    const config = {
      url: `comment/${comment_id}`,
      method: 'GET',
    }
    return instance.request(config);
  },
  createComment: (comment, chat_id ) => {
    const config = {
      url: 'comment',
      method: 'POST',
      params: {
        comment, chat_id
      }
    }
    return instance.request(config);
  },
  updateComment: (updateComment, comment_id) => {
    const config = {
      url: `comment/${comment_id}`,
      method: 'PUT',
      params: {
        comment: updateComment,
      }
    }
    return instance.request(config);
  },
  deleteComment: (comment_id) => {
    const config = {
      url: `comment/${comment_id}`,
      method: 'DELETE',
    }
    return instance.request(config);
  }
}

export default CommentApi;
