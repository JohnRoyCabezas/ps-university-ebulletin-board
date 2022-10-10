import { React, useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-regular-svg-icons";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import AnnouncementApi from "../api/AnnouncementApi";

export default function NavBar(props) {

  const [announcement, setAnnouncement] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [isEdit, setIsEdit] = useState(props.isEdit);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!props.isEdit && !isEdit) {
      AnnouncementApi.createAnnouncement(
        {
          announcementable_id: props.params.announcementable_id,
          announcementable_type: props.params.announcementable_type,
          announcement: announcement
        }).then(
          (res) => {
            setAnnouncement('');
            props.handleRefresh(res.data.announcement);
          },
          (err) => {
            setErrMsg(err.response.data.errors);
          }
        )
    }

    else {
      AnnouncementApi.updateSpecificAnnouncement(props.id, { announcement_update: announcement }).then(
        (res) => {
          props.isChange(false)
        }
      )
    }
  }

  const handleChange = (e) => {
    setAnnouncement(e);
    setIsEdit(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReactQuill theme="snow" placeholder={"Write a comment..."} value={(isEdit) ? props.params.announcement : announcement} onChange={handleChange} className="block bottom-0"></ReactQuill>
        <div className="flex justify-between rte mb-2 p-2">
          <FontAwesomeIcon
            icon={faPaperclip}
            size="2x"
            color="#162750"
          />
          <button disabled={!(announcement) ? true : false} type="submit">
            <FontAwesomeIcon
              icon={faArrowAltCircleRight}
              size="2x"
              color="#162750"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
