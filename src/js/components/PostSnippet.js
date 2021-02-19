/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "@reach/router";
import ReactHtmlParser from "react-html-parser";
import { Card, Divider } from "antd";

const PostSnippet = (props) => {
  // console.log("[PostSnippets.js]", props);
  const htmlStr = props.content;
  // console.log("[PostSnippet.js] what come in props \n", htmlStr);

  return (
    <div className="article-snippet-container">
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={props.title}
        extra={
          <div className="post_snippet_links">
            <Link to={`/post/${props.id}`} style={{ marginRight: "15px" }}>
              Read Full Article
            </Link>
            {props.user && props.user.localId === props.authorInfo.localId ? (
              <div className="post_edit_links" style={{ float: "right" }}>
                <Link
                  to={`/edit_post/${props.id}`}
                  style={{ marginRight: "15px" }}
                >
                  Edit
                </Link>
                <Link to={`/delete_post/${props.id}`}>Delete</Link>
              </div>
            ) : null}
          </div>
        }
      >
        <div className="article-snippet-content">
          {ReactHtmlParser(htmlStr)}
        </div>
        <Divider />
        <div
          className="article-author-name"
          style={{ float: "right", color: "Blue", fontWeight: "bold" }}
        >
          {props.authorInfo.email}
        </div>
      </Card>
    </div>
  );
};

export default PostSnippet;

/**
// import { Editor } from "@tinymce/tinymce-react";
 * 1.
      {props.content}
          { {props.content.split("\n").map((c_paragraph, idx) => (
            <p key={idx}>{c_paragraph}</p>
          ))} }
          { <Editor
            apiKey="286rum7qfli8zvfp9ivrr75c21i787ujb7ieyw7zw7kv01m1"
            value={props.content}
            disabled={true}
            init={{
              height: 300,
              menubar: false,
              toolbar: false,
            }}
          ></Editor> }
 */
