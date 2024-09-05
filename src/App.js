import './App.css';
import { Component } from 'react';
import WomenPage from './components/women/WomenPage.js';


class App extends Component {
  state = {
    products: [],
  }

  componentDidMount() {
    fetch("http://localhost/website/api.php")
    .then((response) => response.json())
    .then(products => {
      console.log(products)
      this.setState({
        products: products,
      })
    })
    .catch("error: " + console.error)
  }
  render () {
   return (
    <div className='app-container'>
      {console.log(this.state.products)}
      <div className='app-container-bg-color'></div>
      <WomenPage/>
    </div>
   )
}
}

export default App;
