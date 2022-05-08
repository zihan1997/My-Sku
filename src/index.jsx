import React from "react";
import {createRoot} from "react-dom/client";
import App from './app.jsx';
import store from './store/store';
import {Provider} from "react-redux";

createRoot(document.getElementById('root'))
    .render(
        <Provider store={store}>
            <App />
        </Provider>
    )