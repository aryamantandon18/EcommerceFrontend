import React, { useEffect } from 'react'
import Sidebar from './SideBar.js'
// import {Doughnut,Line} from "react-chartjs-2";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearErrors, getAdminProducts } from '../../actions/productActions.js';
import { CLEAR_ERRORS } from '../../constants/productConstants.js';

const Dashboard = () => {
  const dispatch = useDispatch();
const {error,products} = useSelector((state)=>state.products);
const {error:orderError,orders} = useSelector((state)=> state.allOrders);
let totalOrderPrice = 0;
  let outOfStock =0;
  products &&
  products.forEach((item)=>{
    if(item.stock==0) outOfStock += 1;
  })

  useEffect(()=>{
    // if(error){
    //   toast.error(error);
    //   dispatch({type:CLEAR_ERRORS});
    // }
    dispatch(getAdminProducts());
  },[dispatch]);

  // const lineState = {
  //   labels: [0,1],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["tomato"],
  //       hoverBackgroundColor: ["rgb(197, 72, 49)"],
  //       data: [0,2000],
  //     },
  //   ],
  // };

  // const doughnutState = {
  //   labels: ["Out of Stock", "InStock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["#00A6B4", "#6800B4"],
  //       hoverBackgroundColor: ["#4B5000", "#35014F"],
  //       data: [outOfStock,products.length - outOfStock],
  //     },
  //   ],
  // };
  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              
              {  orders && orders.forEach((order)=>{
                totalOrderPrice+=order.totalPrice;
              })}
            
              Total Amount <br/> ₹{totalOrderPrice}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
            <p>Product</p>
            <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>5</p>
            </Link>
          </div>
        </div>
        {/* <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div> */}
      </div>
      </div>
  )
}

export default Dashboard