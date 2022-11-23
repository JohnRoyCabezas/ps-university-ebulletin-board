import React, { useCallback } from "react";
import { Quill } from "react-quill";

const QuillEditor = ({
  type,
  value, // setValue for qlEditor[0].innerHTML
  isEditing,
  onChange, // call this callback for quill.on("textChange") - returns a value
  theme,
  placeholder,
}) => {
  const editorRef = useCallback((wrapper) => {
    const qlEditor = document
      .getElementById(`container-${type}`)
      .getElementsByClassName("ql-editor");

    if (wrapper == null) return;

    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);

    const options = {
      placeholder: placeholder,
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
      theme: theme || "snow",
    };

    const quill = new Quill(editor, options);

    const delta = quill.clipboard.convert(value);
    quill.setContents(delta, "silent");

    // quilljs onChange event
    quill.on("text-change", () => {
      // fires when the innerHTML value changes
      const qlContent = qlEditor[0].innerHTML;
      // calls the onChange callback
      // check if qlContent has value
      qlContent !== "<p><br></p>" && onChange(qlContent);
    });
  }, []);

  return <div id={`container-${type}`} ref={editorRef}></div>;
};

export default QuillEditor;
