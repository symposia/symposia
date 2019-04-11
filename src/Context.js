import React from 'react';

export const ReactContext = React.createContext();

export const withContext = WrappedComponent => {
    return class WithContext extends React.Component {
        render() {
            return (
                <ReactContext.Consumer>
                    { value => <WrappedComponent {...value}{...this.props}/>}
                </ReactContext.Consumer>
            )
        }
    }
}