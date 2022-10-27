import React, { useState } from "react";
import moment from "moment";
import AdminThreadOptions from "../components/AdminThreadOptions";
import AnnouncementApi from "../api/AnnouncementApi";
import RichTextEditor from "../components/RichTextEditor";
import parse from "html-react-parser"

export default function AnnouncementCard(props) {
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [params, setParams] = useState({});
  const [id, setId] = useState("");

  function handleEdit(id) {
    setId(id);
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
          src={props?.user_detail?.avatar}
          className="rounded-full w-12 h-12"
          alt="Avatar"
        />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{props?.user_detail?.fullname}</h5>
            <span className="ml-2 text-xs">
              <i>{moment(props?.thread?.created_at).fromNow()}</i>
            </span>
          </div>
          <div>
            {isEdit ? (
              <div className="px-5 w-full">
                <RichTextEditor
                  isEdit={isEdit}
                  isChange={(value) => isChange(value)}
                  handleRefresh={() => props.handleRefresh()}
                  id={id}
                  params={params}
                />
              </div>
            ) : (
              <span className="text-gray-700 text-base">
                
                {props.thread.announcement ? parse(props.thread.announcement): props.thread.thread_message}
              </span>
            )}
          </div>
        </div>
        {isShown && props.userRole === "admin" && <AdminThreadOptions />}
      </div>
    </div>
  );
}
