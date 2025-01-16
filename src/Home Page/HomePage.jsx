import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserList from '../User List/UserList';
import ActivePostcode from '../Active PostCodes/ActivePostcode';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4 rounded-3">
        <Card.Body>
          <h2 className="mb-4 text-center">Welcome BISH Admin</h2>
          <Row className="g-4">
            {/* New Users Today */}
            <Col xs={12} md={6} lg={3}>
              <Card className="text-center shadow-sm h-100">
                <Card.Body className='bg-[#EEF973]'>
                  <Card.Text className="fs-5">12</Card.Text>
                  <Card.Subtitle className="text-muted">New users today</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>

            {/* Total Users */}
            <Col xs={12} md={6} lg={3}>
              <Card className="text-center shadow-sm h-100">
                <Card.Body className='bg-[#31D2A7]'>
                  <Card.Text className="fs-5">5000</Card.Text>
                  <Card.Subtitle className="text-muted">Total users</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>

            {/* Jobs Pending */}
            <Col xs={12} md={6} lg={3}>
              <Card className="text-center shadow-sm h-100">
                <Card.Body className='bg-[#438BFF]'>
                  <Card.Text className="fs-5">20</Card.Text>
                  <Card.Subtitle className="text-muted">Jobs pending</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>

            {/* Jobs Completed */}
            <Col xs={12} md={6} lg={3}>
              <Card className="text-center shadow-sm h-100">
                <Card.Body className='bg-[#FF5684]'>
                  <Card.Text className="fs-5">154</Card.Text>
                  <Card.Subtitle className="text-muted">Jobs completed</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="g-4 mt-4">
            {/* See Users Button */}
            <Col xs={12} md={4}>
              <Link to='/users' element={<UserList />}>
                <Button className="w-100 shadow-sm" variant="primary">See users</Button>
              </Link>
            </Col>

            {/* See Jobs Button */}
            <Col xs={12} md={4}>
              <Link to='/jobs' element={<ActivePostcode />}>
                <Button className="w-100 shadow-sm" variant="primary">See Jobs</Button>
              </Link>
            </Col>

            {/* Active Postcodes Button */}
            <Col xs={12} md={4}>
              <Button className="w-100 shadow-sm" variant="success">Active postcodes</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default HomePage;