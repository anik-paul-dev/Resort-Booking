# Resort Booking Frontend

This is the frontend for the Resort Booking website.

## Features

- User authentication and authorization
- Room browsing and booking
- Feature and facility exploration
- Review system
- Contact form
- Admin dashboard

## Technologies Used

- React
- Vite
- React Router
- Bootstrap
- Axios
- React Hook Form
- Yup for validation

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Start the development server: `npm run dev`

## Environment Variables

- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)
- `VITE_CLOUDINARY_URL` - Cloudinary URL

## Project Structure

- `src/components` - React components
  - `common` - Common components (Header, Footer, etc.)
  - `public` - Public pages (Home, Rooms, etc.)
  - `user` - User dashboard components
  - `admin` - Admin dashboard components
  - `ui` - Reusable UI components
- `src/context` - React context for global state
- `src/hooks` - Custom React hooks
- `src/services` - API services
- `src/utils` - Utility functions
- `src/assets` - Static assets (images, styles, etc.)