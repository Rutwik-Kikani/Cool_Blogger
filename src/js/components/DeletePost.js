import React, { useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const DeletePost = (props) => {
  useEffect(() => {
    // console.log("[DeletePost.js] post ", props.id, " deleted");
    // console.log("[onDeletePost.js]");
    axios
      .delete(
        `https://cool-blogger-default-rtdb.firebaseio.com/posts/${props.id}.json`
      )
      .then((response) => {
        console.log(response);
        navigate("/posts");
      })
      .catch((error) => {
        console.log(error);
        navigate("/posts");
      });
  }, [props.id]);

  return <div></div>;
};

export default DeletePost;
