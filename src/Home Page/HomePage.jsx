import React from 'react';
import { Card, Row, Col, Button, Container, Table, ProgressBar } from 'react-bootstrap';
import { 
  Users, UserPlus, Briefcase, CheckCircle, MapPin, 
  TrendingUp, Bell, Search, Settings, BarChart2 
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const getVariantClasses = (variant) => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'success':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'info':
        return 'bg-cyan-500 hover:bg-cyan-600 text-white';
      case 'secondary':
        return 'bg-gray-600 hover:bg-gray-700 text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [3000, 3500, 4000, 3800, 4200, 4500],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.4,
        fill: false
      },
      {
        label: 'Users',
        data: [500, 600, 800, 1200, 1500, 1800],
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.4,
        fill: false
      }
    ]
  };

  const jobsData = {
    labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
    datasets: [{
      data: [300, 150, 100, 50],
      backgroundColor: [
        'rgba(75, 192, 192, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 99, 132, 0.8)',
      ],
    }]
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', progress: 75 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', progress: 45 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', progress: 90 },
  ];

  return (
    <div className="bg-light min-vh-100">
      {/* Top Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3 mb-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">BISH Admin</span>
          <div className="d-flex align-items-center">
            <div className="position-relative me-3">
              <Bell size={20} className="text-white" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                3
              </span>
            </div>
            <Settings size={20} className="text-white" />
          </div>
        </div>
      </nav>

      <Container fluid className="px-4">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="input-group">
            <span className="input-group-text bg-white">
              <Search size={20} />
            </span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search..." 
            />
          </div>
        </div>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          {[
            { title: 'New Users Today ', value: '145', icon: <Users />, color: 'primary' },
            { title: 'Active Users', value: '1,875', icon: <Users />, color: 'success' },
            { title: 'Pending Jobs', value: '156', icon: <Briefcase />, color: 'warning' },
            { title: 'Completed Jobs', value: '85', icon: <BarChart2 />, color: 'info' },
          ].map((stat, idx) => (
            <Col key={idx} xs={12} md={6} lg={3}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="text-muted mb-2">{stat.title}</h6>
                      <h3 className="mb-0 fw-bold">{stat.value}</h3>
                    </div>
                    <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded`}>
                      {stat.icon}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row className="g-4 mb-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h5 className="mb-4">Performance Overview</h5>
                <Line 
                  data={monthlyData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                    }
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body>
                <h5 className="mb-4">Jobs Distribution</h5>
                <Doughnut 
                  data={jobsData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: 'bottom' },
                    }
                  }}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Users Table */}
        <Row className="mb-4">
          <Col>
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="mb-0">Recent Users</h5>
                  <Button variant="outline-primary" size="sm">View All</Button>
                </div>
                <Table hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge bg-${user.status === 'Active' ? 'success' : 'warning'}`}>
                            {user.status}
                          </span>
                        </td>
                        <td style={{ width: '20%' }}>
                          <ProgressBar 
                            now={user.progress} 
                            variant={user.progress > 70 ? 'success' : 'warning'}
                            className="mt-1"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row className="g-4 mb-[20px]">
        {[
  { title: 'Manage Users', icon: <Users size={20} />, variant: 'primary', to: '/users' },
  { title: 'View Jobs', icon: <Briefcase size={20} />, variant: 'success', to: '/jobs' },
  { title: 'Active Areas', icon: <MapPin size={20} />, variant: 'info', to: '/areas' },
  { title: 'Settings', icon: <Settings size={20} />, variant: 'secondary', to: '/settings' },
].map((action, idx) => (
  <Col key={idx} xs={12} sm={6} md={3}>
    <Link
      to={action.to}
      className={`
        w-full 
        py-3 
        px-4 
        flex 
        items-center 
        justify-center 
        gap-2 
        rounded-lg 
        font-medium 
        transition-all 
        duration-200 
        hover:shadow-md 
        active:scale-95
        ${getVariantClasses(action.variant)}
      `}
    >
      {action.icon}
      <span>{action.title}</span>
    </Link>
  </Col>
))}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;