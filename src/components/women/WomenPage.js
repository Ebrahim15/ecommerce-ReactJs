import { Component } from "react";
import './womenPage.css'
import ProductCard from "../product-card/ProductCard";

class WomenPage extends Component {
    state = {
        items: [
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: 'Top',
            imgSrc: '/images/ProductD.png',
            price: (Math.round(50 * 100) / 100).toFixed(2),
            colors: [{
                name: 'white',
                hex: '#D3D2D5'
              },
              {
                name: 'black',
                hex: '#000000'
              },
              {
                name: 'green',
                hex: '#008000'
              },
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            count: 1,
            selectedSize: 'L',
            selectedColor: 'white',
            stock: true
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: 'Top',
            imgSrc: '/images/ProductD.png',
            price: (Math.round(50 * 100) / 100).toFixed(2),
            colors: [{
                name: 'white',
                hex: '#D3D2D5'
              },
              {
                name: 'black',
                hex: '#000000'
              },
              {
                name: 'green',
                hex: '#008000'
              },
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            count: 1,
            selectedSize: 'L',
            selectedColor: 'white',
            stock: true
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: 'Top',
            imgSrc: '/images/ProductD.png',
            price: (Math.round(50 * 100) / 100).toFixed(2),
            colors: [{
                name: 'white',
                hex: '#D3D2D5'
              },
              {
                name: 'black',
                hex: '#000000'
              },
              {
                name: 'green',
                hex: '#008000'
              },
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            count: 1,
            selectedSize: 'L',
            selectedColor: 'white',
            stock: true
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: 'Top',
            imgSrc: '/images/ProductD.png',
            price: (Math.round(50 * 100) / 100).toFixed(2),
            colors: [{
                name: 'white',
                hex: '#D3D2D5'
              },
              {
                name: 'black',
                hex: '#000000'
              },
              {
                name: 'green',
                hex: '#008000'
              },
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            count: 1,
            selectedSize: 'L',
            selectedColor: 'white',
            stock: false
          },
          {
            id: "id" + Math.random().toString(16).slice(2),
            title: 'Top',
            imgSrc: '/images/ProductD.png',
            price: (Math.round(50 * 100) / 100).toFixed(2),
            colors: [{
                name: 'white',
                hex: '#D3D2D5'
              },
              {
                name: 'black',
                hex: '#000000'
              },
              {
                name: 'green',
                hex: '#008000'
              },
            ],
            sizes: ['XS', 'S', 'M', 'L'],
            count: 1,
            selectedSize: 'L',
            selectedColor: 'white',
            stock: true
          },
          
        ]
      }

    render() {
        return (
            <div className="women-container">
                <p className="page-title">Women</p>
                <div className="women-products-container">
                    {this.state.items.map((product) => <ProductCard key={product.id} product={product}/>)}
                </div>
            </div>
        )
    }
}

export default WomenPage