import React from 'react';
import Home from './pages/home/index'
import './app.css'

class App extends React.Component {
    static defaultProps = {
        prefix: 'Test'
    }

    render() {
        return (
                <Home />
        );
    }
}

export default App;
