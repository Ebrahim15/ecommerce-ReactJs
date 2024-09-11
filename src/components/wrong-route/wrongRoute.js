import React, { Component } from "react";
import './wrongRoute.css'

class WrongRoute extends Component {
    render() {
        const {error} = this.props;

        return (
            <div>{error.toUpperCase()}</div>
        )
    }
}

export default WrongRoute