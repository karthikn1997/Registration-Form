import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: '',
  });
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for register button
  const [showPopup, setShowPopup] = useState(false); // State to control the popup visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Registering...');
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', formData);
      const { qrCodeUrl } = response.data; // Extract the QR code URL from the response

      setQrCodeUrl(qrCodeUrl); // Set the QR code URL to display it
      setShowPopup(true); // Show the QR code popup

      toast.update(loadingToast, { render: 'Registration successful!', type: 'success', isLoading: false, autoClose: 3000 });
      setFormData({
        name: '',
        mobileNumber: '',
        email: '',
      });
    } catch (error) {
      toast.update(loadingToast, { render: error.response?.data?.message || 'Error during registration', type: 'error', isLoading: false, autoClose: 3000 });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qr_code.jpg'; // Set the name for the downloaded file
    link.click();

    // Refresh the page after downloading
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer /> {/* Toast container to display toasts */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <span className="loader">Loading...</span> // Loader component or text
            ) : (
              'Register'
            )}
          </button>
        </form>

        {/* QR Code Popup */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-center font-bold text-lg mb-4">Your QR Code:</h3>
              <img src={qrCodeUrl} alt="QR Code" className="mx-auto" style={{ width: '400px', height: '400px' }} />
              <button
                onClick={downloadQRCode}
                className="mt-4 w-full bg-green-600 text-white py-2 rounded-md font-semibold hover:bg-green-700 transition duration-300"
              >
                Download QR Code
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="mt-2 w-full bg-red-600 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
