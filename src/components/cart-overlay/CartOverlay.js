import { Component } from "react";
import './cartOverlay.css'
import CartItem from "../cart-item/CartItem";
import { gql, request } from "graphql-request";
import { url } from "../../GraphQL";



class CartOverlay extends Component {
    state = {
      cart: []
    }

    static getDerivedStateFromProps(nextProps, state) {
      if(nextProps.cart !== state.cart) {
          return {
              ...state,
              cart: nextProps.cart,
          }
      }
      return null;
  }


    // handleItemQuantity = (sign, id, e) => {
    //   console.log("first")
    // }

    handlePlaceOrder = () => {
        const mutation = gql`
        mutation AddOrder($cart: OrderInput!) {
          addOrder(cart: $cart) {
            cart {
              productId
            }
          }
        }
      `
    
        const variables = {
            cart: this.state.cart.map((product) => {
              return {
                productId: product.id,
                // selectedAttributes: product.selectedAttributes,
              }
            })
        };
    
        request(url, mutation, variables).then((data) => console.log(data));
    };

    render() {
        const {cart} = this.state
        
        let itemsCount = cart?.length > 0 && cart?.map((item) => item.count).reduce((a, b) => a + b)
        let totalprice = cart?.length > 0 && (Math.round(cart?.map((item) => item?.price[0]?.amount * item.count).reduce((a, b) => a + b) * 100) / 100).toFixed(2);
        

        return (
            <div className="cart-overlay-container" style={{display: `${this.props.show ? 'flex' : 'none'}`}}>
                <h3>My Bag, {itemsCount} items</h3>
                {cart?.length > 0 && cart?.map((item) => <CartItem key={item.id} item={item} handleCartItemQuantity={this.props.handleCartItemQuantity}/>)}
                <p className="total-container" data-testid='cart-total'>Total <span>${totalprice > 0 ? totalprice : 0}</span></p>
                <button className="place-order-button" onClick={this.handlePlaceOrder}>PLACE ORDER</button>
            </div>
        )
    }
}

export default CartOverlay