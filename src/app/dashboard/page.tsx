"use client";
import React, { useState } from "react";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]); // Replace 'any' with a proper user type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    photo: "",
    number: "",
  });

  const handleAddUser = () => {
    setUsers([...users, newUser]);
    setNewUser({ name: "", email: "", photo: "", number: "" });
    setIsModalOpen(false);
  };

  return (
    <div className="flex-1 p-6 h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Total Users: {users.length}
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1 mb-4 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          >
            Add User
          </button>
        </div>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Photo</th>
              <th className="border px-4 py-2">Number</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="border px-4 py-2 text-center">{user.name}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <img
                    src={user.photo}
                    alt="User"
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="border px-4 py-2">{user.number}</td>
                <td className="border px-4 py-2">
                  <button className="text-blue-500 hover:text-blue-700 transition">
                    Edit
                  </button>
                  <button
                    className="text-red-500 ml-2 hover:text-red-700 transition"
                    onClick={() =>
                      setUsers(users.filter((_, i) => i !== index))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for Adding User */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                Add User
              </h2>
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="border p-2 mb-2 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Photo URL"
                value={newUser.photo}
                onChange={(e) =>
                  setNewUser({ ...newUser, photo: e.target.value })
                }
                className="border p-2 mb-2 w-full"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={newUser.number}
                onChange={(e) =>
                  setNewUser({ ...newUser, number: e.target.value })
                }
                className="border p-2 mb-4 w-full"
              />
              <button
                onClick={handleAddUser}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition mr-2"
              >
                Add
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg shadow hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
