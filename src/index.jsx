import React from "react";
import {createRoot} from "react-dom/client";
import App from './app.jsx';
// import { Provider } from 'react-redux';
// import {createStore} from "redux";
// import reducer from "./pages/reducer"

// const store = createStore(reducer)

createRoot(document.getElementById('root'))
    .render(
        <App prefix={"store"}/>
    )