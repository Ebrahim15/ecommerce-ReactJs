import { Component } from "react";
import './header.css';
import CartOverlay from "../cart-overlay/CartOverlay";
import request, { gql } from "graphql-request";
import { url } from "../../GraphQL";

// const url = "http://localhost/website/api/GraphQL.php";
const getCategories = gql`
    {
        categories{
            name
        }
    }
`;

class Header extends Component {
    state = {
        nav: [],
        cartCount: 0,
        // showCart: this.props.showCart,
        cart: []
    }

    componentDidMount() {
        request(url, getCategories).then((data) => {
            this.setState({
                ...this.state,
                nav: data.categories.map((category, index) => {
                    return {
                        name: category.name,
                        link: category.name === "all" ? "" : category.name
                    }
                })
            })
        })
    }

    handleCartClick = (e) => {
        e.preventDefault()
        this.props.handleShowCart()
        // document.querySelector('.app-container-bg-color').classList.toggle('bg-greyed-out')
    }

    static getDerivedStateFromProps(nextProps, state) {
        if(nextProps.cart !== state.cart) {
            return {
                ...state,
                cart: nextProps.cart,
                cartCount: nextProps.cartCount,
                // showCart: nextProps.showCart
            }
        }
        return null;
    }

    render() {
        const { cart, cartCount } = this.state

        return (
            <header>
                <nav>
                    {
                        this.state.nav.map((nav) => (
                            <a key={nav.name} id={nav.name} className={this.props.activeCategory === nav.name ? "nav-a-focus" : ""} dataname={nav.name} data-testid={`${this.props.activeCategory === nav.name ? 'active-category-link' : 'category-link'}`} href={`/${nav.link}`}>{nav.name.toUpperCase()}</a>
                        ))
                    }
                    {/* <a href="/">s</a> */}
                </nav>
                <div style={{position: 'relative'}}>
                    <a className="a-icon" href="/"><img src={require('../../assets/images/a-logo.png')} alt="a"/></a>

                    <div className="cart-container">
                        {/* <a className="cart-icon" onClick={this.handleCartClick} href="/"><img src={require('../../assets/images/Empty Cart.png')} alt="empty-cart"/>{this.state.itemCount > 0 ? <span className="item-count">{this.state.itemCount}</span> : null}</a> */}
                        <button className="cart-icon" onClick={this.handleCartClick} data-testid='cart-btn'><img src={require('../../assets/images/Empty Cart.png')} alt="empty-cart"/>{cartCount > 0 ? <span className="item-count">{cartCount}</span> : null}</button>
                        {/* <CartOverlay show={this.state.showCart} cart={cart}/> */}
                        <CartOverlay show={this.props.showCart} cart={cart} handleCartItemQuantity={this.props.handleCartItemQuantity}/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header