import React from 'react';
import Slider from 'react-slick';
import { Card } from 'react-bootstrap';
import { generateStars, formatDate } from '../../utils/helpers';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ReviewSlider = ({ reviews }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="review-slider">
      <Slider {...settings}>
        {reviews.map((review) => (
          <div key={review._id}>
            <Card className="review-card mx-2">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  {review.user?.profileImage ? (
                    <img 
                      src={review.user.profileImage} 
                      alt={review.user.name} 
                      className="review-avatar me-3" 
                    />
                  ) : (
                    <div className="review-avatar bg-secondary text-white d-flex align-items-center justify-content-center me-3">
                      {review.user?.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h6 className="mb-0">{review.user?.name}</h6>
                    <small className="text-muted">{formatDate(review.createdAt)}</small>
                  </div>
                </div>
                <div className="mb-2">
                  {generateStars(review.rating)}
                </div>
                <Card.Text>{review.comment}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewSlider;