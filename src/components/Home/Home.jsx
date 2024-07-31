import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layouts/MetaData.js'
import {CgMouse} from 'react-icons/cg';
import { ProductCard } from './ProductCard';
import './Home.scss'
import{ getProduct} from '../../actions/productActions.js'
import {useSelector,useDispatch} from 'react-redux'
import Loader from '../layouts/loader/Loader.jsx';
import toast from 'react-hot-toast';
import { Carousel } from 'react-responsive-carousel';
import imag1 from './imag1.webp'
import imag8 from './imag8.webp'
import imag9 from './imag9.webp'
import imag7 from './imag7.webp'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const products =[
//   {
//    name: "Paper Bag",
//    images:[{url:"https://cdn.pixabay.com/photo/2018/11/24/22/34/bag-3836460_640.jpg"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "Smartcraft Bamboo Coffee Cup",
//    images:[{url:"https://m.media-amazon.com/images/I/31xtKpIk1BL.jpg"}],
//    price:"₹149",
//    id:"Aryaman",
//  },
//  {
//    name: "Bamboo Brush",
//    images:[{url:"https://images.pexels.com/photos/7262938/pexels-photo-7262938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "Paper straws",
//    images:[{url:"https://images.pexels.com/photos/3018819/pexels-photo-3018819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "Wooden Comb",
//    images:[{url:"https://images.unsplash.com/photo-1590159763121-7c9fd312190d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdvZGRlbiUyMGNvbWJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "GUNEE Ecofriendly Handicraft Cane Bar Stool Mudda Chair",
//    images:[{url:"https://m.media-amazon.com/images/I/916XUiUB65L._SX522_.jpg"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "Hero Lectro Clix 26T SS Single Speed Electric Cycle",
//    images:[{url:"https://m.media-amazon.com/images/I/814S6OTdWTL._SX679_.jpg"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "PRAKRUTIK Garbage Bags Biodegradable",
//    images:[{url:"https://m.media-amazon.com/images/I/81GKnoixdNL._SX522_.jpg"}],
//    price:"₹200",
//    id:"Aryaman",
//  },{
//    name: "LED Bulb",
//    images:[{url:"https://b-cap.eu/wp-content/uploads/b-cap-046135796036-768x768.jpg"}],
//    price:"₹200",
//    id:"Aryaman",
//  },
//  {
//    name: "Bamboo Cutlery Travel kit",
//    images:[{url:"https://cdn.shopify.com/s/files/1/0512/4823/4660/products/happy_4_1024x10242x0.png?v=1607803142"}],
//    price:"₹200",
//    id:"Aryaman",
//  }
//  ]
 
 const Home = () => {
  const {loading,error,products} = useSelector((state)=>state.products);
  //  const{isAuthenticated} = useContext(Context);
   const dispatch = useDispatch();
   const [currentPage, setCurrentPage] = useState(0);
   const [productsPerPage, setProductsPerPage] = useState(4);

   const updateProductsPerPage = () => {
    if (window.innerWidth <= 700) {
      setProductsPerPage(4);
    } else {
      setProductsPerPage(5);
    }
  };


   const handleNext = () => {
    if (currentPage < Math.floor(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

   useEffect(()=>{
    if(error){
      console.error("Error fetching products:", error);
      return toast.error(error.message);
    }
    dispatch(getProduct());
    updateProductsPerPage();

    // Update products per page on window resize
    window.addEventListener('resize', updateProductsPerPage);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateProductsPerPage);
   },[dispatch,error]);

   return (
     <Fragment>
     { loading ? (
     <Loader/>
     ):(
      <Fragment>
      <MetaData title="ECOMMERCE" />
 
 <div className='pt-20 '>
 <Carousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showArrows={true}
        showThumbs={false}
        interval={1000}
        className= 'banner'
      >
          <div>
          <img src={imag7} alt="Item1" className='crim' />  
        </div>
        <div>
          <img src={imag8} alt="Item1" className='crim'/>
        </div>
        <div>
          <img src={imag9} alt="Item3" className='crim'/>
        </div>
      </Carousel> 
   {/* <p>Welcome to Ecohub Ecommerce</p>
   <h1>FIND AMAZING PRODUCTS BELOW</h1> 

   <a href='#container'>
     <button className='btn' onClick={()=>{}}>
       Scroll <CgMouse />
     </button>
     </a> */}
 
 </div>

<div className='bg-[#f1f2f4] px-3 py-4'>
<div className='bg-white group'>
<h2 className="homeHeading mx-auto pt-8 mb-7 md:pt-10 md:mb-10">Featured Products</h2>
<div className="flex mx-auto w-[99%] justify-center max-w-full h-[60vh] ">
                <div className=' my-auto lg:mt-36 hidden group-hover:block '>
                  <button onClick={handlePrev} className='left-0 absolute bg-[#f1f2f4] md:p-6 p-3  h-12 sm:h-16 md:h-28'><FaChevronLeft/></button>
                </div>
               <div className='flex flex-wrap justify-center'>
               {products &&
                  products
                    .slice(
                      currentPage * productsPerPage,
                      currentPage * productsPerPage + productsPerPage
                    )
                    .map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
               </div>
                <div className='my-auto lg:mt-36  hidden group-hover:block'>
                  <button onClick={handleNext} className='absolute right-0 bg-[#f1f2f4] md:p-6 p-3  h-12 sm:h-16 md:h-28'><FaChevronRight/></button>
                </div>
              </div>
</div>
</div>

 
<div className='pt-5'>
<h2 className="homeHeading mx-auto pt-8 mb-7 md:pt-10 md:mb-10">Best Sellers</h2>

<div className="flex mx-auto w-[99%] justify-center max-w-full h-[60vh] flex-wrap" >
  {products &&
    products.slice(4).map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
</div>
</div>

 </Fragment>
     )}
 
        </Fragment>
    )}

export default Home


{/* <Carousel
        infiniteLoop
        autoPlay
        showStatus={false}
        showArrows={false}
        showThumbs={false}
        interval={1000}
        className= 'banner crausal'
      >
          <div>
          <img src={imag1} alt="Item1" className='crim' />
          <p className="legend">Full Stack</p>
        </div>
        <div>
          <img src={imag2} alt="Item1" className='crim'/>
          <p className="legend">Full Stack</p>
        </div>
        <div>
          <img src={imag4} alt="Item3" className='crim'/>
          <p className="legend">Peer-to-peer Support</p>
        </div>
      </Carousel> */}