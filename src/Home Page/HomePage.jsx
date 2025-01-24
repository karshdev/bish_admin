import { Card, Row, Col, Container } from 'react-bootstrap';
import {
  Users, Briefcase, Bell, Search, Settings, BarChart2, MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useGetDashboardDataQuery } from '../store/api';

const StatCardSkeleton = () => (
  <div className="animate-pulse h-full rounded-lg bg-gray-100 p-6">
    <div className="flex justify-between">
      <div className="space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded"></div>
      </div>
      <div className="h-12 w-12 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const ActionButtonSkeleton = () => (
  <div className="animate-pulse h-[52px] rounded-lg bg-gray-200"></div>
);

const Dashboard = () => {
  const { data: dashboardData, isLoading, isError } = useGetDashboardDataQuery();

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

  console.log("dashboard Daa",dashboardData);
  
  const statsData = [
    { 
      title: 'New Users Today', 
      value: isLoading ? '-' : dashboardData?.data?.newUsersToday || 0, 
      icon: <Users />, 
      color: 'primary' 
    },
    { 
      title: 'Active Users', 
      value: isLoading ? '-' : dashboardData?.data?.totalActiveUsers || 0, 
      icon: <Users />, 
      color: 'success' 
    },
    { 
      title: 'Pending Jobs', 
      value: '0', 
      icon: <Briefcase />, 
      color: 'warning' 
    },
    { 
      title: 'Completed Jobs', 
      value: '0', 
      icon: <BarChart2 />, 
      color: 'info' 
    }
  ];

  const quickActions = [
    { title: 'Manage Users', icon: <Users size={20} />, variant: 'primary', to: '/users' },
    { title: 'View Jobs', icon: <Briefcase size={20} />, variant: 'success', to: '/active-jobs' },
    { title: 'Active Areas', icon: <MapPin size={20} />, variant: 'info', to: '/postcodes' },
    { title: 'Settings', icon: <Settings size={20} />, variant: 'secondary', to: '/settings' }
  ];

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-blue-600 px-6 py-4 mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-white font-bold text-xl">BISH Admin</span>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Bell size={20} className="text-white" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </div>
            <Settings size={20} className="text-white" />
          </div>
        </div>
      </nav>

      <Container fluid className="px-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex items-center bg-white rounded-lg border p-2">
            <Search size={20} className="text-gray-400 mr-2" />
            <input
              type="text"
              className="flex-1 border-none focus:outline-none"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Stats Cards */}
        <Row className="mb-6">
          {statsData.map((stat, idx) => (
            <Col key={idx} xs={12} md={6} lg={3} className="mb-4">
              {isLoading ? (
                <StatCardSkeleton />
              ) : (
                <Card className="border-0 shadow-sm h-full">
                  <Card.Body>
                    <div className="flex justify-between items-center">
                      <div>
                        <h6 className="text-gray-600 mb-2">{stat.title}</h6>
                        <h3 className="text-2xl font-bold">{stat.value}</h3>
                      </div>
                      <div className={`bg-${stat.color} bg-opacity-10 p-3 rounded`}>
                        {stat.icon}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          ))}
        </Row>

        {/* Quick Actions */}
        <Row className="mb-6">
          {quickActions.map((action, idx) => (
            <Col key={idx} xs={12} sm={6} md={3} className="mb-4">
              {isLoading ? (
                <ActionButtonSkeleton />
              ) : (
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
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;