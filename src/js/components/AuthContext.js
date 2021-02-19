import React from "react";

const authContext = React.createContext({
  authenticatedUser: null,
  authenticatedUserChange: () => {},
});

export default authContext;
