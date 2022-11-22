import React, { useCallback, useState, useContext } from "react";
import { Quill } from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../utils/UserContext";
import ChatApi from "../api/ChatApi";
import CommentApi from "../api/CommentApi";

const TextEditor = ({
  type,
  classid,
  chat,
  comment,
  isEditing,
  setIsEditing,
}) => {
  const { theme } = useContext(UserContext).user;
  const initialParams = {
    message: "<p><br></p>",
    updateMessage: "<p><br></p>",
  };
  const [params, setParams] = useState(initialParams);
  const [status, setStatus] = useState("");

  // text-editor
  const editorRef = useCallback((wrapper) => {
    const qlEditor = document
      .getElementById(`container-${type}`).getElementsByClassName("ql-editor");

    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const options = {
      modules: {
        toolbar: isEditing
          ? false
          : [
              ["bold", "italic", "strike"],

              [{ list: "ordered" }, { list: "bullet" }],
              [{ align: [] }],
              ["blockquote", "code-block"],
            ],
        keyboard: {
          bindings: {
            enter: {
              key: 13,
              handler: () => {
                return false;
              },
            },
          },
        },
      },
      theme: "snow",
    };

    const quill = new Quill(editor, options);

    const value = chat?.chat || comment?.comment;
    const delta = quill.clipboard.convert(value);

    if (isEditing) {
      quill.setContents(delta, "silent");
    }
    // quilljs onChange event
    quill.on("text-change", () => {
      const qlContent = qlEditor[0].innerHTML;
      isEditing
        ? setParams({ ...params, updateMessage: qlContent })
        : setParams({ ...params, message: qlContent });
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("pending");
    
    if (type === "chat") {
      isEditing
        ? ChatApi.updateChat(params?.updateMessage, chat?.id).then((res) => {
            setIsEditing(false);
            setParams(initialParams);
            setStatus("done");
            
            // clear chat text editor
            document
              .getElementById("container-chat")
              .getElementsByClassName("ql-editor")[0].innerHTML = "";
          })
        : ChatApi.createChat(params?.message, classid).then((res) => {
            e.preventDefault();
            setParams(initialParams);
            setStatus("done");
            
            // clear chat text editor
            document
              .getElementById("container-chat")
              .getElementsByClassName("ql-editor")[0].innerHTML = "";
          });
    } else if (type === "comment") {
      isEditing
        ? CommentApi.updateComment(params?.updateMessage, comment?.id).then((res) => {
            setStatus("done");
            setIsEditing(false);
            setParams(initialParams);

            // clear comment text editor
            document
            .getElementById("container-comment")
            .getElementsByClassName("ql-editor")[0].innerHTML = "";
          })
        : CommentApi.createComment(params?.message, chat?.id).then((res) => {
            setStatus("done");
            setParams(initialParams);

            // clear comment text editor
            document
            .getElementById("container-comment")
            .getElementsByClassName("ql-editor")[0].innerHTML = "";
          });
    }
  };

  const keyPressCheck = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <div>
      <form
        onKeyDown={keyPressCheck}
        onSubmit={handleSubmit}
        className="flex flex-col bg-white rounded"
      >
        <div id={`container-${type}`} ref={editorRef}></div>

        <div className="flex justify-between items-center py-1 px-2  border-gray-300 border-x border-b rounded-b text-gray-600">
          <button>
            <FontAwesomeIcon
              icon={faPlus}
              size="lg"
              className="flex justify-center items-center rounded-full h-3 w-3 p-2 transition-all ease-in bg-gray-100 hover:bg-gray-200"
            />
          </button>
          {isEditing ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex justify-center items-center rounded text-sm text-white py-1 px-2 w-16 transition-all ease-in bg-gray-600 hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={params?.updateMessage === "<p><br></p>" && true}
                className={`flex justify-center items-center rounded text-sm text-white py-1 px-2 w-16 transition-all ease-in 
                ${
                  params?.updateMessage === "<p><br></p>"
                    ? "disabled bg-gray-300 text-gray-400"
                    : `${theme} hover:bg-opacity-90`
                }`}
              >
                {status === "pending" ? (
                  <span>
                    <FontAwesomeIcon icon={faSpinner} size="sm" spin />
                  </span>
                ) : (
                  <span>Save</span>
                )}
              </button>
            </div>
          ) : (
            <button
              disabled={params?.message === "<p><br></p>" && true}
              type="submit"
              className={`flex justify-center items-center rounded py-1 px-2 w-20 text-sm text-white transition-all ease-in ${
                params?.message === "<p><br></p>"
                  ? "disabled bg-gray-300 text-gray-400"
                  : `${theme} hover:bg-opacity-90`
              }`}
            >
              {status === "pending" ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin />
                </span>
              ) : (
                <span>Send</span>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TextEditor;
