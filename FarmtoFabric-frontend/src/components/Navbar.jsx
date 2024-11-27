import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from './user/CartProvider'

export default function Navbar() {
  const [isMenuOpen, setMenu] = useState(false)
  const [lightMode, setLightMode] = useState(true)
  const [searchdata, setsearchData] = useState("")
  const [link,setLink] = useState("/")
  let navigate = useNavigate()
  let { id, name, signinas } = useParams()
  const{cartCount,setUserId} = useCart()


  

  function searchData() {
    console.log(searchdata)
    axios.get("http://localhost:5000/searchproduct/" + searchdata)
      .then((res) => {
        navigate('/searchitem/' + id + '/' + name + '/' + res.data.title)
      })
      .catch((rej) => {
        alert("msg:", rej)
      })
  }


  function menuOpen(e) {
    e.preventDefault()
    if (isMenuOpen) {
      setMenu(false)
    } else {
      setMenu(true)
    }
  }

  function setMode(e) {
    e.preventDefault()
    if (lightMode)
      setLightMode(false)
    else
      setLightMode(true)
  }

  useEffect(()=>{
    if(signinas === "User"){
      setLink("/user/"+id+"/"+name+"/"+signinas)
    }
    else if(signinas === "Farmer"){
      setLink("/farmer/"+id+"/"+name+"/"+signinas)
    }
    // loadCartData()
    setUserId(id)
  },[])

  return (
    <>
      < div className=' border-b-2 fixed right-0 left-0 top-0 bg-slate-200 z-20'>
        <div className="nav max-w-7xl m-auto flex p-2 justify-between">
          <Link to={link} className='nav-logo flex gap-2'>
            <img src={require("./images/Farm_to__1_-removebg-preview.png")} alt="" className='w-14' />
            <span className=' p-1 font-mono text-xl font-bold flex flex-col '>FARM TO  <span className=' text-xs text-green-600'>FABRIC</span></span>
          </Link>
          {
            !(signinas === "User" || signinas === "Farmer") &&
            <div className="nav-items md:flex md:gap-6 p-2 md:items-center md: text-gray-500 md:font-bold hidden ">
              <Link to={'/'} className=' hover:text-black'>Home</Link>
              <Link to={'/wool-info'} className=' hover:text-black'>Wool-Info</Link>
              <Link to={'/news'} className=' hover:text-black'>News</Link>
            </div>
          }
          {
            (signinas === "Farmer") &&
            <div className="nav-items md:flex md:gap-6 p-2 md:items-center md: text-gray-500 md:font-bold hidden ">
              {/* <Link to={'/farmer/'+id+'/'+name+'/'+signinas+'/farmerhome'} className=' hover:text-black'>Home</Link>
              <Link to={'/'} className=' hover:text-black'>Services</Link>   */}
            </div>
          } 

          {
            (signinas === "User") &&
            <div className="flex-row items-center hidden md:flex">
              <input type="text" name="" id="" placeholder="Search....." className='border border-green-500 w-80 rounded-l-md p-1'
                onChange={
                  (e) => {
                    setsearchData(e.target.value)
                  }
                }
              />
              <button className=' bg-black text-white rounded-r-md font-bold p-1'
                onClick={() => {
                  searchData()
                }}
              >
                Submit
              </button>
            </div>
          }

          {
            (signinas === "User") &&
            <div className='md:flex md:p-1 hidden'>
              <Link to={'/user/' + id + '/' + name + '/' + signinas} className='flex flex-col items-center'>
                <div class="">
                  <i class="fa fa-home text-black"></i>
                </div>
                <small class=" text-sm"> Home </small>
              </Link>
            </div>
          }

          {
            (signinas === "User") &&
            <div className='md:flex md:p-1 hidden'>
              <Link to={'/order/' + id + '/' + name + '/' + signinas} className='flex flex-col items-center'>
                <div class="">
                  <i class="fa fa-store text-black"></i>
                </div>
                <small class=" text-sm"> Orders </small>
              </Link>
            </div>
          }
          {
            (signinas === "User") &&
            <div class="md:flex  md:p-1 hidden">
              <Link to={'/cart/' + id + '/' + name + '/' + signinas} class="flex flex-col items-center">
                <div class="icon-area">
                  <i class="fa fa-shopping-cart text-black"></i>
                  <span id="spnCount" class="notify font-bold text-red-700">{cartCount}</span>
                </div>
                <small class="text"> Cart </small>
              </Link>
            </div>
          }

          {
            (signinas === "User") &&
            <div class="md:flex md:p-1 hidden" >
              <Link to={"/"} class="flex flex-col items-center">
                <div class="icon-area">
                  <i class="fa fa-sign text-black"></i>
                </div>
                <small class="text"> Logout </small>
              </Link>
            </div>
          }

          <div className="nav-button p-2 flex justify-start items-center gap-2  ">
            {!name &&
              <button className='p-1 bg-green-600 w-10 rounded-md flex justify-center text-white' onClick={(e) => setMode(e)}>
                {lightMode &&
                  <span class="material-symbols-outlined">
                    light_mode
                  </span>
                }
                {
                  !lightMode &&
                  <span class="material-symbols-outlined text-black">
                    dark_mode
                  </span>
                }
              </button>
            }

            {!(signinas === "User" || signinas === "Farmer") &&
              <Link to={'/login'} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 duration-300 start-btn bg-purple-700 p-1 rounded-lg text-white w-32 font-bold md:flex justify-center hidden'  >
                Get Started
              </Link>
            }

            
          {
            (signinas === "Farmer") &&
            <div class="md:flex md:p-1 hidden" >
              <Link to={"/"} class="flex flex-col items-center">
                <div class="icon-area">
                  <i class="fa fa-sign text-black"></i>
                </div>
                <small class="text"> Logout </small>
              </Link>
            </div>
          }

            <button className=' md:hidden border-1' onClick={(e) => menuOpen(e)}>
              <img src={require("./images/menu.png")} alt="" />
            </button>

          </div>


        </div>

        {
          (isMenuOpen && !name) &&
          <div className=" flex flex-col gap-1 text-gray-600 font-bold p-3 items-center border fixed top-0 right-0 w-full bg-slate-100 z-10 ">

            <span class="material-symbols-outlined" onClick={(e) => {
              menuOpen(e)
            }}>
              close
            </span>

            <Link to={'/'}>Home</Link>
            <Link to={'/wool-info'}>Wool-Info</Link>
            <Link to={'/news'}>News</Link>
            <Link to={'/login'} className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-purple-500 duration-300 start-btn bg-purple-700 p-1 rounded-lg text-white w-32 font-bold flex justify-center '>
              Get Started
            </Link>


          </div>

        }
        {
          (name && isMenuOpen && signinas === 'User') &&
          <div className=" flex flex-col gap-1 text-gray-600 font-bold p-3 items-center border fixed top-0 right-0 w-full bg-slate-100 z-10 ">

            <span class="material-symbols-outlined" onClick={(e) => {
              menuOpen(e)
            }}>
              close
            </span>
            <div className=" flex justify-between">
              <div className=' flex p-1 m-1'>
                <Link to="/orders" className='flex flex-col items-center'>
                  <div class="">
                    <i class="fa fa-store text-black"></i>
                  </div>
                  <small class=" text-sm"> Orders </small>
                </Link>
              </div>
              <div class="flex  p-1 m-1">
                <Link to="/cart" class="flex flex-col items-center">
                  <div class="icon-area">
                    <i class="fa fa-shopping-cart text-black"></i>
                    <span id="spnCount" class="notify">{cartCount}</span>
                  </div>
                  <small class="text"> Cart </small>
                </Link>
              </div>
              <div class="flex p-1 m-1" >
                <Link to={"/"} class="flex flex-col items-center">
                  <div class="icon-area">
                    <i class="fa fa-sign text-black"></i>
                  </div>
                  <small class="text"> Logout </small>
                </Link>
              </div>
            </div>
            <div className="flex-row items-center flex">
              <input type="text" name="" id="" placeholder="Search....." className='border border-green-500 sm:w-80 rounded-l-md p-1' />
              <button className=' bg-black text-white rounded-r-md font-bold p-1'>
                Submit
              </button>
            </div>

          </div>
        }
        
        {
          (name && isMenuOpen && signinas === 'Farmer') &&
          <div className=" flex flex-col gap-1 text-gray-600 font-bold p-3 items-center border fixed top-0 right-0 w-full bg-slate-200 z-10 ">

            <span class="material-symbols-outlined" onClick={(e) => {
              menuOpen(e)
            }}>
              close
            </span>
            
            {/* <div className="nav-items flex flex-col gap-2 p-2 items-center  font-bold  ">
              <Link to={'/farmer/'+id+'/'+name+'/'+signinas+'/farmerhome'} className=' hover:text-black  border-black border-b p-1'>Home</Link>
              <Link to={'/'} className=' hover:text-black border-black border-b p-1'>Services</Link>
              <Link to={'/'} className=' hover:text-black border-black border-b p-1'>Wool Tracking</Link>
              <Link to={'/'} className=' hover:text-black border-black border-b p-1'>Support</Link>
            </div> */}

            <div class="flex p-1 m-1" >
                <Link to={"/"} class="flex items-center">
                  <div class="icon-area">
                    <i class="fa fa-sign text-black"></i>
                  </div>
                  <small class="text"> Logout </small>
                </Link>
              </div>
            </div>
        }

        {
          signinas === "User" &&
          <div className='flex justify-center bg-yellow-600'>
            <h3 className=' text-white'>Hello {name}</h3>
          </div>
        }

        {
          signinas === "Farmer" &&
          <div className='flex justify-center bg-green-400'>
            <h3 className=' text-white'>Hello {name}</h3>
          </div>
        }

      </div>
      {/* {
        signinas === "User" &&
        <div className=' bg-black border border-black'>
          <h3 className='hidden md:block'>Hey {name}</h3>
        </div>
      } */}

    </>
  )
}
