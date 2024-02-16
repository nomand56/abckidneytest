import { useState } from 'react';

const dummyUsers = [
  { id: 1, username: 'user1', name: 'User One', email: 'user1@example.com', role: 'Student', type: 'signup' },
  { id: 2, username: 'user2', name: 'User Two', email: 'user2@example.com', role: 'Teacher', type: 'logout' },
  { id: 3, username: 'user3', name: 'User Three', email: 'user3@example.com', role: 'Student', type: 'login' },
  { id: 4, username: 'user4', name: 'User Four', email: 'user4@example.com', role: 'Admin', type: 'login' },
  { id: 5, username: 'user5', name: 'User Five', email: 'user5@example.com', role: 'Student', type: 'signup' },
  { id: 6, username: 'user6', name: 'User Six', email: 'user6@example.com', role: 'Teacher', type: 'signup' },
  { id: 7, username: 'user7', name: 'User Seven', email: 'user7@example.com', role: 'Student', type: 'login' },
  { id: 8, username: 'user8', name: 'User Eight', email: 'user8@example.com', role: 'Admin', type: 'logout' },
  { id: 9, username: 'user9', name: 'User Nine', email: 'user9@example.com', role: 'Student', type: 'signup' },
  { id: 10, username: 'user10', name: 'User Ten', email: 'user10@example.com', role: 'Teacher', type: 'login' },
];

function UserData() {
  const [users, setUsers] = useState(dummyUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const closeUserDetails = () => {
    setSelectedUser(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredResults = users.filter((user) =>
      user.username.toLowerCase().includes(query.toLowerCase()) ||
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const filterByType = (type) => {
    const filteredUsers = dummyUsers.filter((user) => user.type === type);
    setUsers(filteredUsers);
  };

  return (
    <div className="mt-16 text-center">
      <h1 className="text-3xl font-bold mb-6 text-black">User Admin Panel</h1>

      <div className="flex justify-center space-x-2 mb-6">
        <button
          className="bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => filterByType('signup')}
        >
          Show Signups
        </button>

        <button
          className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-700"
          onClick={() => filterByType('login')}
        >
          Show Logins
        </button>

        <button
          className="bg-red-500 text-black px-4 py-2 rounded hover:bg-red-700"
          onClick={() => filterByType('logout')}
        >
          Show Logouts
        </button>
      </div>

      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search by username, name, or email"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="border rounded p-2 mr-1"
        />
        <button className='bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-700'>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div className="user-list mx-auto max-w-screen-lg text-black">
          <h2 className="text-xl font-semibold mb-2">Search Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-black">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-black">Username</th>
                  <th className="px-4 py-2 text-black">Name</th>
                  <th className="px-4 py-2 text-black">Email</th>
                  <th className="px-4 py-2 text-black">Role</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((user) => (
                  <tr
                    key={user.id}
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => showUserDetails(user)}
                  >
                    <td className="border px-4 py-2 text-black">{user.username}</td>
                    <td className="border px-4 py-2 text-black">{user.name}</td>
                    <td className="border px-4 py-2 text-black">{user.email}</td>
                    <td className="border px-4 py-2 text-black">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {users.length > 0 && searchResults.length === 0 && (
        <div className="user-list mx-auto max-w-screen-lg">
          <h2 className="text-xl font-semibold mb-2 text-black">User List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-black">Username</th>
                  <th className="px-4 py-2 text-black">Name</th>
                  <th className="px-4 py-2 text-black">Email</th>
                  <th className="px-4 py-2 text-black">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="cursor-pointer hover-bg-gray-100"
                    onClick={() => showUserDetails(user)}
                  >
                    <td className="border px-4 py-2 text-black">{user.username}</td>
                    <td className="border px-4 py-2 text-black">{user.name}</td>
                    <td className="border px-4 py-2 text-black">{user.email}</td>
                    <td className="border px-4 py-2 text-black">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
     ) }

      {selectedUser && (
        <div className="user-details-popup fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg text-left w-96">
            <h2 className="text-2xl font-semibold mb-2 text-black">User Details</h2>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
            <button
              className="bg-blue-500 text-black px-4 py-2 rounded hover-bg-blue-700 mt-4"
              onClick={closeUserDetails}
            >
              Close
            </button>
          </div>
        </div>
     ) }
    </div>
  );
}

export default UserData;
