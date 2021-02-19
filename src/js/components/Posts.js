/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { PageHeader, Spin, Input } from "antd";
import PostSnippet from "./PostSnippet";

//Components
import _ from "lodash";
import axios from "axios";

const Posts = (props) => {
  // console.log(props);

  const [posts, setPosts] = useState([]);
  const [q, setQ] = useState("");
  const [pageLoading, setPageLoading] = useState(false);

  //when component mount then call this effect.
  useEffect(() => {
    //before making http request set status to true.
    setPageLoading(true);
    axios
      .get("https://cool-blogger-default-rtdb.firebaseio.com/posts.json")
      .then(({ data }) => {
        setPageLoading(false);
        // console.log("[Posts.js > componentDidMount ] We receive a javascript object: ", data);
        const postsData = [];

        //1st method.
        Object.keys(data).forEach((key) => {
          // console.log("[Posts.js] ", key, ":---->", data[key]);
          postsData.push({ ...data[key], firebase_key: key });
        });
        //1.
        //set it in state... or concate it
        // setPosts((posts) => [...posts, ...postsData]);
        setPosts(postsData);

        // console.log("[Posts.js > componentDidMount] We convert that object to array: ", postsData);
      })
      .catch((error) => {
        setPageLoading(false);
        console.log(error);
      });
  }, []);

  //when posts state (variable posts) changes then call this effect.
  // 3.

  // return am array base on value of state "q" (q for query)
  function search(posts) {
    // console.log("[Post.js] search", posts);

    return posts.filter(
      (post) =>
        post.title.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
        post.authorInfo.email.toLowerCase().indexOf(q.toLowerCase()) > -1
    );
  }

  if (pageLoading) {
    return (
      <div className="spinner">
        <Spin />
      </div>
    );
  } else {
    return (
      <div className="posts-container">
        <div className="page-header-container">
          <PageHeader
            style={{
              border: "1px solid rgb(235, 237, 240)",
              marginBottom: "2rem",
            }}
            title="Posts"
          />
          <Input
            type="text"
            style={{ border: "1px solid rgb(235, 237, 240)" }}
            placeholder="Search..."
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="articles-containe">
          {_.map(search(posts), (article, idx) => {
            return (
              <PostSnippet
                key={idx}
                id={article.firebase_key}
                title={_.capitalize(article.title)}
                content={article.content.substring(0, 1000).concat(".....")}
                authorInfo={article.authorInfo}
                user={props.user}
              />
            );
          })}
        </div>
      </div>
    );
  }
};

export default Posts;

/**-----------------------------------------------------------------------------------------------------------------------------------------
 * 1.
  //2nd method. make change in function input params.
        // for (let key in res.data) {
        //   postsData.push({
        //     ...res.data[key],
        //     id: key,
        //   });
        // }

  //3rd method see burger.js file in "burger builder project"

  2.
  //component mount then call this effect.
  // useEffect(() => {
  //   //before making http request set status to true.
  //   setPageLoading(true);
  //   axios
  //     .get("https://cool-blogger-default-rtdb.firebaseio.com/posts.json")
  //     .then(({ data }) => {
  //       setPageLoading(false);
  //       console.log(
  //         "[Posts.js > componentDidMount ] We receive a javascript object: ",
  //         data
  //       );
  //       const postsData = [];

  //       //1st method.
  //       Object.keys(data).forEach((key) => {
  //         // console.log("[Posts.js] ", key, ":---->", data[key]);
  //         postsData.push({ ...data[key], firebase_key: key });
  //       });
  //       //1.
  //       //set it in state... or concate it
  //       // setPosts((posts) => [...posts, ...postsData]);
  //       setPosts(postsData);

  //       console.log(
  //         "[Posts.js > componentDidMount] We convert that object to array: ",
  //         postsData
  //       );
  //     })
  //     .catch((error) => {
  //       setPageLoading(false);
  //       console.log(error);
  //     });
  // }, []);


  3.
  // useEffect(() => {
  //   // console.log("posts changes");
  //   setPageLoading(true);
  //   axios
  //     .get("https://cool-blogger-default-rtdb.firebaseio.com/posts.json")
  //     .then(({ data }) => {
  //       setPageLoading(false);
  //       console.log(
  //         "[Posts.js > componentDidUpdate] We receive a javascript object: ",
  //         data
  //       );

  //       const postsData = [];

  //       //1st method.
  //       Object.keys(data).forEach((key) => {
  //         // console.log("[Posts.js] ", key, ":---->", data[key]);
  //         postsData.push({ ...data[key], firebase_key: key });
  //       });
  //       //1.
  //       //set it in state... or concate it
  //       if (posts.length != postsData.length) {
  //         setPosts(postsData);
  //       }

  //       // console.log(
  //       //   "[Posts.js > componentDidUpdate] We convert that object to array: ",
  //       //   postsData
  //       // );
  //     })
  //     .catch((error) => {
  //       setPageLoading(false);
  //       console.log(error);
  //     });
  // }, [posts]);

 */
