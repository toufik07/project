import React, { createContext, useContext, useState , useEffect} from 'react';
import axios from 'axios';

// Create the Cart Context
const CartContext = createContext();

// Create a custom hook to use the CartContext
export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/cart/${userId}`)
                .then((res) => {
                    const cartItems = res.data.cart_items; // Assuming it returns an array of cart items
                    setCartCount(cartItems.length); // Set the initial cart count
                })
                .catch((error) => {
                    console.error('Failed to load cart data:', error);
                });
        }
    }, [userId]);

    // Function to add to cart and increase count
    const addToCart = () => {
        setCartCount(cartCount + 1);
    };

    // Function to remove from cart and decrease count
    const remove = () => {
        setCartCount(cartCount > 0 ? cartCount - 1 : 0);
    };

    return (
        <CartContext.Provider value={{ cartCount, addToCart, remove , setUserId}}>
            {children}
        </CartContext.Provider>
    );
}
