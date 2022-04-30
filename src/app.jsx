import React from 'react';
import classNames from 'classnames';
import HomePage from './pages/home/index'

class App extends React.Component {
    static defaultProps = {
        prefix: 'Test'
    }

    render() {
        const {
            prefix
        } = this.props

        const classes = classNames(
            `${prefix}-app`
        )

        return (
            <div>
                test
                <HomePage />
            </div>
        );
    }
}

export default App;
