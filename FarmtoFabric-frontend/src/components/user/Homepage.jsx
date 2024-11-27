import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useCart } from './CartProvider';

export default function Homepage() {
    const [productdata, setProductsData] = useState([]);
    let { id, name, signinas } = useParams();  // Assuming this holds user information (e.g., user_id).
    const navigate = useNavigate();
    const { addToCart} = useCart()

    // Function to load the products data
    function loadData() {
        axios.get("http://localhost:5000/prod")
            .then((res) => {
                setProductsData(res.data);
            })
            .catch((error) => {
                alert("Unable to get the data");
            });
    }

    // Function to add a product to the cart
    function addtocart(productId) {
        const userId = id; // Use the user ID from the URL params

        axios.post('http://localhost:5000/cart', {
            product_id: productId,
            user_id: userId,
            quantity: 1, // Default quantity for this example
        })
        .then((res) => {
            alert('Product added to cart');
            addToCart();
            // navigate('/user/'+id+'/'+name+'/'+signinas)
        })
        .catch((error) => {
            alert('Failed to add product to cart');
        });
    }

    // Load product data when the component mounts
    useEffect(() => {
        loadData();
    },[]);

    return (
        <div className='mt-20 m-auto p-6 flex gap-5 justify-center items-center flex-col md:flex-row md:max-w-7xl max-w-full'>
            {
                productdata.map((data, i) => (
                    <div className="bg-white items-center justify-center rounded-lg p-4 mb-4 flex flex-col hover:shadow-lg hover:border md:w-1/3  w-full" key={i}>
                        {/* Product Image */}
                        <img
                            src={data['imgpath']}
                            alt={'product image'}
                            className="w-40 h-40 object-cover rounded-md"
                        />

                        {/* Product Details */}
                        <div className="flex flex-col items-center">
                            <h3 className="text-xl font-bold mb-2">{data['title']}</h3>
                            <div className="flex items-center mb-2 justify-center">
                                <div className="flex text-red-500">{'★'.repeat(5)}</div>
                                <span className="ml-2 text-gray-600"> reviews</span>
                            </div>
                            <p className="text-gray-500 text-sm mb-4">
                                {data['description']}
                            </p>
                        </div>

                        {/* Pricing and Actions */}
                        <div className="flex items-center justify-center flex-row flex-wrap">
                            <div className="m-1 flex flex-col gap-0">
                                <div className="flex justify-center items-center gap-1">
                                    <div className="text-lg font-bold text-red-500">{"₹" + data['price']}</div>
                                    <div className="text-sm text-gray-500 line-through">{"₹" + data['mrp']}</div>
                                </div>
                                <div className="text-green-500">Free shipping</div>
                            </div>

                            {/* Add to Cart Button */}
                            <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded m-1" onClick={() => addtocart(data.id)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}
