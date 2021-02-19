/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { PageHeader, Input, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { navigate } from "@reach/router";
import _ from "lodash";
// const { TextArea } = Input;

const CreatePost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const authorInfo = _.pick({ ...props.user }, ["email", "localId"]);

  //1.
  const onTitleChange = (event) => setTitle(event.target.value);
  const handleChange = (content, editor) => {
    setContent(content);
  };
  const onCreatePost = () => {
    // console.log("onCreatePost");
    let payload = { title, content, authorInfo };
    // console.log("[CreatePost.js]", payload);
    if (title !== "" && content !== "") {
      setLoading(true);
      axios
        .post(
          "https://cool-blogger-default-rtdb.firebaseio.com/posts.json",
          payload
        )
        .then((res) => {
          setLoading(false);
          console.log(res);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        })
        .finally(() => {
          navigate("/posts");
        });
    }
    setContent("");
    setTitle("");
  };

  return (
    <div className="create-post-container">
      <div className="page-header-container">
        <PageHeader
          style={{ border: "1px solid rgb(235, 237, 240)" }}
          title="Create Post"
        />
      </div>

      <div className="c-post-inputs-container">
        <div className="c-post-input-container">
          <div className="c-post-input-title">Post Title</div>
          <div className="c-post-input">
            <Input
              placeholder="Add Post Title"
              value={title}
              onChange={onTitleChange}
            />
          </div>
        </div>

        <div className="c-post-input-container">
          <div className="c-post-input-title">Post Content</div>
          <div className="c-post-input">
            {/* 2. */}
            <Editor
              apiKey="286rum7qfli8zvfp9ivrr75c21i787ujb7ieyw7zw7kv01m1"
              value={content}
              init={{
                height: 500,
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                // menubar: false,
              }}
              plugins="code tinymcespellchecker textcolor link"
              toolbar="undo redo | formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | spellchecker language spellcheckdialog"
              spellchecker_language="en"
              onEditorChange={handleChange}
            />
          </div>
        </div>

        <div className="c-post-input-button clearfix ">
          <Button
            type="primary"
            size="large"
            onClick={onCreatePost}
            loading={loading}
          >
            Create Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

/**
 * 1.
  // const onContentChange = (event) => setContent(event.target.value); for simple textar
  2.
  // <TextArea rows={16} value={content} onChange={onContentChange} /> 
 
 */
