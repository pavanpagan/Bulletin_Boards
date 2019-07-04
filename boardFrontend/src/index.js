import React from "react";
import ReactDOM from "react-dom";
import IndexComponent from "./IndexComponent";
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter><IndexComponent /></BrowserRouter>, document.getElementById("root")
    );
