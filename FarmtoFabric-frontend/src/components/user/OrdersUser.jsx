import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function OrdersUser() {
  const { id } = useParams(); // Get the user ID from the URL parameters
  const [orders, setOrders] = useState([]); // State to store user orders
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error

  useEffect(() => {
    const fetchOrders = () => {
      axios.get(`http://localhost:5000/orders/${id}`)
        .then(response => {
          setOrders(response.data.orders); // Set fetched orders to state based on API structure
        })
        .catch(err => {
          setError(err.message); // Set error message if fetch fails
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    };

    fetchOrders(); // Call the fetch function
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading orders...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>; // Show error message if there's an error
  }

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="text-center container mx-auto px-4 overflow-x-auto mt-32">
        <h2 className="text-2xl font-bold mb-4">Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2" style={{ width: '80px' }}>No</th>
                <th className="border border-gray-200 px-4 py-2">Date</th>
                <th className="border border-gray-200 px-4 py-2">Address</th>
                <th className="border border-gray-200 px-4 py-2">Products</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((data, i) => (
                <tr key={data.order_id}>
                  <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
                  <td className="border border-gray-200 px-4 py-2">{new Date(new Date(data.order_date).toLocaleString('en-US', { timeZone: 'UTC' })).toLocaleDateString()}</td>
                  <td className="border border-gray-200 px-4 py-2">{`${data.shipping_address}, ${data.city}, ${data.pincode}`}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    <table className="min-w-full border-collapse">
                      <thead> 
                        <tr className="bg-gray-100">
                          <th className="border border-gray-200 px-2 py-1">Product ID</th>
                          <th className="border border-gray-200 px-2 py-1">Qty</th>
                          <th className="border border-gray-200 px-2 py-1">Price</th>
                          <th className="border border-gray-200 px-2 py-1">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(JSON.parse(data.products)) && JSON.parse(data.products).length > 0 ? (
                          JSON.parse(data.products).map((product, index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 px-2 py-1">{product.product_id}</td>
                              <td className="border border-gray-200 px-2 py-1">{product.quantity}</td>
                              <td className="border border-gray-200 px-2 py-1">{product.price}</td>
                              <td className="border border-gray-200 px-2 py-1">{product.total_price}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="border border-gray-200 px-2 py-1" colSpan="4">No products found</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
