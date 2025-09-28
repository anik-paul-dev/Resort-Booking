import React from 'react';
import Slider from 'react-slick';
import { Button } from 'react-bootstrap';
import { useApp } from '../../context/AppContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = () => {
  const { carousel } = useApp();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
  };

  return (
    <div className="home-carousel">
      <Slider {...settings}>
        {carousel.map((item) => (
          <div key={item._id} className="carousel-item" style={{ backgroundImage: `url(${item.image})` }}>
            <div className="carousel-caption d-none d-md-block">
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.buttonText && item.buttonLink && (
                <Button as="a" href={item.buttonLink} variant="primary" className="mt-3">
                  {item.buttonText}
                </Button>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;