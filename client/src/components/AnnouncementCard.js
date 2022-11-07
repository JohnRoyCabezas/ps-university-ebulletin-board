import React, { useState } from "react";
import moment from "moment";
import parse from "html-react-parser";
import AdminMessageOptions from "./AdminMessageOptions";
import StudentMessageOptions from "./StudentMessageOptions";
import AnnouncementApi from "../api/AnnouncementApi";
import RichTextEditor from "../components/RichTextEditor";
import "../index.css"

export default function AnnouncementCard(props) {
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [params, setParams] = useState({});
  const [id, setId] = useState("");

  function handleEdit(id) {
    setId(id);
    setIsEdit(false)
    AnnouncementApi.fetchSpecificAnnouncement(id).then((res) => {
      setParams(res.data);
    });
    setIsEdit(true);
  }

  function isChange(value) {
    setIsEdit(value);
    props.handleRefresh();
  }

  function setThreadValue(value) {
    props.setValue(value);
    props.setAnnouncementThread(props.announcement.id)
  }

  function cancel() {
    setIsEdit(false);
    setIsShown(false)
  }

  return (
    <div>
      <div
        className="relative flex shadow-lg bg-white w-full border-b-2 p-6"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          backgroundColor: isShown ? "#EAE8E8" : "",
        }}
      >
          <img 
          onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
          className="mr-3 w-11 h-11 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" 
          src={props?.announcement?.user?.avatar} 
          alt="avatar" />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{props?.announcement?.user?.fullname}</h5>
            <span className="ml-2 text-xs"><i>{moment(props?.announcement?.created_at).fromNow()}</i></span>
          </div>
          <div>

            {
              isEdit ? (
                <div className="rounded w-[75vw] bg-white">
                  <RichTextEditor
                    style={{ backgroundColor: "white" }}
                    cancel={cancel}
                    isEdit={isEdit}
                    isChange={(value) => isChange(value)}
                    handleRefresh={() => props.handleRefresh()}
                    id={id}
                    params={params}
                  />
                </div>
              ) : (
                <span className="cardText text-gray-700 text-base">
                    {parse(props.announcement.announcement)}
                </span>
              )
            }

          </div>
        </div>
        {isShown &&
          (props.userRole === "student" ? (
            <StudentMessageOptions setValue={setThreadValue} />
          ) : (
            <AdminMessageOptions
              id={props.announcement.id}
              cancel={cancel}
              handleRefresh={props.handleRefresh}
              handleEdit={(id) => handleEdit(id)}
              setValue={setThreadValue}
            />
          ))}
      </div>
    </div>
  );
}
