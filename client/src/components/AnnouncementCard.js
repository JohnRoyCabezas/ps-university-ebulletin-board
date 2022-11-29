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

export default function AnnouncementCard(props) {
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isThreadOpen, setIsThreadOpen] = useState(false);
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
    props.setValue(value);
    props.setAnnouncementThread(props.announcement.id);
    setIsThreadOpen(!isThreadOpen);
  }

  function cancel() {
    setIsEdit(false);
    setIsShown(false);
  }

  useEffect(() => {
    if (!props.threadOpen) setIsThreadOpen(false);
  }, [props.threadOpen]);

  function adminOption() {
    return user?.role_user?.role_id === 2
      ? true
      : user?.role_user?.role_id === 4
        ? user?.id === props.announcement.user_id
        : false;
  }

  return (
    <>
      <div>
        <div
          className="relative flex shadow-lg bg-white w-full border-b-2 p-6"
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          style={{
            backgroundColor: isShown || isThreadOpen ? "#EAE8E8" : "",
          }}
        >
          <img
            onError={(e) =>
            (e.target.src =
              "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
            }
            className={`mr-3 w-11 h-11 rounded-full ${theme} bg-opacity-70`}
            src={props?.announcement?.user?.avatar}
            alt="JC"
          />
          <div className="flex flex-col ml-2">
            <div className="flex justify-start items-center mb-2">
              <h5 className="font-bold">
                {props?.announcement?.user?.fullname}
              </h5>
              <span className="ml-2 text-xs">
                <i>{moment(props?.announcement?.created_at).fromNow()}</i>
              </span>
            </div>
            <div>
              {isEdit ? (
                <div className="rounded w-[75vw] bg-white">
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
                  {parse(props.announcement.announcement)}
                  <div className="flex">
                    {props?.announcement?.media.map((acceptedFile, i) => (
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
                </span>
              )}
            </div>
          </div>
          {isShown &&
            (!adminOption() ? (
              <StudentMessageOptions setValue={setThreadValue} />
            ) : (
              <AdminMessageOptions
                id={props.announcement.id}
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
