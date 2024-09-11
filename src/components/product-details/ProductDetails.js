import { Component } from "react"
import './productDetails.css'
import { useParams } from "react-router";
import {request,  gql, ClientError } from "graphql-request";
import { url } from "../../GraphQL";

const withRouter = WrappedComponent => props => {
    const params = useParams();
  
    return (
      <WrappedComponent
        {...props}
        params={params}
      />
    );
  };

//  const getProduct = gql`
//     {
//         product(productId: ${}) {
//             name,
//             gallery
//         }
//     }
//  `;

 class ProductDetails extends Component {
    state = {
        product:{}
    }

    componentDidMount() {
        const getProduct = gql `
        {
            product(productId: "${this.props.params.id}") {
                name,
                gallery
            }
        }
    `;
        request(url, getProduct).then((data) => this.setState({
            ...this.state,
            product: data.product
          }))
        
    }

    render() {
        const {product} = this.state

        return (
            <div>details</div>
        )
    }
}

export default withRouter(ProductDetails)