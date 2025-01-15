import React from 'react';
import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  Users,
  UserPlus,
  Briefcase,
  CheckCircle,
  MapPin
} from 'lucide-react';

const HomePage = () => {
  const stats = [
    {
      title: 'New Users Today',
      value: '12',
      icon: <UserPlus size={24} />,
      bgColor: '#FFF9C4',
      iconColor: '#FBC02D'
    },
    {
      title: 'Total Users',
      value: '5,000',
      icon: <Users size={24} />,
      bgColor: '#E0F2F1',
      iconColor: '#00897B'
    },
    {
      title: 'Jobs Pending',
      value: '20',
      icon: <Briefcase size={24} />,
      bgColor: '#E3F2FD',
      iconColor: '#1E88E5'
    },
    {
      title: 'Jobs Completed',
      value: '154',
      icon: <CheckCircle size={24} />,
      bgColor: '#FCE4EC',
      iconColor: '#D81B60'
    }
  ];

  return (
    <Container fluid className="py-4">
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0 fw-bold">Welcome BISH Admin</h2>
            <small className="text-muted">
              {new Date().toLocaleDateString()}
            </small>
          </div>

          {/* Stats Grid */}
          <Row className="g-4 mb-4">
            {stats.map((stat, index) => (
              <Col key={index} xs={12} md={6} lg={3}>
                <Card 
                  className="border-0 h-100" 
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Card.Body className="p-4">
                    <div className="d-flex justify-content-between align-items-start">
                      <div 
                        className="rounded-circle p-2" 
                        style={{ 
                          backgroundColor: stat.bgColor,
                          color: stat.iconColor 
                        }}
                      >
                        {stat.icon}
                      </div>
                    </div>
                    <div className="mt-3">
                      <h3 className="fw-bold mb-1">{stat.value}</h3>
                      <p className="text-muted mb-0 small">{stat.title}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Action Buttons */}
          <Row className="g-4">
            <Col xs={12} md={4}>
              <Link to="/users" className="text-decoration-none">
                <Button 
                  variant="primary" 
                  className="w-100 d-flex align-items-center justify-content-between py-3"
                >
                  <div className="d-flex align-items-center">
                    <Users size={20} className="me-2" />
                    <span>See Users</span>
                  </div>
                  <i className="bi bi-arrow-right"></i>
                </Button>
              </Link>
            </Col>

            <Col xs={12} md={4}>
              <Button 
                variant="secondary" 
                className="w-100 d-flex align-items-center justify-content-between py-3"
              >
                <div className="d-flex align-items-center">
                  <Briefcase size={20} className="me-2" />
                  <span>See Jobs</span>
                </div>
                <i className="bi bi-arrow-right"></i>
              </Button>
            </Col>

            <Col xs={12} md={4}>
              <Button 
                variant="success" 
                className="w-100 d-flex align-items-center justify-content-between py-3"
              >
                <div className="d-flex align-items-center">
                  <MapPin size={20} className="me-2" />
                  <span>Active Postcodes</span>
                </div>
                <i className="bi bi-arrow-right"></i>
              </Button>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;