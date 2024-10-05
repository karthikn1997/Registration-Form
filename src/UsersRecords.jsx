import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersRecords = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch user records from the API
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/user/all'); // Adjust the URL as needed
            setUsers(response.data);
        } catch (error) {
            toast.error('Failed to fetch user records');
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Users Records</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Sl.no</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Name</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Email</th>
                            <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-600">Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-100 transition duration-300">
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">{index + 1}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">{user.name}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">{user.email}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-gray-800">{user.mobileNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersRecords;
