import { React, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faSpinner } from "@fortawesome/free-solid-svg-icons";
import AnnouncementApi from "../api/AnnouncementApi";
import ThreadApi from "../api/ThreadApi";
import Cookies from "js-cookie";
import parse from 'html-react-parser';

export default function NavBar(props) {

  const [announcement, setAnnouncement] = useState('');
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [buttonState, setButtonState] = useState(false);
  const [editState, setEditState] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonState(true);

    if (props.params?.type === "comment") {
      ThreadApi.createThreadMessage({
        user_id: JSON.parse(Cookies.get('user') || '{}').id,
        announcement_id: props.params?.announcement_id,
        thread_message: announcement,
      }).then(
        (res) => {
          setAnnouncement('');
          props.handleRefresh(res.data);
          setButtonState(false)
        }
      )
    } else {
      AnnouncementApi.createAnnouncement(
        {
          announcementable_id: props.params.announcementable_id,
          announcementable_type: props.params.announcementable_type,
          announcement: announcement
        }).then(
          (res) => {
            setAnnouncement('');
            props.handleRefresh(res.data.announcement);
            setButtonState(false)
          }
        )
    }
  }

  function handleEdit() {
    setButtonState(true);
    if (props.type === 'university_thread') {
      ThreadApi.updateSpecificThread({ thread_message: announcement }, props.id).then(
        () => {
          props.isChange(false)
        }
      )
    } else {
      AnnouncementApi.updateSpecificAnnouncement(props.id, { announcement_update: announcement }).then(
        () => {
          props.isChange(false)
        }
      )
    }
  }

  const handleChange = (e) => {
    setAnnouncement(e);
    setIsEdit(false);
    setEditState(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>

        <ReactQuill
          theme="snow"
          placeholder={"Write a comment..."}
          value={(isEdit) ? props.params.announcement : announcement}
          onChange={handleChange}
          className="block bottom-0">
        </ReactQuill>

        <div className="flex justify-between rte mb-1 p-2 h-14">
          <FontAwesomeIcon
            className="mt-1"
            icon={faPaperclip}
            size="2x"
            color="#162750"
          />
          {
            props.isEdit ?
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
                    className={`text-white w-20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${editState ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-300 text-gray-400'}`}
                    disabled={!editState}
                  >
                    {
                      !buttonState ?
                        "Update"
                        :
                        <FontAwesomeIcon icon={faSpinner} size="1x" color="white" spin />
                    }

                  </button>
                </div>
              </>
              :
              <button
                className={`text-white w-20 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 mr-2 mb-2 ${!(announcement) || (announcement === "<p><br></p>") || buttonState ? 'bg-gray-300' : 'bg-blue-700 dark:bg-background dark:hover:bg-secondary-background hover:bg-hover-back'}`}
                disabled={!(announcement) || announcement === "<p><br></p>" || buttonState ? true : false}
                type="submit"
              >
                {
                  !buttonState ?
                    "Send"
                    :
                    <FontAwesomeIcon icon={faSpinner} size="1x" color="white" spin />
                }
              </button>

          }
        </div>
      </form>
    </div>
  );
}
