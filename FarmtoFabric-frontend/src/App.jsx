import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import News from './components/News'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Woolinfo from './components/Woolinfo'
import Login from './components/Login';
import Register from './components/Register'
import Dashboard from './components/ServiceProvider/Dashboard';
import Sidebar from './components/ServiceProvider/Sidebar';
import Qualityassurance from './components/ServiceProvider/Qualityassurance'
import Products from './components/ServiceProvider/Products'
import Orders from './components/ServiceProvider/Orders'
import Services from './components/ServiceProvider/Services'
import Homepage from './components/user/Homepage';
import Addproducts from './components/ServiceProvider/Addproducts';
import Cart from './components/user/Cart';
import OrdersUser from './components/user/OrdersUser';
import FarmerHome from './components/Farmer/FarmerHome';
import LostPass from './components/LostPass'
import { CartProvider } from './components/user/CartProvider';

export default function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for demonstration purposes
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div>
      {loading ?
        (
          <Loading />
        ) : (
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={
                  <>
                    <Navbar />
                    <Home />
                    <Woolinfo />
                    <News />
                  </>
                }
              />
              <Route
                path='/news'
                element={
                  <>
                    <Navbar />
                    <News />
                  </>
                }

              />
              <Route
                path='/wool-info'
                element={
                  <>
                    <Navbar />
                    <Woolinfo />
                  </>
                }
              />

              <Route
                path='/login'
                element={
                  <>
                    <Navbar />
                    <Login />
                    {/* <LoginForm/> */}
                  </>
                }
              />

              <Route
               path='/lostpass'
               element={
                <>
                  <Navbar/>
                  <LostPass/>
                </>
               }
              />

              <Route path='/register'
                element={
                  <>
                    <Navbar />
                    <Register />
                  </>
                }
              />

              {/* Farmer */}
              <Route path='/sprovider/:id/:name/:signinas'
                element={
                  <>
                    <Sidebar name="Dashboard" />
                    <Dashboard />
                  </>
                }
              />

              <Route path='/sprovider/:id/:name'
                element={
                  <>
                    <Sidebar name="Dashboard" />
                    <Dashboard />
                  </>
                }
              />

              <Route path='/sprovider/:id/:name/qualityassurace'
                element={
                  <>
                    <Sidebar name="Quality Assurance" />
                    <Qualityassurance />
                  </>
                }
              />

              <Route path='/sprovider/:id/:name/products'
                element={
                  <>
                    <Sidebar name="Products" />
                    <Products />
                  </>
                }
              />

              <Route path='/sprovider/:id/:name/addproducts'
                element={
                  <>
                    <Sidebar name="Add Products" />
                    <Addproducts />
                  </>
                } 
              />

              <Route path='/sprovider/:id/:name/products/addproducts/:pid'
                element={
                  <>
                    <Sidebar name="Add Products" />
                    <Addproducts />
                  </>
                }
              />

              <Route path='/sprovider/:id/:name/services'
                element={
                  <>
                    <Sidebar name="Services" />
                    <Services />
                  </>
                }
              />

              <Route path='/sprovider/:id/:name/orders'
                element={
                  <>
                    <Sidebar name="Orders" />
                    <Orders />
                  </>
                }
              />

              {/* User */}
              <Route
                path='/user/:id/:name/:signinas'
                element={
                  <>
                    <Navbar />
                    <Homepage />
                  </>
                }
              />

              <Route
                path='/searchitem/:id/:name/:title'
                element={
                  <>
                    <Navbar />
                    <Products />
                  </>
                }
              />

              <Route
                path='/cart/:id/:name/:signinas'
                element={
                  <>
                    <Navbar />
                    <Cart />
                  </>
                }
              />

              <Route
                path='/order/:id/:name/:signinas'
                element={
                  <>
                    <Navbar />
                    <OrdersUser />
                  </>
                }
              />



              {/* Farmer */}
              <Route
                path='/farmer/:id/:name/:signinas'
                element={
                  <>
                    <Navbar />
                    <FarmerHome/>
                  </>
                }
              />

              <Route
                path='/farmer/:id/:name/:signinas/farmerhome'
                element ={
                  <>
                  <Navbar/>
                  <FarmerHome/>
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
          </CartProvider>
        )
      }
    </div>
  )
}
