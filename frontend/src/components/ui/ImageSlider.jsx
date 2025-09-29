import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const ImageSlider = ({ images, height = 300 }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const NextArrow = ({ onClick }) => (
    <div 
      className="slick-arrow slick-next" 
      onClick={onClick}
      style={{ 
        position: 'absolute', 
        top: '50%', 
        right: '10px', 
        zIndex: 1, 
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FaArrowRight />
    </div>
  )

  const PrevArrow = ({ onClick }) => (
    <div 
      className="slick-arrow slick-prev" 
      onClick={onClick}
      style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '10px', 
        zIndex: 1, 
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <FaArrowLeft />
    </div>
  )

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: currentSlide === i ? '#8B4513' : '#ccc',
        }}
      />
    )
  }

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img 
              src={image} 
              alt={`Slide ${index}`} 
              style={{ 
                width: '100%', 
                height: `${height}px`, 
                objectFit: 'cover' 
              }} 
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ImageSlider