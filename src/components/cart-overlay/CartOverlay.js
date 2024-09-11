import { Component } from "react";
import './cartOverlay.css'
import CartItem from "../cart-item/CartItem";

class CartOverlay extends Component {
    state = {
      items: [{
          id: "id" + Math.random().toString(16).slice(2),
          title: 'Top',
          imgSrc: require('../../assets/images/top.png'),
          price: (Math.round(50 * 100) / 100).toFixed(2),
          colors: [{
              name: 'white',
              hex: '#D3D2D5'
            },
            {
              name: 'black',
              hex: '#000000'
            },
            {
              name: 'green',
              hex: '#008000'
            },
          ],
          sizes: ['XS', 'S', 'M', 'L'],
          count: 1,
          selectedSize: 'L',
          selectedColor: 'white'
        },
        {
          // id: "id" + Math.random().toString(16).slice(2),

          title: 'Glasses',
          imgSrc: require('../../assets/images/glasses.png'),
          price: (Math.round(75 * 100) / 100).toFixed(2),
          colors: [{
              name: 'black',
              hex: '#000000'
            },
            {
              name: 'light-blue',
              hex: '#15A4C3'
            },
            {
              name: 'orange',
              hex: '#EA8120'
            },
          ],
          sizes: ['S', 'M'],
          count: 2,
          selectedSize: 'M',
          selectedColor: 'orange'
        },
      ],
      cart: this.props.cart
    }

    static getDerivedStateFromProps(nextProps, state) {
      console.log(nextProps)
      if(nextProps.cart !== state.cart) {
          return {
              ...state,
              cart: nextProps.cart
          }
      }
      return null;
  }


    handleItemQuantity = (sign, id, e) => {
      if(sign === '-') {
        this.state.items.map((item) => item.id === id ? 
        item.count === 1 ? this.setState({
          items: this.state.items.filter((item) => item.id !== id)
        }) : this.setState({
          items: this.state.items.map((item) => item.id === id ? {
            ...item,
            count: item.count - 1, 
          }
          :
          item
        ) 
        })
        : item)
      }
      else {
        this.setState({
          items: this.state.items.map((item) => item.id === id ? {
            ...item,
            count: item.count + 1,
          }
          :
          item
        ) 
        })
      }
    }

    render() {
        // let itemsCount = this.state.items.length > 0 && this.state.items.map((item) => item.count).reduce((a, b) => a + b)

        // let totalprice = this.state.items.length > 0 && (Math.round(this.state.items.map((item) => item.price * item.count).reduce((a, b) => a + b) * 100) / 100).toFixed(2);
        const {cart} = this.state
        let itemsCount = cart?.length > 0 && cart.map((item) => item.count).reduce((a, b) => a + b)
        let totalprice = cart?.length > 0 && (Math.round(cart.map((item) => item.price * item.count).reduce((a, b) => a + b) * 100) / 100).toFixed(2);

        return (
            <div className="cart-overlay-container" style={{display: `${this.props.show ? 'flex' : 'none'}`}}>
                <h3>My Bag, {itemsCount} items</h3>
                {/* {this.state.items.length > 0 && this.state.items.map((item) => <CartItem key={item.title} item={item} handleItemQuantity={this.handleItemQuantity}/>)} */}
                {cart?.length > 0 && cart.items.map((item) => <CartItem key={item.title} item={item} handleItemQuantity={this.handleItemQuantity}/>)}
                <p className="total-container">Total <span>${totalprice > 0 ? totalprice : 0}</span></p>
                <button className="place-order-button">PLACE ORDER</button>
            </div>
        )
    }
}

export default CartOverlay