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
    cart: [],
    cartCount: 0,
    showCart: false
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
      cart: this.state.cart.filter((item) => item.id === product.id).length > 0 ? this.state.cart.map((item) => item.id === product.id && item.attributes === product.attributes ? {...item, count: item.count + 1} : item) : this.state.cart.concat(product),
      cartCount: this.state.cartCount + 1,
      showCart: true
    })
  }

  handleShowCart = () => {
    this.setState({
      ...this.state,
      showCart: !this.state.showCart
    })
  }

  handleCartItemQuantity = (sign, id, e) => {
    if(sign === 'increment') {
      console.log('increment: ', id)
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) => item.id === id ? {
          ...item,
          count: item.count + 1
        } : item),
        cartCount: this.state.cartCount + 1
      })
    }
    else {
      console.log('decrement: ', id)
      this.setState({
        ...this.state,
        cart: this.state.cart.map((item) => item.id === id ? 
          item.count === 1 ? 
          this.state.cart.filter((item) => item.id !== id)
          : 
          {
            ...item,
            count: item.count - 1
          } 
        : item),
        cartCount: this.state.cartCount - 1
      })
    }
  }

  componentDidUpdate(){
    if(this.state.showCart){
      document.querySelector('.app-container-bg-color').classList.add('bg-greyed-out')
    }
    else {
      document.querySelector('.app-container-bg-color').classList.remove('bg-greyed-out')
    }
  }
  
  render () {
    const { activeCategory, cart, cartCount, showCart } = this.state
   return (
    <Router>
      <div>
        <Header activeCategory={activeCategory} cart={cart} showCart={showCart} handleShowCart={this.handleShowCart} cartCount={cartCount} handleCartItemQuantity={this.handleCartItemQuantity}/>
        <div className='app-container'>
          <div className='app-container-bg-color'></div>
          <Routes>
            <Route path='/' element={<ProductsList activeCategory={"all"} handleCategory={this.handleCategory} handleUpdateCart={this.handleUpdateCart}/>}/>
            <Route path='/clothes' element={<ProductsList activeCategory={"clothes"} handleCategory={this.handleCategory} handleUpdateCart={this.handleUpdateCart}/>}/>
            <Route path='/clothes/:id' element={<ProductDetails/>}/>
            <Route path='/tech' element={<ProductsList activeCategory={"tech"} handleCategory={this.handleCategory} handleUpdateCart={this.handleUpdateCart}/>}/>
            <Route path='/tech/:id' element={<ProductDetails handleUpdateCart={this.handleUpdateCart} handleShowCart={this.handleShowCart}/>}/>
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
