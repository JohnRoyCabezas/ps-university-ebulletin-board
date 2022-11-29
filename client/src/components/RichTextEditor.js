import { React, useContext, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AnnouncementApi from "../api/AnnouncementApi";
import ThreadApi from "../api/ThreadApi";
import { UserContext } from "../utils/UserContext";
import Dropzone from "react-dropzone";

export default function NavBar(props) {
  const { user } = useContext(UserContext);
  const [announcement, setAnnouncement] = useState("");
  const [file, setFile] = useState();
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [buttonState, setButtonState] = useState(false);
  const [editState, setEditState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      formData.append("announcement", announcement);
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
        props.initScroll(true)
        setFile();
      });
    }
  };

  function handleEdit() {
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

  const handleChange = (e) => {
    setAnnouncement(e);
    setIsEdit(false);
    setEditState(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuill
          theme="snow"
          placeholder={"Write a comment..."}
          value={isEdit ? props.params.announcement : announcement}
          onChange={handleChange}
          className="block bottom-0"
        ></ReactQuill>

        <div className="flex justify-between rte mb-1 p-2 h-14">
          <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles)}>
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <FontAwesomeIcon
                    className="mt-1"
                    icon={faPaperclip}
                    size="2x"
                    color="#162750"
                  />
                </div>
              </section>
            )}
          </Dropzone>
          {props.isEdit ? (
            <>
              <div>
                <button
                  type="button"
                  onClick={() => props.cancel()}
                  className="text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit()}
                  className={`text-white w-20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${editState
                      ? "bg-blue-700 hover:bg-blue-800"
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
              className={`text-white w-20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 ${!announcement || announcement === "<p><br></p>" || buttonState
                  ? "bg-gray-300"
                  : "bg-blue-700 dark:bg-background dark:hover:bg-secondary-background hover:bg-hover-back"
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
      </form>
    </div>
  );
}
