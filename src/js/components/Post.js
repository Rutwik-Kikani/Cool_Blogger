import React, { useState, useEffect } from "react";
import { PageHeader, Card } from "antd";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

const Post = (props) => {
  // console.log(props);

  //state initialization
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //at first mount component should do following... or when props.id change then do following...
  useEffect(() => {
    //1.
    axios
      .get(
        `https://cool-blogger-default-rtdb.firebaseio.com/posts/${props.id}.json`
      )
      .then((response) => {
        // console.log("[Post.js] recevied", response.data);
        const c_post = { ...response.data };
        setTitle(c_post.title);
        setContent(c_post.content);
      })
      .catch((error) => console.log(error));
    // 2.
  }, [props.id]);

  return (
    <div className="post-container">
      <div className="page-header-container">
        <PageHeader
          style={{ border: "1px solid rgb(235, 237, 240)" }}
          title={title}
        />
      </div>
      <div className="post-content-container">
        <Card style={{ marginTop: 16 }}>{ReactHtmlParser(content)}</Card>
      </div>
    </div>
  );
};

export default Post;

// --------------------------------------------------------------------------------------------------------

/* {
  1.
  let post = api[props.id];
  2.
  setTitle(post.title);
  setContent(post.content);
  3.
  {content.split("\n").map((c_pragraph, idx) => (
            <p key={idx}>{c_pragraph}</p>
          ))}
}*/
