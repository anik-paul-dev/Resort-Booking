import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Carousel = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear'
  }

  return (
    <div className="carousel-container mb-5">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <div 
              className="carousel-slide"
              style={{ 
                backgroundImage: `url(${item.image})`,
                height: '500px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              <div className="carousel-caption">
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                {item.link && (
                  <Button as={Link} to={item.link} variant="primary">
                    {item.buttonText || 'Learn More'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Carousel