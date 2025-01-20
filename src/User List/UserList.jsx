import PropTypes from 'prop-types';
import { useGetUsersQuery } from '../store/api';
import { Loader2 } from 'lucide-react';

const TableHeader = () => (
  <thead className="bg-gray-100">
    <tr>
      <th className="border border-gray-300 p-2" scope="col">Date joined</th>
      <th className="border border-gray-300 p-2" scope="col">BISH ID</th>
      <th className="border border-gray-300 p-2" scope="col">First name</th>
      <th className="border border-gray-300 p-2" scope="col">Last name</th>
      <th className="border border-gray-300 p-2" scope="col">Post Code</th>
      <th className="border border-gray-300 p-2" scope="col">Address</th>
      <th className="border border-gray-300 p-2" scope="col">Mobile</th>
      <th className="border border-gray-300 p-2" scope="col">Email</th>
      <th className="border border-gray-300 p-2" scope="col">Quote</th>
      <th className="border border-gray-300 p-2" scope="col">Book a job</th>
      <th className="border border-gray-300 p-2" scope="col">Job Completed</th>
    </tr>
  </thead>
);

const UserRow = ({ user }) => {
  const formattedDate = new Date(user.createdAt).toLocaleDateString('en-GB');
  
  return (
    <tr className="hover:bg-gray-50">
      <td className="border border-gray-300 p-2 text-center">{formattedDate}</td>
      <td className="border border-gray-300 p-2 text-center">{user.bishCode}</td>
      <td className="border border-gray-300 p-2 text-center">{user.first_name}</td>
      <td className="border border-gray-300 p-2 text-center">{user.last_name}</td>
      <td className="border border-gray-300 p-2 text-center">{user.postalCode?.postalCode || '-'}</td>
      <td className="border border-gray-300 p-2 text-center">{user.address}</td>
      <td className="border border-gray-300 p-2 text-center">{user.mobile}</td>
      <td className="border border-gray-300 p-2 text-center">{user.email}</td>
      <td className="border border-gray-300 p-2 text-center">
        <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
          Quote
        </button>
      </td>
      <td className="border border-gray-300 p-2 text-center">
        <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
          Book
        </button>
      </td>
      <td className="border border-gray-300 p-2 text-center">
        <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
          Yes
        </button>
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    bishCode: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,

    postalCode: PropTypes.shape({
      postalCode: PropTypes.string
    }),
    address: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  }).isRequired
};

const LoadingState = () => (
  <tr>
    <td colSpan="11" className="border border-gray-300 p-8 text-center">
      <div className="flex items-center justify-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-gray-600">Loading users...</span>
      </div>
    </td>
  </tr>
);

const ErrorState = ({ error }) => (
  <tr>
    <td colSpan="11" className="border border-gray-300 p-8 text-center text-red-500">
      {error?.data?.message || 'Failed to load users. Please try again later.'}
    </td>
  </tr>
);

ErrorState.propTypes = {
  error: PropTypes.shape({
    data: PropTypes.shape({
      message: PropTypes.string
    })
  })
};

const EmptyState = () => (
  <tr>
    <td colSpan="11" className="border border-gray-300 p-8 text-center text-gray-500">
      No users found.
    </td>
  </tr>
);

const UserList = () => {
  const {
    data: response,
    isLoading,
    error
  } = useGetUsersQuery(undefined, {
    pollingInterval: 0,
    refetchOnMountOrArgChange: true
  });

  const users = response?.data ? (Array.isArray(response.data) ? response.data : [response.data]) : [];

  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
        <TableHeader />
        <tbody>
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} />
          ) : users.length === 0 ? (
            <EmptyState />
          ) : (
            users.map(user => (
              <UserRow key={user._id} user={user} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;