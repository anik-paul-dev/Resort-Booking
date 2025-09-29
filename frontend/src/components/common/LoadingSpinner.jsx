import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ size = 'md', className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <Spinner animation="border" role="status" size={size}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default LoadingSpinner