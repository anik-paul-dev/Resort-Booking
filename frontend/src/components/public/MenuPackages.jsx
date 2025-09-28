import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';

const MenuPackages = () => {
  const [menuItems, setMenuItems] = useState({
    breakfast: [],
    lunch: [],
    dinner: [],
    packages: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This would be replaced with an actual API call
    // For now, we'll use mock data
    const mockMenuItems = {
      breakfast: [
        { id: 1, name: 'Continental Breakfast', description: 'Fresh bread, pastries, fruits, and more', price: 12, image: 'https://via.placeholder.com/300x200' },
        { id: 2, name: 'Asian Breakfast', description: 'Traditional Asian breakfast with rice, noodles, and sides', price: 15, image: 'https://via.placeholder.com/300x200' },
        { id: 3, name: 'American Breakfast', description: 'Eggs, bacon, sausage, and pancakes', price: 14, image: 'https://via.placeholder.com/300x200' },
      ],
      lunch: [
        { id: 4, name: 'Asian Noodle Bowl', description: 'Stir-fried noodles with vegetables and choice of protein', price: 18, image: 'https://via.placeholder.com/300x200' },
        { id: 5, name: 'Grilled Fish', description: 'Fresh catch of the day with herbs and spices', price: 22, image: 'https://via.placeholder.com/300x200' },
        { id: 6, name: 'Vegetarian Curry', description: 'Mixed vegetables in aromatic curry sauce', price: 16, image: 'https://via.placeholder.com/300x200' },
      ],
      dinner: [
        { id: 7, name: 'Seafood Platter', description: 'Assorted seafood with dipping sauces', price: 35, image: 'https://via.placeholder.com/300x200' },
        { id: 8, name: 'Grilled Steak', description: 'Premium beef steak with seasonal vegetables', price: 28, image: 'https://via.placeholder.com/300x200' },
        { id: 9, name: 'Vegetarian Feast', description: 'Selection of vegetarian dishes', price: 24, image: 'https://via.placeholder.com/300x200' },
      ],
      packages: [
        { id: 10, name: 'Romantic Dinner Package', description: 'Special dinner setup for two with wine and dessert', price: 120, image: 'https://via.placeholder.com/300x200' },
        { id: 11, name: 'Family Feast Package', description: 'Family-style meal with appetizers, mains, and desserts', price: 85, image: 'https://via.placeholder.com/300x200' },
        { id: 12, name: 'BBQ Package', description: 'BBQ buffet with grilled meats and seafood', price: 65, image: 'https://via.placeholder.com/300x200' },
      ],
    };

    setMenuItems(mockMenuItems);
    setLoading(false);
  }, []);

  const renderMenuItems = (items) => (
    <Row>
      {items.map(item => (
        <Col key={item.id} md={4} className="mb-4">
          <Card className="h-100">
            <Card.Img variant="top" src={item.image} alt={item.name} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">${item.price}</span>
                <button className="btn btn-sm btn-primary">Add to Order</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  if (loading) {
    return <div className="text-center py-5">Loading menu and packages...</div>;
  }

  return (
    <div className="menu-packages py-5">
      <Container>
        <h1 className="section-title">Menu & Packages</h1>
        
        <Tabs defaultActiveKey="breakfast" id="menu-tabs" className="mb-4">
          <Tab eventKey="breakfast" title="Breakfast">
            <h3 className="mb-4">Breakfast Menu</h3>
            {renderMenuItems(menuItems.breakfast)}
          </Tab>
          <Tab eventKey="lunch" title="Lunch">
            <h3 className="mb-4">Lunch Menu</h3>
            {renderMenuItems(menuItems.lunch)}
          </Tab>
          <Tab eventKey="dinner" title="Dinner">
            <h3 className="mb-4">Dinner Menu</h3>
            {renderMenuItems(menuItems.dinner)}
          </Tab>
          <Tab eventKey="packages" title="Packages">
            <h3 className="mb-4">Special Packages</h3>
            {renderMenuItems(menuItems.packages)}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default MenuPackages;