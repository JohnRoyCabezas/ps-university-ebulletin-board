import { React, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSpinner } from "@fortawesome/free-solid-svg-icons";
import CommentApi from "../api/CommentApi";
import Dropzone from "react-dropzone";

const CommentTextEditor = ({ chatId, commentId, isEditing, setIsEditing }) => {
  const initialParams = {
    chat_id: chatId,
    comment_id: commentId,
    comment: "<p><br></p>",
  };
  const [status, setStatus] = useState("");
  const [params, setParams] = useState(initialParams);
  const [file, setFile] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    commentId &&
      CommentApi.showComment(commentId).then((res) => {
        setParams({ ...params, updateComment: res.data.comment });
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("pending");
    if (isEditing) {
      CommentApi.updateComment(params).then((res) => {
        setStatus("done");
        setIsEditing(false);
        setParams(initialParams);
      });
    } else {
      let formData = new FormData();
      formData.append("comment", params.comment);
      formData.append("chat_id", chatId);
      if (file) {
        formData.append("data", file[0]);
        formData.append("data1", file[1]);
        formData.append("data2", file[2]);
        formData.append("data3", file[3]);
        formData.append("data4", file[4]);
      }
      formData.append("_method", "POST");
      CommentApi.createComment({ formData }).then((res) => {
        setStatus("done");
        setParams(initialParams);
        setFile();
      });
    }
  };

  function deleteFiles() {
    setFile();
  }

  function handleFileSubmit(acceptedFiles) {
    var checker = 0;
    if (acceptedFiles.length <= 5) {
      <div>
        {acceptedFiles.map((file) => (
          <div key={file.name}>
            {file.size <= 5242880 ? checker : checker++}
            {checker < 1 ? setFile(acceptedFiles) : setShow()}
          </div>
        ))}
      </div>;
    } else {
      setShow();
    }
  }

  function setShow() {
    setShowModal(true);
    setFile();
  }

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
          placeholder={"Write a chat message..."}
          onChange={handleChange}
          className="block bottom-0"
        ></ReactQuill>

        <div className="flex justify-between rte p-2">
          <div className="flex">
            <Dropzone
              onDrop={(acceptedFiles) => handleFileSubmit(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()} className="flex">
                    <input {...getInputProps()} />
                    <FontAwesomeIcon
                      className="mt-1"
                      icon={faPaperclip}
                      size="2x"
                      color="#162750"
                    />
                    {!file ? (
                      <div className="flex mt-2">
                        <p className="mx-2">Drag and drop files here</p>
                      </div>
                    ) : (
                      <div className="flex mt-2">
                        <p className="mx-2">Number of files: {file.length}</p>
                        {file.map((file) => (
                          <div className="flex mr-4" key={file.name}>
                            {file.name}
                          </div>
                        ))}
                        <button
                          className={`text-white w-12 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 mb-2 bg-red-700 dark:bg-background dark:hover:bg-secondary-background hover:bg-hover-back`}
                          onClick={() => deleteFiles()}
                        >
                          x
                        </button>
                      </div>
                    )}
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
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
                  disabled={params?.updateComment === "<p><br></p>" && true}
                  className={`text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
                    params?.updateComment === "<p><br></p>"
                      ? "disabled bg-gray-300 text-gray-400"
                      : "bg-blue-700 hover:bg-blue-800"
                  }`}
                  type="submit"
                >
                  {status === "pending" ? (
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
                disabled={params?.comment === "<p><br></p>" && true}
                className={`text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 ${
                  params?.comment === "<p><br></p>"
                    ? "disabled bg-gray-300 text-gray-400"
                    : "bg-blue-700 hover:bg-blue-800"
                }`}
                type="submit"
              >
                {status === "pending" ? (
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
        {showModal && (
          <div>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">File Upload</h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-100 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <p className="my-4 text-slate-500 text-lg leading-relaxed">
                      You can upload up to 5 files each up to 5mb per message.
                      Please try again!
                    </p>
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentTextEditor;
