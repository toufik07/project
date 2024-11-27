import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FarmerHome() {

  const [serviceProviders, setServiceProviders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch service providers from the API
    axios.get('http://localhost:5000/sproviderlist')
      .then((response) => {
        console.log(response.data);
        
        setServiceProviders(response.data);
      })
      .catch((err) => {
        setError('Error fetching service providers');
      });
  }, []);

  // Function to handle book appointment action
  const handleBookAppointment = (providerId) => {
    alert(`Booking appointment with provider ID: ${providerId}`);
    // Implement your booking logic here
  };

  return (
    <div className="container mx-auto p-4 mt-32">
      <h2 className="text-2xl font-bold mb-4">Service Providers</h2>

      {error && <div className="text-red-600">{error}</div>}

      {!error && serviceProviders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border">NO</th>
              <th className="py-2 px-4 border">Service Provider Name</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Location</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {serviceProviders.map((provider, index) => (
              <tr key={provider[0] /* provider id */}>
                <td className="py-2 px-4 border">{index + 1}</td> {/* Row number */}
                <td className="py-2 px-4 border">{provider[1]}</td> {/* sname */}
                <td className="py-2 px-4 border">{provider[3]}</td> {/* email */}
                <td className="py-2 px-4 border">{provider[4]}</td> {/* location */}
                <td className="py-2 px-4 border">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleBookAppointment(provider[0])} // provider id
                  >
                    Book Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No service providers found</div>
      )}
    </div>
  );
}
