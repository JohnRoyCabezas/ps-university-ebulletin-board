import { React, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faSpinner } from '@fortawesome/free-solid-svg-icons';
import ChatApi from '../api/ChatApi';

const ChatTextEditor = ({
  classid,
  chatid,
  handleRefresh,
  isEditing,
  setIsEditing,
}) => {
  const initialParams = {
    chatid: chatid,
    course_id: classid,
    chat: '<p><br></p>',
    updateChat: '<p><br></p>',
  };
  const [status, setStatus] = useState('');
  const [params, setParams] = useState(initialParams);

  useEffect(() => {
    chatid &&
      ChatApi.showChat(chatid).then((res) => {
        setParams({ ...params, updateChat: res.data.chat });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('pending');

    isEditing
      ? ChatApi.updateChat(params).then((res) => {
          setStatus('done');
          handleRefresh();
          setIsEditing(false);
          setParams(initialParams);
        })
      : ChatApi.createChat(params).then((res) => {
          setStatus('done');
          handleRefresh();
          setParams(initialParams);
        });
  };

  const handleChange = (e) => {
    isEditing
      ? setParams({ ...params, updateChat: e })
      : setParams({ ...params, chat: e });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          value={isEditing ? params?.updateChat : params.chat}
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
                  disabled={params?.updateChat === '<p><br></p>' && true}
                  className={`text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
                    params?.updateChat === '<p><br></p>'
                      ? 'disabled bg-blue-400'
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
                disabled={params?.updateChat === params?.chat && true}
                className={`text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
                  params?.chat === '<p><br></p>'
                    ? 'disabled bg-blue-400'
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

export default ChatTextEditor;
