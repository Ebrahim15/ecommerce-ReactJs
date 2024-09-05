import { Component } from "react";
import './header.css';
import CartOverlay from "../cart-overlay/CartOverlay";

class Header extends Component {
    state = {
        nav: [
            {
                name: "women",
                link: "/",
                categoryLink: "active-category-link",
            },
            {
                name: "men",
                link: "/",
                categoryLink: "category-link",
            },
            {
                name: "kids",
                link: "/",
                categoryLink: "category-link",
            },
        ],
        itemCount: 3,
        showCart: false
    }

    handleCategoryClick = (e) => {
        e.preventDefault()
        this.setState({
            nav: [
                ...this.state.nav.map((category) => category.name === e.target.id ? {
                        ...category,
                        categoryLink: 'active-category-link'
                    } :
                    {
                        ...category,
                        categoryLink: 'category-link'
                    })
            ],
        })
    }

    handleCartClick = (e) => {
        e.preventDefault()
        this.setState({
            showCart: !this.state.showCart
        })
        document.querySelector('.app-container-bg-color').classList.toggle('bg-greyed-out')
    }

    render() {
        return (
            <header>
                <nav>
                    {
                        this.state.nav.map((nav) => (
                            <a key={nav.name} id={nav.name} className={nav.categoryLink.includes('active') ? "nav-a-focus" : ""} onClick={this.handleCategoryClick} dataname={nav.name} data-testid={nav.categoryLink} href={nav.link}>{nav.name.toUpperCase()}</a>
                        ))
                    }
                    {/* <a href="/">s</a> */}
                </nav>
                <div style={{position: 'relative'}}>
                    <a className="a-icon" href="/"><img src={require('../../assets/images/a-logo.png')} alt="a"/></a>

                    <div className="cart-container">
                        <a className="cart-icon" onClick={this.handleCartClick} href="/"><img src={require('../../assets/images/Empty Cart.png')} alt="empty-cart"/>{this.state.itemCount > 0 ? <span className="item-count">{this.state.itemCount}</span> : null}</a>
                        <CartOverlay show={this.state.showCart}/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header