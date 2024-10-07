import { Component } from "react";
import './productCard.css'


class ProductCard extends Component {
    // state = {
    //     product:{}
    // }
    selectedAttributes = this.props.product.attributes.map((attributeSet) => { return {
        attributeType: attributeSet.name,
        attributeValue: attributeSet.items[0].value
    }})
    handleAddToCart = (e) => {
        e.preventDefault();
        this.props.handleUpdateCart({...this.props.product, count: 1, selectedAttributes:this.selectedAttributes})
    }

    render() {
        const { product } = this.props

        return (
            <a href={`/${product.category.name}/${product.id}`} data-testid={`product-${product.name.replace(/ /g, "-").toLowerCase()}`}>         
                <div className="product-container" data-testid={`product-${product.name.replace(/ /g, "-").toLowerCase()}`}>
                    <div className="product-card">
                        <div className="product-image-container" style={{backgroundImage: `url(${product.gallery[0]?.imageUrl})`}}>
                            {
                                !product.inStock ? <div className="greyed-out">OUT OF STOCK</div>
                                :
                                <button href="/" onClick={this.handleAddToCart}><img src={require("../../assets/images/WhiteEmptyCart.png")} alt="cart"/></button>
                            }
                        </div>
                        <div className="product-details">
                            <p>{product.name}</p>
                            <p className={`${product.inStock ? 'greyed-out-text': null}`}>{product.price[0].currency.symbol}{product.price[0].amount}</p>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}

export default ProductCard