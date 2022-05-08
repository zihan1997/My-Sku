import React from 'react';
import Home from './pages/home/index'
import './app.css'
import {BrowserRouter} from "react-router-dom";
class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("App!!!!")
    }
    render() {
        return (
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
    }
}

export default App;
