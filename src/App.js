/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Router, Link } from "@reach/router";
import { Menu } from "antd";
import { ReadOutlined, HighlightOutlined } from "@ant-design/icons";
import { getUserInfoFromLocal } from "./js/utils/utils";
// import { Grid } from "semantic-ui-react";

//Components
import Post from "./js/components/Post";
import Posts from "./js/components/Posts";
import CreatePost from "./js/components/CreatePost";
import EditPost from "./js/components/EditPost";
import Signup from "./js/components/Signup";
import Signin from "./js/components/Signin";
import DeletePost from "./js/components/DeletePost";
import AuthContext from "./js/components/AuthContext";

const App = () => {
  //meaning current user which is login in app. at startin it is false
  const [authUser, setAuthUser] = useState(true);

  //this is handler what to do when user signin
  //this funtion will be use by SignIn component.
  const authUserHandler = (user) => {
    setAuthUser(user);
  };

  //this is handler what to do when user signout
  const signOutHandler = () => {
    // console.log("[App.js>signOutHandler]");
    //on signout remove user from localstorage and also set state to false;
    localStorage.removeItem("idToken");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("localId");
    localStorage.removeItem("email");
    setAuthUser(false);
  };

  useEffect(() => {
    console.log("[App.js] > componentDidMount");
    const c_user = getUserInfoFromLocal(); //c-user meaning current user
    //now check for unique property of c_user and then if it's there then set state also timeout
    if (c_user.localId) {
      setAuthUser({ ...c_user });
    } else {
      setAuthUser(false);
    }
  }, []);

  let routes = (
    <Router>
      <Posts path="posts" default user={authUser} />
      <Post path="post/:id" />
      <DeletePost path="delete_post/:id" />
      <Signup path="sign_up" />
      <Signin path="sign_in" />
    </Router>
  );

  return (
    <AuthContext.Provider
      value={{
        authenticatedUser: authUser,
        authenticatedUserChange: authUserHandler,
      }}
    >
      <div className="app-container">
        <div className="app-main-navigation">
          <Menu mode="horizontal">
            <Menu.Item key="posts" icon={<ReadOutlined />}>
              <Link to="posts"> Posts </Link>
            </Menu.Item>
            {authUser && (
              <Menu.Item key="create_post" icon={<HighlightOutlined />}>
                <Link to="create_post"> Create post </Link>
              </Menu.Item>
            )}

            {!authUser ? (
              <a href="sign_in" style={{ float: "right", padding: "5px" }}>
                Sign In
              </a>
            ) : (
              <a
                href="/posts"
                style={{ float: "right", padding: "5px" }}
                onClick={signOutHandler}
              >
                Sign Out
              </a>
            )}
          </Menu>
        </div>

        <Router>
          <Posts path="posts" default user={authUser} />
          <Post path="post/:id" />
          <DeletePost path="delete_post/:id" />
          <Signup path="sign_up" />
          <Signin path="sign_in" />
          {authUser.localId && [
            <CreatePost key="cp" path="create_post" user={authUser} />,
            <EditPost key="ep" path="edit_post/:id" user={authUser} />,
          ]}
        </Router>
      </div>
    </AuthContext.Provider>
  );
};

export default App;

/**
 * 
// import Login from "./js/components/Login";
       page for login and signup 
  
    <Grid style={{ height: "100vh" }} centered verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Login />
        </Grid.Column>
      </Grid> 


  dump data
  {!authUser ? (
              <Link to="sign_in" style={{ float: "right", padding: "5px" }}>
                Sign In
              </Link>
            ) : (
              <a
                href="#"
                style={{ float: "right", padding: "5px" }}
                onClick={signOutHandler}
              >
                Sign Out
              </a>
            )}
*/
