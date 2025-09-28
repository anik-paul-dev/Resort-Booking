import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Carousel from '../ui/Carousel';
import RoomCard from '../ui/RoomCard';
import FacilityCard from '../ui/FacilityCard';
import ReviewSlider from '../ui/ReviewSlider';
import Map from '../ui/Map';
import VideoPlayer from '../ui/VideoPlayer';
import { fetchRooms, fetchFacilities, fetchReviews } from '../../services/api';
import { useApp } from '../../context/AppContext';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { settings } = useApp();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const roomsData = await fetchRooms({ limit: 3 });
        setRooms(roomsData.data.rooms);

        const facilitiesData = await fetchFacilities({ limit: 3 });
        setFacilities(facilitiesData.data.facilities);

        const reviewsData = await fetchReviews({ limit: 5, status: 'approved' });
        setReviews(reviewsData.data.reviews);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const resortLocation = { lat: 20.5937, lng: 78.9629 }; // Default to India's coordinates

  return (
    <div className="home">
      <Carousel />
      
      <section className="featured-rooms py-5">
        <Container>
          <h2 className="section-title">Featured Rooms</h2>
          {loading ? (
            <div className="text-center py-5">Loading rooms...</div>
          ) : (
            <>
              <Row>
                {rooms.map(room => (
                  <Col key={room._id} md={4} className="mb-4">
                    <RoomCard room={room} />
                  </Col>
                ))}
              </Row>
              <div className="text-center">
                <Button as={Link} to="/rooms" variant="primary">View All Rooms</Button>
              </div>
            </>
          )}
        </Container>
      </section>

      <section className="features py-5 bg-light">
        <Container>
          <h2 className="section-title">Resort Features</h2>
          <Row>
            {/* Features would be mapped here */}
            <Col md={3} className="mb-4 text-center">
              <div className="feature-icon">
                <i className="bi bi-wifi fs-1 text-primary"></i>
              </div>
              <h4>Free WiFi</h4>
              <p>High-speed internet access throughout the resort</p>
            </Col>
            <Col md={3} className="mb-4 text-center">
              <div className="feature-icon">
                <i className="bi bi-water fs-1 text-primary"></i>
              </div>
              <h4>Swimming Pool</h4>
              <p>Olympic-sized pool with poolside service</p>
            </Col>
            <Col md={3} className="mb-4 text-center">
              <div className="feature-icon">
                <i className="bi bi-cup-hot fs-1 text-primary"></i>
              </div>
              <h4>Restaurant</h4>
              <p>Fine dining with local and international cuisine</p>
            </Col>
            <Col md={3} className="mb-4 text-center">
              <div className="feature-icon">
                <i className="bi bi-bicycle fs-1 text-primary"></i>
              </div>
              <h4>Activities</h4>
              <p>Wide range of recreational activities</p>
            </Col>
          </Row>
          <div className="text-center">
            <Button as={Link} to="/features" variant="primary">View All Features</Button>
          </div>
        </Container>
      </section>

      <section className="facilities py-5">
        <Container>
          <h2 className="section-title">Resort Facilities</h2>
          {loading ? (
            <div className="text-center py-5">Loading facilities...</div>
          ) : (
            <>
              <Row>
                {facilities.map(facility => (
                  <Col key={facility._id} md={4} className="mb-4">
                    <FacilityCard facility={facility} />
                  </Col>
                ))}
              </Row>
              <div className="text-center">
                <Button as={Link} to="/facilities" variant="primary">View All Facilities</Button>
              </div>
            </>
          )}
        </Container>
      </section>

      <section className="reviews py-5 bg-light">
        <Container>
          <h2 className="section-title">Customer Reviews</h2>
          {loading ? (
            <div className="text-center py-5">Loading reviews...</div>
          ) : (
            <ReviewSlider reviews={reviews} />
          )}
        </Container>
      </section>

      <section className="reach-us py-5">
        <Container>
          <h2 className="section-title">How to Reach Us</h2>
          <Row>
            <Col md={6} className="mb-4">
              <h4 className="mb-3">Location Map</h4>
              <Map location={resortLocation} />
            </Col>
            <Col md={6} className="mb-4">
              <h4 className="mb-3">Resort Video Tour</h4>
              <VideoPlayer 
                videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="Resort Video Tour" 
              />
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Home;