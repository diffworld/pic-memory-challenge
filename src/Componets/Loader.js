import React, { Component } from 'react';
import '../assets/css/Loader.scss';
import { Spinner } from 'react-bootstrap';

class Loader extends Component {

    state = { isLoading: false };

    componentDidUpdate(prevProps) {
        if ( prevProps.isLoading !== this.props.isLoading ) {
            this.setState({ isLoading: this.props.isLoading });
        }
    }

    render () {
        let Loader = (this.state.isLoading) ? <div><Spinner animation="border" variant="warning" /></div>: '';
        return(
            <div className="LoaderContainer">{Loader}</div>
        );
    }
}

export default Loader;