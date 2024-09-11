import './App.css';
import { Component } from 'react';
import Header from './components/header/Header.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductsList from './components/products-list/ProductsList.js';
import WrongRoute from './components/wrong-route/wrongRoute.js';
import ProductDetails from './components/product-details/ProductDetails.js';

class App extends Component {
  state = {
    activeCategory: "all",
    cart: []
  }

  handleCategory = (categoryName) => {
    this.setState({
      ...this.state,
      activeCategory: categoryName
    })
  }

  handleUpdateCart = (product) => {    
    this.setState({
      ...this.state,
      cart: this.state.cart.concat(product)
    })
    console.log("first")
  }

  render () {
    const { activeCategory, cart } = this.state
   return (
    <Router>
      <div>
        <Header activeCategory={activeCategory} cart={cart}/>
        <div className='app-container'>
          <div className='app-container-bg-color'></div>
          <Routes>
            <Route path='/' element={<ProductsList activeCategory={"all"} handleCategory={this.handleCategory} handleUpdateCart={this.handleUpdateCart}/>}/>
            <Route path='/clothes' element={<ProductsList activeCategory={"clothes"} handleCategory={this.handleCategory} handleUpdateCart={this.handleUpdateCart}/>}/>
            <Route path='/clothes/:id' element={<ProductDetails/>}/>
            <Route path='/tech' element={<ProductsList activeCategory={"tech"} handleCategory={this.handleCategory} handleUpdateCart={this.handleUpdateCart}/>}/>
            <Route path='/tech/:id' element={<ProductDetails/>}/>
            <Route path='*' element={<WrongRoute error={"not found :'("}/>}/>
          </Routes>
          {/* <ProductsList activeCategory={this.state.activeCategory}/> */}
        </div>
      </div>
    </Router>

      // <div className='app-container'>
      //   <div className='app-container-bg-color'></div>
      //   <ProductsList/>
      // </div>
   )
}
}

export default App;
