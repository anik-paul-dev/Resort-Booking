import React from 'react'
import { Card } from 'react-bootstrap'
import { FaStar, FaRegStar } from 'react-icons/fa'

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning" />)
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />)
      }
    }
    return stars
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <Card className="review-card">
      <Card.Body>
        <div className="review-header">
          <img 
            src={review.user.avatar || '/images/default-avatar.png'} 
            alt={review.user.name} 
            className="reviewer-avatar"
          />
          <div>
            <h5 className="reviewer-name">{review.user.name}</h5>
            <p className="review-date">{formatDate(review.createdAt)}</p>
          </div>
          <div className="review-rating">
            {renderStars(review.rating)}
          </div>
        </div>
        <Card.Text>{review.comment}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ReviewCard