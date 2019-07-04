import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./Components/assets/css/index.css";
import Dashboard from "./Components/Containers/HomeContents.jsx";
import Details from "./Components/Body/Deatails.jsx";
import 'react-toastify/dist/ReactToastify.css';

export default () => (
    <div>
        <BrowserRouter >
            <Switch>
                <Route path="/" exact  component={Dashboard} />}/>
                <Route path="/details" exact  component={Details}   />}/>
            </Switch>
        </BrowserRouter>
    </div>
);
