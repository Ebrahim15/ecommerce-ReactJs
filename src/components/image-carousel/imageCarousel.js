import React, { Component } from 'react';
import './imageCarousel.css';

class ImageCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0
        };
    }

    handleClick = (index) => {
        this.setState({ currentIndex: index });
    };

    nextImage = () => {
        this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex + 1) % this.props.images.length
        }));
    };

    prevImage = () => {
        this.setState((prevState) => ({
            currentIndex: (prevState.currentIndex - 1 + this.props.images.length) % this.props.images.length
        }));
    };

    render() {
        const { images, width, height } = this.props;
        const { currentIndex } = this.state;

        return (
            <div className="image-carousel-container" data-testid='product-gallery'>
                <div className="thumbnail-list">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.imageUrl}
                            alt={`Thumbnail ${index + 1}`}
                            className={index === currentIndex ? 'active' : ''}
                            onClick={() => this.handleClick(index)}
                        />
                    ))}
                </div>
                <div className="carousel" style={{ width: width, height: height }}>
                    <img
                        src={images[currentIndex].imageUrl}
                        alt={`${currentIndex + 1}`}
                        className="main-image"
                    />
                    <button className="prev-button" onClick={this.prevImage}>
                        &#8249;
                    </button>
                    <button className="next-button" onClick={this.nextImage}>
                        &#8250;
                    </button>
                </div>
            </div>
        );
    }
}

export default ImageCarousel;