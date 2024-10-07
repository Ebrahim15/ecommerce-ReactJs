import { Component } from "react";
import './cartItem.css'

class CartItem extends Component {
    // item = this.props.item
    handleCartItemQuantity = this.props.handleCartItemQuantity

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

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ item: nextProps.item });  
    // }

    static getDerivedStateFromProps(nextProps, state) {
        if(nextProps.item !== state.item) {
            return {
                ...state,
                item: nextProps.item
            }
        }
        return null;
    }

    render() {
        // const{ item } = this.props
        const{ item } = this.state

        return (
            <div className="item-container">
                <div className="item-details-container">
                    <h3 className="item-title">{item.name}</h3>
                    <p className="item-price">${item.price[0].amount}</p>
                    {item.attributes.map((attribute) => attribute.id.toLowerCase() !== "color" ? <div key={attribute.name} className="attribute-container" data-testid={`cart-item-attribute-${attribute.name.replace(/ /g, "-").toLowerCase()}`}>
                        <p>{attribute.name}:</p>
                        <div className="item-attribute-container">
                            {attribute.items.map((attributeItem, index) => <button 
                            key={attributeItem.id} 
                            data-testid={`${item.selectedAttributes.filter((selectedAttribute) => selectedAttribute.attributeValue === attributeItem.value).length > 0 ? `cart-item-attribute-${attribute.name.replace(/ /g, "-").toLowerCase()}-${attribute.name.replace(/ /g, "-").toLowerCase()}-selected` : `cart-item-attribute-${attribute.name.replace(/ /g, "-").toLowerCase()}-${attribute.name.replace(/ /g, "-").toLowerCase()}`}`}  
                            className={`attribute-button ${item.selectedAttributes.filter((selectedAttribute) => selectedAttribute.attributeValue === attributeItem.value).length > 0 ? "selected-attribute-button" : null}`}>
                                {attributeItem.value}</button>)}
                        </div>
                    </div>
                    :
                    <div key={attribute.name} className="attribute-container">
                        <p>{attribute.name}:</p>
                        <div className="item-color-container">
                            {attribute.items.map((color, index) => <div key={color.id} className={`color-button-container ${item.selectedAttributes.filter((selectedAttribute) => selectedAttribute.attributeValue === color.value).length > 0 ? 'selected-color-button' : null}`}><button key={color.value} className={`color-button`} style={{backgroundColor: color.value}}></button></div>)}
                        </div>
                    </div>
                    )}
                    
                </div>
                <div className="item-count-image-container">
                    <div className="item-count-button-container">
                        <button data-testid='cart-item-amount-increase' onClick={() => this.handleCartItemQuantity('increment', item.id)}>+</button>
                        <p data-testid='cart-item-amount'>{item.count}</p>
                        <button data-testid='cart-item-amount-decrease' onClick={() => this.handleCartItemQuantity('decrement', item.id)}>-</button>
                    </div>
                    <div className="item-image-container"><img src={item.gallery[0].imageUrl} alt={item.name}></img></div>
                </div>
            </div>
        )
    }
}

export default CartItem