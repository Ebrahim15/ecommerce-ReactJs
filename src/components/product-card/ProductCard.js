import { Component } from "react";
import './productCard.css'

class ProductCard extends Component {
    product = this.props.product

    render() {
        return (
            <div className="product-container">
                <div className="product-card">
                    <div className="product-image-container" style={{backgroundImage: `url(${this.product.imgSrc})`}}>
                        {
                            !this.product.stock ? <div className="greyed-out">OUT OF STOCK</div>
                            :
                            <a href="/"><img src={require("../../assets/images/WhiteEmptyCart.png")} alt="cart"/></a>
                        }
                    </div>
                    <div className="product-details">
                        <p>{this.product.title}</p>
                        <p className={`${!this.product.stock ? 'greyed-out-text': null}`}>${this.product.price}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductCard