import React from 'react';

const UserList = () => {
  return (
    <div className="p-4">
      <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
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
        <tbody>
          <tr className="hover:bg-gray-50">
            <td className="border border-gray-300 p-2 text-center">12/03/25</td>
            <td className="border border-gray-300 p-2 text-center">2233223322</td>
            <td className="border border-gray-300 p-2 text-center">Jhon</td>
            <td className="border border-gray-300 p-2 text-center">Doe</td>
            <td className="border border-gray-300 p-2 text-center">W2 4EB</td>
            <td className="border border-gray-300 p-2 text-center">10 Smith Road London</td>
            <td className="border border-gray-300 p-2 text-center">9876543210</td>
            <td className="border border-gray-300 p-2 text-center">bishtechnologies@yopmail.com</td>
            <td className="border border-gray-300 p-2 text-center">
              <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Quote</button>
            </td>
            <td className="border border-gray-300 p-2 text-center">
              <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Book</button>
            </td>
            <td className="border border-gray-300 p-2 text-center">
              <button className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">Yes</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
