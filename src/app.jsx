import React from 'react';
import Home from './pages/home/index'
import classNames from "classnames";

class App extends React.Component {
    static defaultProps = {
        prefix: 'Test'
    }

    render() {

        return (
            <body>
                <Home />
            </body>
        );
    }
}

export default App;
