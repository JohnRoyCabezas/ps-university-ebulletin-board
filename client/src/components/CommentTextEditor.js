import { React, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faSpinner } from '@fortawesome/free-solid-svg-icons';
import CommentApi from '../api/CommentApi';

const CommentTextEditor = ({
  chatId,
  commentId,
  handleRefresh,
  isEditing,
  setIsEditing,
}) => {
  const initialParams = {
    chat_id: chatId,
    comment_id: commentId,
    comment: '<p><br></p>',
  };
  const [status, setStatus] = useState('');
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    commentId &&
      CommentApi.showComment(commentId).then((res) => {
        setParams({ ...params, updateComment: res.data.comment });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('pending');

    isEditing
      ? CommentApi.updateComment(params).then((res) => {
          setStatus('done');
          handleRefresh();
          setIsEditing(false);
          setParams(initialParams);
        })
      : CommentApi.createComment(params).then((res) => {
          setStatus('done');
          handleRefresh();
          setParams(initialParams);
        });
  };

  const handleChange = (e) => {
    isEditing
      ? setParams({ ...params, updateComment: e })
      : setParams({ ...params, comment: e });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="rounded bg-white">
        <ReactQuill
          value={isEditing ? params?.updateComment : params?.comment}
          placeholder={'Write a chat message...'}
          onChange={handleChange}
          className="block bottom-0"
        ></ReactQuill>

        <div className="flex justify-between rte mb-2 p-2">
          <FontAwesomeIcon icon={faPaperclip} size="2x" color="#162750" />
          <div>
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  type="button"
                  className="text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSubmit}
                  disabled={params?.updateComment === '<p><br></p>' && true}
                  className={`text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
                    params?.updateComment === '<p><br></p>'
                      ? 'disabled bg-gray-300 text-gray-400'
                      : 'bg-blue-700 hover:bg-blue-800'
                  }`}
                  type="submit"
                >
                  {status === 'pending' ? (
                    <span>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        size="1x"
                        color="white"
                        spin
                      />
                    </span>
                  ) : (
                    <span>UPDATE</span>
                  )}
                </button>
              </>
            ) : (
              <button
                onClick={() => handleSubmit}
                disabled={params?.comment === '<p><br></p>' && true}
                className={`text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
                  params?.comment === '<p><br></p>'
                    ? 'disabled bg-gray-300 text-gray-400'
                    : 'bg-blue-700 hover:bg-blue-800'
                }`}
                type="submit"
              >
                {status === 'pending' ? (
                  <span>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="1x"
                      color="white"
                      spin
                    />
                  </span>
                ) : (
                  <span>SEND</span>
                )}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentTextEditor;
