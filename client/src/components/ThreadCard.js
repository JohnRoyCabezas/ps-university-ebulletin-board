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
    ThreadApi.fetchSpecificThread(id).then((res) => {
      setParams({ announcement: res.data.thread.thread_message });
    });
    setIsEdit(true);
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
              <span className="cardText text-gray-700 text-base">
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
            />
        }
      </div>
    </div>
  );
}
