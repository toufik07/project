import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const {id,name} = useParams()

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/allorders/'+id);
        setOrders(response.data.orders); // Set orders based on API structure
      } catch (err) {
        setError(err.message); // Set error message in case of failure
      } finally {
        setLoading(false); // Stop loading once the request is done
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center">Loading orders...</div>; // Display loading message
  }

  if (error) {
    return <div className="text-center text-red-600">No orders</div>; // Display error message
  }

  return (
    <div className="text-center container md:ml-60 px-4 overflow-x-auto max-w-7xl">
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
            {orders.map((order, i) => (
              <tr key={order.order_id}>
                <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{new Date(new Date(order.order_date).toLocaleString('en-US', { timeZone: 'UTC' })).toLocaleDateString()}</td>
                <td className="border border-gray-200 px-4 py-2">{`${order.shipping_address}, ${order.city}, ${order.pincode}`}</td>
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
                      {Array.isArray(JSON.parse(order.products)) && JSON.parse(order.products).length > 0 ? (
                        JSON.parse(order.products).map((product, index) => (
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
                <td className="border border-gray-200 px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
