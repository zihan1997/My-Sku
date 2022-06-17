import React from 'react';
import Home from './pages/web_frame/index'
import './app.css'
import {BrowserRouter} from "react-router-dom";
import MyRouter from "./routers/router";
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <BrowserRouter>
                <MyRouter/>
            </BrowserRouter>
        );
    }
}

export default App;
