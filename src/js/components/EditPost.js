/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { PageHeader, Input, Button } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { navigate } from "@reach/router";
import _ from "lodash";

const EditPost = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowedToEdit, setAllowedToEdit] = useState(false);
  const currentUser = _.pick({ ...props.user }, ["email", "localId"]); //meaning current user info.

  // when receviing id from url then use this effect.
  useEffect(() => {
    axios
      .get(
        `https://cool-blogger-default-rtdb.firebaseio.com/posts/${props.id}.json`
      )
      .then((response) => {
        console.log(response);
        // console.log("[EditPost.js] recevied", response.data);
        const c_post = {
          ...response.data,
          authorInfo: { ...response.data.authorInfo },
        };
        setTitle(c_post.title);
        setContent(c_post.content);
        if (currentUser.localId === c_post.authorInfo.localId) {
          setAllowedToEdit(true);
        } else {
          navigate("/posts");
        }
      })
      .catch((error) => console.log(error));

    // 2.
  }, [props.id]);

  const onTitleChange = (event) => setTitle(event.target.value);
  const handleChange = (content, editor) => {
    setContent(content);
  };
  const onEditPost = () => {
    // console.log("onEditPost");
    const authorInfo = { ...currentUser };
    let payload = { title, content, authorInfo };
    // console.log("[Edit Post.js > onEditPost]", payload);
    if (title !== "" && content !== "") {
      setLoading(true);
      axios
        .put(
          `https://cool-blogger-default-rtdb.firebaseio.com/posts/${props.id}.json`,
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
          title="Edit Post"
        />
      </div>

      <div className="c-post-inputs-container">
        <div className="c-post-input-container">
          <div className="c-post-input-title">Post Title</div>
          <div className="c-post-input">
            <Input value={title} onChange={onTitleChange} />
          </div>
        </div>

        <div className="c-post-input-container">
          <div className="c-post-input-title">Post Content</div>
          <div className="c-post-input">
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
            onClick={onEditPost}
            loading={loading}
          >
            Edit Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

/**
0.
  // const { TextArea } = Input;

1.
  // const onContentChange = (event) => setContent(event.target.value); for simple textarea

2.
   <TextArea rows={16} value={content} onChange={onContentChange} /> 

3.
  
  
  
*/
