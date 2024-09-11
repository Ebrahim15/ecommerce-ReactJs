import { Component } from "react";
import './productCard.css'
import { request, gql } from "graphql-request";
import { url } from "../../GraphQL";

class ProductCard extends Component {
    state = {
        product:{}
    }

    handleAddToCart = (e) => {
        e.preventDefault();
        this.props.handleUpdateCart(this.state.product)
    }

    componentDidMount() {
        const {product} = this.props;
        const getProduct = gql`
        {
            product(productId: "${product.id}"){
                id,
                name,
                gallery,
                price{
                    amount,
                    currency{
                        symbol
                    }
                },
                attributes{
                    id,
                    items{
                        displayValue,
                        value,
                        id
                    }
                }
            }
        }
        `;
        request(url, getProduct).then((data) => {
            this.setState({
                ...this.state,
                product: data.product
            })
        })
    }

    render() {
        const { product } = this.props
        return (
            <a href={`/${product.category}/${product.id}`}>         
                <div className="product-container" data-testid={`product-${product.name.replace(/ /g, "-").toLowerCase()}`}>
                    <div className="product-card">
                        {/* <div className="product-image-container" style={{backgroundImage: `url(${this.product.imgSrc})`}}>
                            {
                                !this.product.stock ? <div className="greyed-out">OUT OF STOCK</div>
                                :
                                <a href="/"><img src={require("../../assets/images/WhiteEmptyCart.png")} alt="cart"/></a>
                            }
                        </div>
                        <div className="product-details">
                            <p>{this.product.title}</p>
                            <p className={`${!this.product.stock ? 'greyed-out-text': null}`}>${this.product.price}</p>
                        </div> */}
                        <div className="product-image-container" style={{backgroundImage: `url(${product.gallery[0]})`}}>
                            {
                                !product.inStock ? <div className="greyed-out">OUT OF STOCK</div>
                                :
                                <button href="/" onClick={this.handleAddToCart}><img src={require("../../assets/images/WhiteEmptyCart.png")} alt="cart"/></button>
                            }
                        </div>
                        <div className="product-details">
                            <p>{product.name}</p>
                            <p className={`${product.inStock ? 'greyed-out-text': null}`}>{product.price.currency.symbol}{product.price.amount}</p>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}

export default ProductCard