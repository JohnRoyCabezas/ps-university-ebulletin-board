import React, { useState } from "react";
import moment from "moment";
import AdminThreadOptions from "../components/AdminThreadOptions";
import RichTextEditor from "../components/RichTextEditor";
import parse from "html-react-parser"
import ThreadApi from "../api/ThreadApi";
import Cookies from "js-cookie";

export default function AnnouncementCard(props) {
  const [isShown, setIsShown] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [params, setParams] = useState({});
  const [id, setId] = useState("");

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
    setIsShown(false)
  }

  function isChange(value) {
    setIsEdit(value);
    props.handleRefresh();
  }

  function threadOption() {
    return props.isShown && (isShown && (props.userRole === 2 || props?.user_detail?.fullname === JSON.parse(Cookies.get('user')).fullname))
  }

  return (
    <div>
      <div
        className="relative flex w-full px-6 py-4"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        style={{
          backgroundColor: isShown ? "#EAE8E8" : "",
        }}
      >
        <img
          onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1077/1077114.png?w=360'}
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
          <div>
            {isEdit ? (
              <div className="rounded bg-white w-full">
                <RichTextEditor
                  isEdit={isEdit}
                  isChange={(value) => isChange(value)}
                  handleRefresh={() => props.handleRefresh()}
                  id={id}
                  type={'university_thread'}
                  cancel={cancel}
                  params={params}
                />
              </div>
            ) : (
              <span className="text-gray-700 text-sm ql-editor card">
                {props.thread.announcement ? parse(props.thread.announcement): parse(props.thread.thread_message)}
              </span>
            )}
          </div>
        </div>
        {
          threadOption() &&
          <AdminThreadOptions
            id={props.thread.id}
            handleRefresh={props.handleRefresh}
            handleEdit={(id) => handleEdit(id)}
            handleDelete={props.isAlter}
          />
        }
      </div>
    </div>
  );
}
