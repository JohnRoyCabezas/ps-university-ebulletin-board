import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import parse from "html-react-parser";
import AdminMessageOptions from "./AdminMessageOptions";
import StudentMessageOptions from "./StudentMessageOptions";
import AnnouncementApi from "../api/AnnouncementApi";
import RichTextEditor from "../components/RichTextEditor";
import "../index.css";
import { UserContext } from "../utils/UserContext";
import "../index.css";
import ReplyBar from "./ReplyBar";

export default function AnnouncementCard({
  isAlter,
  handleRefresh,
  setValue,
  announcementThread,
  setAnnouncementThread,
  announcement,
  threadOpen,
}) {
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
  const [localAnnouncement, setLocalAnnouncement] = useState(announcement);
  const [params, setParams] = useState({});
  const { user } = useContext(UserContext);
  const { theme } = user;
  const [id, setId] = useState("");

  function handleEdit(id) {
    setId(id);
    AnnouncementApi.fetchSpecificAnnouncement(id).then((res) => {
      setParams(res.data);
    });
    setIsEdit(!isEdit);
  }

  function isChange(value) {
    setIsEdit(value);
  }

  function setThreadValue(value) {
    setValue(value);
    setAnnouncementThread(localAnnouncement.id);
    setIsThreadOpen(value);
  }

  function cancel() {
    setIsEdit(false);
    setIsShown(false);
  }

  const refreshAnnouncement = () => {
    AnnouncementApi.fetchSpecificAnnouncement(localAnnouncement.id).then(
      ({ data }) => {
        setLocalAnnouncement(data);
      }
    );
  };

  useEffect(() => {
    if (!threadOpen) setIsThreadOpen(false);
  }, [threadOpen]);

  useEffect(() => {
    setLocalAnnouncement(announcement);
  }, [announcement]);

  function adminOption() {
    return user?.role_user?.role_id === 2
      ? true
      : user?.role_user?.role_id === 4
      ? user?.id === localAnnouncement.user_id
      : false;
  }

  return (
    <>
      <div>
        <div
          className={`relative flex shadow-lg bg-white w-full border-b-2 px-4 py-2 text-gray-800 hover:bg-gray-200 ${
            isThreadOpen && announcementThread === localAnnouncement.id
              ? "bg-gray-200"
              : ""
          }`}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <img
            onError={(e) =>
              (e.target.src =
                "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
            }
            className={`ml-4 w-11 h-11 rounded border border-gray-400 bg-white bg-opacity-70`}
            src={localAnnouncement?.user?.avatar}
            alt="JC"
          />
          <div className="flex flex-col ml-2 w-full">
            <div className="flex justify-start items-center mb-2">
              <h5 className="font-bold">{localAnnouncement?.user?.fullname}</h5>
              <span className="ml-2 text-xs">
                <i>{moment(localAnnouncement?.created_at).fromNow()}</i>
              </span>
            </div>
            <div className="w-full min-w-min">
              {isEdit ? (
                <div className="rounded bg-white">
                  <RichTextEditor
                    style={{ backgroundColor: "white" }}
                    cancel={cancel}
                    isEdit={isEdit}
                    isChange={(value) => isChange(value)}
                    id={id}
                    params={params}
                  />
                </div>
              ) : (
                <span className="text-gray-700 text-base ql-editor card">
                  {parse(localAnnouncement.announcement)}
                  <div className="flex">
                    {localAnnouncement?.media.map((acceptedFile, i) => (
                      <div key={i}>
                        {acceptedFile.mime_type.includes("image") ? (
                          <img
                            className="h-20 w-20 d-flex mr-5"
                            src={`${acceptedFile.original_url}`}
                          />
                        ) : (
                          <div>
                            <a
                              href={`${acceptedFile.original_url}`}
                              target="_blank"
                              className="cursor-pointer text-xs font-semibold text-sky-600 underline decoration-sky-500 mr-5"
                            >
                              {acceptedFile.file_name}
                            </a>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <ReplyBar
                    announcement={localAnnouncement}
                    showThread={setThreadValue}
                  />
                </span>
              )}
            </div>
          </div>
          {isShown &&
            (!adminOption() ? (
              <StudentMessageOptions setValue={setThreadValue} />
            ) : (
              <AdminMessageOptions
                id={localAnnouncement.id}
                cancel={cancel}
                handleEdit={(id) => handleEdit(id)}
                setValue={setThreadValue}
              />
            ))}
        </div>
      </div>
    </>
  );
}
