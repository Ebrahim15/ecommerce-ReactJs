import { Component } from "react";
import './cartOverlay.css'
import CartItem from "../cart-item/CartItem";
import { gql, request } from "graphql-request";
import { url } from "../../GraphQL";

const mutation = gql`
  mutation AddOrder($orderType: OrderInput!) {
    addOrder(order: $orderType) {
      cart {
        price
      }
    }
  }
`

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
        const orderItems = this.state.cart.map(item => ({
            productId: item.id,
            selectedAttributes: item.selectedAttributes,
            price: item.price[0].amount,
            typename: "order"
            // Add other necessary fields from your item object
        }));
    
        const orderInput = {
            cart: orderItems
        };
    
        const variables = {
            order: orderInput
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