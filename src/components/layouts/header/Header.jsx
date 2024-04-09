// import { useState } from "react";
// import logo from "./logo.png";
// 

// const navItems = ["home", "settings", "backup", "mail", "cloud", "layers"];

// export const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   return (
//     <nav className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="sidebar-inner">
//         <header className="sidebar-header">
//           <button
//             type="button"
//             className="sidebar-burger"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <span className="material-symbols-outlined">
//               {isOpen ? "close" : "menu"}
//             </span>
//           </button>
//           <img src={logo} className="sidebar-logo" />
//         </header>
//         <nav className="sidebar-menu">
//           {navItems.map((item) => (
//             <button key={item} type="button" className="sidebar-button">
//               <span className="material-symbols-outlined">{item}</span>
//               <p>{item}</p>
//             </button>
//           ))}
//         </nav>
//       </div>
//     </nav>
//   );
// };
import React, { useRef } from 'react'
// import {ReactNavbar} from "overlay-navbar";
import './header.css'
import { Link } from 'react-router-dom';
import {useSelector } from 'react-redux';
// import { logout } from '../../../actions/userActions';
import UserOptions from './UserOptions';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from './flipkart.png'
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  // const dispatch = useDispatch();

  // const btnHandler=()=>{
  //   dispatch(logout()); 
  // }
 const navRef = useRef();
  const {isAuthenticated,user} =  useSelector(state=>state.user);
  const showNavbar =()=>{
    if (navRef.current) {
      navRef.current.classList.toggle('responsiveNav');
    }
  }   
  if(!isAuthenticated){
    console.log(isAuthenticated ," ???????");
  return (
    <>
     <div className='header z-10'>
     
      <h2 className='h2 font-sans font-semibold absolute'><span className='font-bold text-yellow-300'>Shop</span>kart</h2>
       <nav className='max-w-screen  font-serif w-screen flex items-center justify-between  shadow-2xl shadow-gray'>
       <img src={logo} className='h-20 ml-4'/>
           <div className='flex justify-end mr-5' ref={navRef}>
               <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/" onClick={showNavbar}>Home</Link>
               <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/products" onClick={showNavbar}>Products</Link>
               <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/login" onClick={showNavbar}>Login</Link>
               <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/register" onClick={showNavbar}>signUp</Link>
               <button className='navBtn navCloseBtn ' onClick={showNavbar}>
       <FaTimes/>
       </button> 
           </div>
           <button className='navBtn openBtn mx-12 text-2xl ' onClick={showNavbar}>
       <FaBars/>
     </button>
       </nav>
       </div>
    </>
   )
  }

return (
    <div className='header z-10 shadow-lg'>
      <h2 className='h2 font-sans font-semibold absolute '><span className='font-bold text-yellow-400'>Shop</span>kart</h2>
    <nav className=' max-w-screen font-serif w-screen flex items-center justify-between shadow-2xl shadow-gray'>
      <div className='flex items-center '>
      <UserOptions user={user}/>
        </div>
        <div className='flex justify-end mr-5' ref={navRef}>
            <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/" onClick={showNavbar}>Home</Link>
            <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/products" onClick={showNavbar}>Products</Link>
            <Link className='mx-10 font-sans hover:underline underline-offset-[29px] text-xl hover:font-bold focus:font-bold font-semibold' to="/cart" onClick={showNavbar}>Cart</Link>
            
            <button className='navBtn navCloseBtn ' onClick={showNavbar}>
      <FaTimes/>
      </button> 
        </div>
        <button className='navBtn openBtn mx-7 text-xl ' onClick={showNavbar}>
      <FaBars/>
    </button>
    </nav>
  
    </div>
  )
}

export default Header

     {/* <div className='dropdown'>
        <div>
        <Link>Dashboard</Link>
        <Link>cart</Link>
        <Link>xyz</Link>
        <Link>Logout</Link>
        </div>
      </div> */}
      
      {/*
    <> <li><Link className='link options' style={{textDecoration:"none"}}>OPTIONS</Link></li> */}
    {/* <li class="dropdown"> */}
    {/* <a href="#" class="link" style={{textDecoration:"none"}} >OPTIONS</a> */}
    {/* <img src={user.avatar.url? user.avatar.url : "/Profile.png"} alt='img'/>
    <div class="dropdown-content">
      {user.role==="admin"?<a href="#">Dashboard</a>:(null)}
      <a href="#">Service 2</a>
      <a href="#"><button style={{width:"100%", background:"white" , border:"none"}} onClick={btnHandler}>Logout</button></a>
    </div>
  </li>
      </> */}





      // --------------------------------------------------------------------------------------
  //     <div className='navbar'>
  //   <div className='leftPart'>
  //     <img src={logo}/>
  //   <h1 className='heading'>Flipkart</h1>
  //   </div>
  // <div className='rightPart' >
  // <ul ref={navRef}>
  //     <li > <Link className='link' style={{textDecoration:"none"}} to="/">HOME</Link></li>
  //     <li > <Link className='link' style={{textDecoration:"none"}} to="/products">PRODUCTS</Link></li>
  //     <li > <Link className='link' style={{textDecoration:"none"}} to={isAuthenticated?"/cart":"/login"}>
  // <div>
  //     <ShoppingCartIcon/>CART
  // </div>
  //       </Link></li>
  //       <li ><Link className='link' style={{textDecoration:"none"}} to="/login">
  //     {isAuthenticated? <UserOptions user={user} />:"LOGIN"} </Link></li>
  //     <button className='navBtn navCloseBtn ' onClick={showNavbar}>
  //     <FaTimes/>
  //     </button> 
  //   </ul>
  //   <button className='navBtn openBtn mx-12 text-xl ' onClick={showNavbar}>
  //     <FaBars/>
  //   </button>
  // </div>
  //  </div>