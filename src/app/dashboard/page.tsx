"use client";
import Model from "@/components/Model";
import { PostToCloudinary } from "@/helpers/cloudinary";
import { deleteFriend, getUsers, postUser } from "@/helpers/dbConnect";
import { Friend } from "@/types/friend";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Edit from "@/components/Edit";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<Friend[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    name: "",
    email: "",
    number: "",
  });
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    photo: "" as unknown as File,
    number: "",
  });
  const router = useRouter();

  const handleAddUser = async () => {
    console.log(newUser);

    const url = await PostToCloudinary(newUser.photo);

    const user: Friend = {
      name: newUser.name,
      email: newUser.email,
      photo: url,
      number: newUser.number,
    };

    const response = await postUser(user);

    setUsers([...users, response.friend]);

    setNewUser({
      name: "",
      email: "",
      photo: "" as unknown as File,
      number: "",
    });

    setIsModalOpen(false);
  };

  const onClose = async () => {
    setIsEditModalOpen(!isEditModalOpen);
  };

  const handleEdit = async (user: Friend | null) => {
    setIsEditModalOpen(!isEditModalOpen);
    setSelectedUser(user ?? { name: "", email: "", number: "" });
    onClose();
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    const response = await deleteFriend(id);
    console.log(response);
    setUsers(users.filter((user) => user.id !== id));
  }

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      setUsers(response.friends);
    };

    fetchUsers();
  }, [router , isEditModalOpen , isModalOpen]);

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
              <tr key={index} className="">
                <td className="border px-4 py-2 text-center">
                  <Link href={`/dashboard/friend/${user.id}`}>{user.name}</Link>
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/dashboard/friend/${user.id}`}>
                    {user.email}
                  </Link>
                </td>
                <td className="border px-4 py-2">
                  <div className="flex justify-center">
                    <Link href={`/dashboard/friend/${user.id}`}>
                      <Image
                        src={user.photo ?? "/user.png"}
                        alt="User"
                        width={100}
                        height={100}
                      />
                    </Link>
                  </div>
                </td>
                <td className="border px-4 py-2 text-center">
                  <Link href={`/dashboard/friend/${user.id}`}>
                    {user.number}
                  </Link>
                </td>
                <td className="px-4 py-2">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button onClick={()=> handleDelete(user.id)} className="text-red-500 ml-2 hover:text-red-700 transition">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isEditModalOpen && <Edit onClose={onClose} user={selectedUser}/>}

        {isModalOpen && (
          <Model
            newUser={newUser}
            setNewUser={setNewUser}
            handleAddUser={handleAddUser}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
