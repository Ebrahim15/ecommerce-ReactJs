import { Component } from "react"
import './productDetails.css'
import { useParams } from "react-router";
import {request,  gql  } from "graphql-request";
import { url } from "../../GraphQL";
import parse from 'html-react-parser';
import ImageCarousel from "../image-carousel/imageCarousel";

const withRouter = WrappedComponent => props => {
    const params = useParams();
  
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };

 class ProductDetails extends Component {
    state = {
        product:{},
        loading: true,
        selectedAttributes:[]
    }
    
    componentDidMount() {
        // console.log(this.props.params.id)

        const query = gql`
            query getProduct($productId: ID!) {
                product(productId: $productId){
                    id,
                    name,
                    inStock,
                    description,
                    category{
                        name
                    },
                    gallery {
                        imageUrl
                    },
                    price {
                        amount,
                        currency{
                        label,
                        symbol
                        },
                        __typename
                    },
                    attributes{
                        id,
                        name,
                        items{
                        id,
                        displayValue,
                        value
                        }
                    }
                } 
            }
        `

        const variables = {
            productId: this.props.params.id
        }

        request({
            url,
            document: query,
            variables
            }).then((data) => this.setState({
            ...this.state,
            product: data.product,
            loading: false
            }))
    }
    // componentDidMount() {
    //     const query = gql`
    //         query product($productId: ID!) {
    //             product(productId: $productId) {
    //                 id
    //                 name
    //                 inStock
    //                 description
    //                 category {
    //                     name
    //                 }
    //                 gallery {
    //                     imageUrl
    //                 }
    //                 price {
    //                     amount
    //                     currency {
    //                         label
    //                         symbol
    //                     }
    //                     __typename
    //                 }
    //                 attributes {
    //                     id
    //                     name
    //                     items {
    //                         id
    //                         displayValue
    //                         value
    //                     }
    //                 }
    //             }
    //         }
    //     `;
    
    //     const variables = {
    //         productId: this.props.params.id
    //     };
    
    //     console.log("Variables:", variables); // Debug: Check if productId is correct
    
    //     request({
    //         url,
    //         document: query,
    //         variables: variables
    //     }).then((data) => {
    //         console.log("Data:", data); // Debug: Check the response data
    //         this.setState({
    //             ...this.state,
    //             product: data.product,
    //             loading: false
    //         });
    //     });
    // }

    handleAttributeClick = (e) => {
        console.log(e.target.name)
        this.setState({
            selectedAttributes: this.state.selectedAttributes.filter((attribute) => attribute.attributeType !== e.target.name).concat({
                attributeType: e.target.name,
                attributeValue: e.target.value
            }),
        })
    }

    handleAddToCart = (e) => {
        e.preventDefault()
        console.log(this.props)
        this.props.handleUpdateCart({
            ...this.state.product,
            selectedAttributes: this.state.selectedAttributes,
            count: 1
        });
    }

    render() {
        const {product, loading, selectedAttributes} = this.state

        return (
            loading ? <div>...Loading</div>
            :
            <div className="product-details-page-container">
                <ImageCarousel images={product.gallery} width = {'500px'} height={'500px'}/>

                <div className="product-details-container">
                    <h3>{product.name}</h3>
                    {product.attributes.map((attribute) => attribute.id.toLowerCase() !== "color" ? <div key={attribute.name} className="attribute-set-container" data-testid={`product-attribute-${attribute.name.replace(/ /g, "-").toLowerCase()}`}>
                        <p className="">{attribute.name.toUpperCase()}:</p>
                        <div className="product-attribute-container">
                            {attribute.items.map((attributeItem, index) => <button key={attributeItem.id} name={attribute.name} value={attributeItem.value} onClick={this.handleAttributeClick} className={`product-attribute-button ${selectedAttributes.filter((item) => item.attributeValue === attributeItem.value).length > 0  ? "selected-attribute-button" : null}`}>{attributeItem.value}</button>)}
                        </div>
                    </div>
                    :
                    <div className="attribute-set-container" key={attribute.name}>
                        <p className="">{attribute.name.toUpperCase()}:</p>
                        <div className="product-color-container">
                            {attribute.items.map((color, index) => <div key={color.id} className={`product-color-button-container ${selectedAttributes.filter((item) => item.attributeValue === color.value).length > 0  ? 'selected-color-button' : null}`}><button key={color.value} onClick={this.handleAttributeClick} name={attribute.name} value={color.value} className={`product-color-button`} style={{backgroundColor: color.value}}></button></div>)}
                        </div>
                    </div>
                    )}
                    <div className="price-container">
                        <p>{product.price[0]?.__typename?.toUpperCase()}:</p>
                        <p>{product?.price[0]?.currency.symbol + product?.price[0]?.amount}</p>
                    </div>
                    <button className={`add-to-cart-button ${selectedAttributes.length !== product.attributes.length ? 'disabled-button': null}`} data-testid='add-to-cart' disabled={!product.inStock || selectedAttributes.length !== product.attributes.length} onClick={this.handleAddToCart}>add to cart</button>
                    <div className="product-description-container" data-testid='product-description'>{parse(product.description)}</div>
                </div>
            </div>
        )
    }
}

export default withRouter(ProductDetails)