import React from 'react'

interface Props {
    newUser: {
        name: string;
        email: string;
        photo: File | string;
        number: string;
    }
    setNewUser: (newUser: any) => void;
    handleAddUser: () => void;
    setIsModalOpen: (isModalOpen: boolean) => void;
}

const Model = ({
    newUser,
    setNewUser,
    handleAddUser,
    setIsModalOpen
}: Props) => {
    return (
        <div>
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
                        type="file"
                        accept="image/*"
                        placeholder="Photo URL"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setNewUser({ ...newUser, photo: file || e.target.value });
                        }}
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
        </div>
    )
}

export default Model