import React from 'react';
import Home from './pages/home/index'
import Routes from './routers/router'
import './app.css'

class App extends React.Component {
    static defaultProps = {
        prefix: 'Test'
    }

    render() {

        return (
            // <body className="App">
            // <Routes>
                <Home />
            // </Routes>
            // </body>
        );
    }
}

export default App;
