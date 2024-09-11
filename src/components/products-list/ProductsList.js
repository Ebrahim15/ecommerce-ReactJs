import { Component } from "react";
import './productsList.css'
import ProductCard from "../product-card/ProductCard";
import { gql, request } from "graphql-request";
import { url } from "../../GraphQL";


// const url = "http://localhost/website/api/GraphQL.php";
const getProducts = gql`
  {
    products {
      id,
      name,
      inStock,
      gallery,
      category,
      price {
        amount,
        currency {
          symbol
          label
        }
      }
    }
  }
`;

class ProductsList extends Component {
    state = {
        products: [],
        activeCategory: this.props.activeCategory
      }

      // static getDerivedStateFromProps(nextProps, state) {
      //   if (nextProps.activeCategory !== state.activeCategory) {
      //     return {
      //       ...state,
      //       activeCategory: nextProps.activeCategory,
      //     }
      //   }
      //   return null;
      // }
      
      componentDidMount() {
        request(url, getProducts).then((data) => this.setState({
          ...this.state,
          products: data.products
        }))

        this.props.handleCategory(this.props.activeCategory)
      }

    render() {
      const {activeCategory, products} = this.state;
      const { handleUpdateCart } = this.props
      const title = activeCategory[0].toUpperCase() + activeCategory.slice(1)
      
      return (
            <div className="women-container">
                <p className="page-title">{title}</p>
                <div className="women-products-container">
                    {activeCategory === "all" ? products?.map((product) => <ProductCard data-testid={`product-${product.name.replace(/ /g, "-").toLowerCase()}`} key={product.id} product={product} handleUpdateCart={handleUpdateCart}/>) : 
                    products?.filter((product) => product.category === activeCategory).map((product) => <ProductCard key={product.id} product={product} handleUpdateCart={handleUpdateCart}/>)
                    }
                </div>
            </div>
        )
    }
}

export default ProductsList