import React from "react";
import ReactDOM from "react-dom";
// Styles
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
// Components
import App from "./App";

//-------------------------------------------------//
// for hot module
if (module.hot) {
  module.hot.accept();
}
//------------------------------------------------//

//-------------------------------------------------//
// App Script
//-------------------------------------------------//

ReactDOM.render(<App />, document.getElementById("root"));
