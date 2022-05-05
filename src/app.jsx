import React from 'react';
import Home from './pages/home/index'
import './app.css'
class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("App!!!!")
    }
    render() {
        return (
                <Home />
        );
    }
}

export default App;
