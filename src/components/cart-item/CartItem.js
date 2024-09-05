import { Component } from "react";
import './cartItem.css'

class CartItem extends Component {
    // item = this.props.item
    handleItemQuantity = this.props.handleItemQuantity

    state = {
        activeSize: '',
        activeColor: '',
        item: this.props.item
    }
    
    handleSizeClick = (size, e) => {
        this.state.activeSize === size ?
        this.setState({
            activeSize: ""
        })
        :
        this.setState({
            activeSize: size
        })
    }

    handleColorClick = (color, e) => {
        this.state.activeColor === color ?
        this.setState({
            activeColor: ""
        })
        :
        this.setState({
            activeColor: color
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ item: nextProps.item });  
    }

    render() {
        return (
            <div className="item-container">
                <div className="item-details-container">
                    <h3 className="item-title">{this.state.item.title}</h3>
                    <p className="item-price">${this.state.item.price}</p>
                    <p>Size:</p>
                    <div className="item-size-container">
                        {this.state.item.sizes.map((size) => <button key={size}  className={`size-button ${this.state.item.selectedSize === size ? "selected-size-button" : null}`}>{size}</button>)}
                    </div>
                    <p>Color:</p>
                    <div className="item-color-container">
                        {this.state.item.colors.map((color) => <div key={color.hex} className={`color-button-container ${this.state.item.selectedColor === color.name ? 'selected-color-button' : null}`}><button key={color.hex} className={`color-button`} style={{backgroundColor: color.hex}}></button></div>)}
                    </div>
                </div>
                <div className="item-count-image-container">
                    <div className="item-count-button-container">
                        <button onClick={() => this.handleItemQuantity('+', this.state.item.id)}>+</button>
                        <p>{this.state.item.count}</p>
                        <button onClick={() => this.handleItemQuantity('-', this.state.item.id)}>-</button>
                    </div>
                    <div className="item-image-container"><img src={this.state.item.imgSrc} alt={this.state.item.title}></img></div>
                </div>
            </div>
        )
    }
}

export default CartItem