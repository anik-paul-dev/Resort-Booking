# Resort Booking Backend

This is the backend for the Resort Booking website.

## Features

- User authentication and authorization
- Room management
- Booking management
- Feature and facility management
- Carousel management
- Query management
- Review management
- Website settings

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- Cloudinary for image storage
- Nodemailer for email notifications

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Start the server: `npm run dev`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time (default: 30d)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret
- `EMAIL_HOST` - SMTP host
- `EMAIL_PORT` - SMTP port
- `EMAIL_USER` - SMTP username
- `EMAIL_PASS` - SMTP password
- `FRONTEND_URL` - Frontend URL

## API Endpoints

The API is available at `/api` with the following endpoints:

- `/auth` - Authentication
- `/rooms` - Room management
- `/users` - User management
- `/bookings` - Booking management
- `/features` - Feature management
- `/facilities` - Facility management
- `/carousel` - Carousel management
- `/queries` - Query management
- `/reviews` - Review management
- `/admin` - Admin dashboard and settings