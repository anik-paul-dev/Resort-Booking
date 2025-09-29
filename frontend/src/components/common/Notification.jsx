import React from 'react'
import { Toast } from 'react-bootstrap'

const Notification = ({ show, onClose, message, type = 'success' }) => {
  const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info'
  
  return (
    <Toast 
      show={show} 
      onClose={onClose} 
      delay={3000} 
      autohide 
      className={`position-fixed ${bgClass} text-white`}
      style={{ top: '20px', right: '20px', zIndex: 1050 }}
    >
      <Toast.Header closeButton={false}>
        <strong className="me-auto text-white">
          {type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info'}
        </strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  )
}

export default Notification