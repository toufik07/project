import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useCart } from './CartProvider';

export default function Cart() {
  let { id , name , signinas} = useParams(); // User id from the URL
  const [cartData, setCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState('');
  const {remove,setUserId} = useCart()
  const navigate = useNavigate()


// Fetch the cart data from the backend API
  const loadCartData = () => {
    axios.get(`http://localhost:5000/cart/${id}`) 
      .then((res) => {
        const cartItems = res.data.cart_items;
      if (cartItems.length === 0) {
        setCartData([]); // Empty cart data
        setTotalPrice(0)
      } else {
        setCartData(cartItems); 
        calculateTotal(cartItems);
      }
      })
      .catch((err) => {
        console.error('Error fetching cart data', err);
      });
  };

  // Calculate total price based on cart items
  const calculateTotal = (data) => {
    const total = data.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  // Remove item from the cart
  const removeFromCart = (productId) => {
    axios
      .delete(`http://localhost:5000/cart/${id}/${productId}`) // Assuming the endpoint for deleting a cart item
      .then(() => {
        loadCartData(); // Reload the cart data after removal
        alert("Item removed")
        remove()
      })
      .catch((err) => {
        console.error('Error removing item from cart', err);
      });
  };

  // Validate input fields
  const validateInputs = () => {
    if (!shippingAddress || !city || !pincode) {
      alert('Please fill all required fields.');
      return false;
    }
    if (pincode.length < 6) {
      alert('Pincode must be at least 6 digits long.');
      return false;
    }
    setError('');
    return true;
  };

  const placeOrder = () => {
    if (!validateInputs()) {
      return; // Stop the order process if validation fails
    }

    const orderItems = cartData.map(item => ({
      product_id: item.product_id,  // Product ID for the item
      quantity: item.quantity,      // Quantity of the item
      price: item.price             // Unit price of the item
    }));
  
    // Assuming your backend API can handle order insertion with items
    axios
      .post('http://localhost:5000/orders', {
        user_id: id,                 // Assuming user ID is available from URL params or context
        shipping_address: shippingAddress,
        city: city,
        pincode: pincode,
        items: orderItems,           // Send the order items
        total_price: totalPrice      // Total price for the entire order (could be validated in the backend)
      })
      .then((res) => {
        console.log('Order placed successfully:', res.data);
        alert("Order placed");
        
        // Clear the cart and reset shipping details after successful order
        clearCart();
        setShippingAddress("");
        setCity("");
        setPincode("");
      })
      .catch((err) => {
        console.error('Error placing order:', err);
      });
  };

  const clearCart = () => {
    axios
      .delete(`http://localhost:5000/cart/${id}`) // Assuming this endpoint clears the user's cart
      .then(() => {
        setCartData([]); // Clear the local state
        setTotalPrice(0); // Reset total price
      })
      .catch((err) => {
        console.error('Error clearing cart:', err);
      });
  };

  useEffect(() => {
    loadCartData();
    setUserId(id)
  },[]);

  return (
    <div className="flex justify-center items-center bg-gray-50">
      <div className="text-center m-5-auto container overflow-x-auto mt-32">
        <h2 className="text-2xl font-bold mb-4">Cart</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Error message display */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">No</th>
                <th className="border border-gray-200 px-4 py-2">Image</th>
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Price</th>
                <th className="border border-gray-200 px-4 py-2">Quantity</th>
                <th className="border border-gray-200 px-4 py-2">Total</th>
                <th className="border border-gray-200 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length > 0 ? (
                cartData.map((item, i) => (
                  <tr key={i}>
                    <td className="border border-gray-200 px-4 py-2">{i + 1}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <img style={{ height: '50px' }} src={item.imgpath} alt={item.title} />
                    </td>
                    <td className="border border-gray-200 px-4 py-2">{item.title}</td>
                    <td className="border border-gray-200 px-4 py-2">₹{item.price.toFixed(2)}</td>
                    <td className="border border-gray-200 px-4 py-2">{item.quantity}</td>
                    <td className="border border-gray-200 px-4 py-2">₹{(item.price * item.quantity).toFixed(2)}</td>
                    <td className="border border-gray-200 px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => removeFromCart(item.product_id)} // Updated product_id here
                      >
                        X Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="border border-gray-200 px-4 py-2 text-center">
                    No items in the cart
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="bg-gray-100">
                <td className="border border-gray-200 px-4 py-2 text-left" colSpan="5">
                  Total
                </td>
                <td className="border border-gray-200 px-4 py-2">₹{totalPrice.toFixed(2)}</td>
                <td className="border border-gray-200 px-4 py-2"></td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2" colSpan="7">
                  <table className="min-w-full">
                    <tbody>
                      <tr>
                        <td className="py-2">Shipping Address</td>
                        <td>
                          <textarea
                            id="address"
                            className="w-full border border-gray-200 rounded-md p-2"
                            value={shippingAddress}
                            onChange={(e) => setShippingAddress(e.target.value)} // Control input value
                          ></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">City</td>
                        <td>
                          <input
                            type="text"
                            id="city"
                            className="w-full border border-gray-200 rounded-md p-2"
                            value={city}
                            onChange={(e) => setCity(e.target.value)} // Control input value
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2">Pincode</td>
                        <td>
                          <input
                            type="text"
                            id="pincode"
                            className="w-full border border-gray-200 rounded-md p-2"
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)} // Control input value
                          />
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td className="text-left">
                          <button 
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            onClick={placeOrder}
                            disabled={error.length > 0} // Disable if there's an error
                          > 
                            Place Order
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
