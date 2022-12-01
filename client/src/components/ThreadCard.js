import React, { useContext, useState } from "react";
import moment from "moment";
import AdminThreadOptions from "../components/AdminThreadOptions";
import RichTextEditor from "../components/RichTextEditor";
import parse from "html-react-parser";
import ThreadApi from "../api/ThreadApi";
import Cookies from "js-cookie";
import { UserContext } from "../utils/UserContext";

export default function AnnouncementCard(props) {
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [params, setParams] = useState({});
  const [id, setId] = useState("");
  const { user } = useContext(UserContext);

  function handleEdit(id) {
    setId(id);
    props.isAlter();
    ThreadApi.fetchSpecificThread(id).then((res) => {
      setParams({ announcement: res.data.thread.thread_message });
    });
    setIsEdit(!isEdit);
  }

  function cancel() {
    setIsEdit(false);
    setIsShown(false);
  }

  function isChange(value) {
    setIsEdit(value);
    props.handleRefresh();
  }

  function threadOption() {
    return (
      props.isShown &&
      isShown &&
      (props.userRole === 2 || props?.user_detail?.fullname === user?.fullname)
    );
  }

  return (
    <div>
      <div
        className="relative flex w-full px-6 py-4 hover:bg-gray-200"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <img
          onError={(e) =>
            (e.target.src =
              "https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360")
          }
          src={props?.user_detail?.avatar}
          className="rounded-full w-11 h-11 ring-2 ring-gray-300 dark:ring-gray-500"
          alt="Avatar"
        />
        <div className="flex flex-col ml-2">
          <div className="flex justify-start items-center mb-2">
            <h5 className="font-bold">{props?.user_detail?.fullname}</h5>
            <span className="ml-2 text-xs">
              <i>{moment(props?.thread?.created_at).fromNow()}</i>
            </span>
          </div>
          <div className="flex w-full">
            {isEdit ? (
              <div className="rounded bg-white">
                <RichTextEditor
                  isEdit={isEdit}
                  isChange={(value) => isChange(value)}
                  handleRefresh={() => props.handleRefresh()}
                  id={id}
                  type={"university_thread"}
                  cancel={cancel}
                  params={params}
                />
              </div>
            ) : (
              <span className="text-gray-700 text-base ql-editor card">
                {props.thread.announcement
                  ? parse(props.thread.announcement)
                  : parse(props.thread.thread_message)}
                <div className="flex">
                  {props?.thread?.media.map((acceptedFile, i) => (
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
        {threadOption() && (
          <AdminThreadOptions
            id={props.thread.id}
            handleRefresh={props.handleRefresh}
            handleEdit={(id) => handleEdit(id)}
            handleDelete={props.isAlter}
          />
        )}
      </div>
    </div>
  );
}
