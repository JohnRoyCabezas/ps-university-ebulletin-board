import { React, useContext, useState, useMemo, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AnnouncementApi from "../api/AnnouncementApi";
import ThreadApi from "../api/ThreadApi";
import { UserContext } from "../utils/UserContext";
import Dropzone from "react-dropzone";
import ReactTooltip from "react-tooltip";

export default function NavBar(props) {
  const { user } = useContext(UserContext);
  const [announcement, setAnnouncement] = useState("");
  const [file, setFile] = useState();
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [buttonState, setButtonState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const editor = useRef();

  const handleSubmit = (e, announcement) => {
    e?.preventDefault();
    setButtonState(true);
    if (props.params?.type === "comment") {
      let formData = new FormData();
      formData.append("announcement_id", props.params?.announcement_id);
      formData.append("user_id", user.id);
      formData.append("thread_message", announcement);
      if (file) {
        formData.append("data", file[0]);
        formData.append("data1", file[1]);
        formData.append("data2", file[2]);
        formData.append("data3", file[3]);
        formData.append("data4", file[4]);
      }
      formData.append("_method", "POST");
      ThreadApi.createThreadMessage({ formData }).then((res) => {
        setAnnouncement("");
        setButtonState(false);
        setFile();
      });
    } else {
      let formData = new FormData();
      formData.append("announcementable_id", props.params.announcementable_id);
      formData.append(
        "announcementable_type",
        props.params.announcementable_type
      );
      if (announcement) {
        formData.append("announcement", announcement);
      } else {
        formData.append("announcement", "file:");
      }
      if (file) {
        formData.append("data", file[0]);
        formData.append("data1", file[1]);
        formData.append("data2", file[2]);
        formData.append("data3", file[3]);
        formData.append("data4", file[4]);
      }
      formData.append("_method", "POST");
      AnnouncementApi.createAnnouncement({ formData }).then((res) => {
        setAnnouncement("");
        setButtonState(false);
        setFile();
      });
    }
  };

  function handleEdit(announcement) {
    setButtonState(true);
    if (props.type === "university_thread") {
      ThreadApi.updateSpecificThread(
        { thread_message: announcement },
        props.id
      ).then((res) => {
        props.isChange(false);
      });
    } else {
      AnnouncementApi.updateSpecificAnnouncement(props.id, {
        announcement_update: announcement,
      }).then((res) => {
        props.isChange(false);
      });
    }
  }

  function deleteFiles() {
    setFile();
  }

  function handleFileSubmit(acceptedFiles) {
    var checker = 0;
    if (acceptedFiles.length <= 5) {
      <div>
        {acceptedFiles.map((file) => (
          <div key={file.name}>
            {file.size <= 5000000 ? checker : checker++}
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

  const truncate = (input) =>
    input?.length > 16 ? `${input.substring(0, 15)}...` : input;

  const handleChange = (e) => {
    setAnnouncement(e);
    setIsEdit(false);
    setEditState(true);
  };

  const modules = useMemo(
    () => ({
      keyboard: {
        bindings: {
          custom: {
            key: "enter",
            shiftKey: false,
            handler: (range, context) => {
              !(
                editor.current.value === "" ||
                editor.current.value === "<p><br></p>"
              ) &&
                (props?.isEdit
                  ? handleEdit(editor.current.value)
                  : handleSubmit(null, editor.current.value));
            },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="w-full">
      <form onSubmit={(e) => handleSubmit(e, announcement)}>
        <ReactQuill
          ref={editor}
          theme="snow"
          placeholder={"Write a comment..."}
          value={isEdit ? props.params.announcement : announcement}
          onChange={handleChange}
          className="block bottom-0"
          modules={modules}
        ></ReactQuill>

        <div className="flex justify-between rte mb-1 p-2 h-fit">
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
                      data-tip={
                        props.type === "university_thread"
                          ? "Drag and drop files here"
                          : null
                      }
                    />
                    <ReactTooltip />
                    {!file ? (
                      props.type !== "university_thread" && (
                        <div className="flex m-auto">
                          <p className="mx-2">Drag and drop files here</p>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-wrap m-auto">
                        <p className="mx-2">Number of files: {file.length}</p>
                        {file.map((file) => (
                          <>
                            <p
                              className="flex mr-4"
                              key={file.name}
                              data-tip={file.name}
                            >
                              {truncate(file.name)}
                            </p>
                            <ReactTooltip />
                          </>
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
          {props.isEdit ? (
            <>
              <div className="flex ml-2">
                <button
                  type="button"
                  onClick={() => props.cancel()}
                  className="text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit()}
                  className={`text-white w-20 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                    editState
                      ? user.theme + " bg-opacity-80 hover:bg-opacity-90"
                      : "bg-gray-300 text-gray-400"
                  }`}
                  disabled={!editState}
                >
                  {!buttonState ? (
                    "Update"
                  ) : (
                    <FontAwesomeIcon
                      icon={faSpinner}
                      size="1x"
                      color="white"
                      spin
                    />
                  )}
                </button>
              </div>
            </>
          ) : (
            <button
              className={`text-white w-20 font-medium rounded-lg text-sm px-5 mr-2 mb-2 ${
                !announcement || announcement === "<p><br></p>" || buttonState
                  ? "bg-gray-300"
                  : user.theme +
                    " bg-opacity-80 hover:bg-opacity-90 hover:bg-hover-back"
              }`}
              disabled={
                !announcement || announcement === "<p><br></p>" || buttonState
                  ? true
                  : false
              }
              type="submit"
            >
              {!buttonState ? (
                "Send"
              ) : (
                <FontAwesomeIcon
                  icon={faSpinner}
                  size="1x"
                  color="white"
                  spin
                />
              )}
            </button>
          )}
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
}
