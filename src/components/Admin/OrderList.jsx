import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from '../../actions/orderAction'
import toast from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';
import { deleteOrder, getAllOrders } from '../../actions/orderAction';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error: orderError, orders } = useSelector((state) => state.allOrders);
  const { error, isDeleted } = useSelector((state) => state.orderReducer);

  useEffect(() => {
    if (orderError) {
      toast.error(orderError);
      dispatch(clearErrors());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, isDeleted, orderError, navigate]);

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const columns = [
    { field: "id", headerName: "OrderId", minWidth: 200, flex: 1 },  // Reduced flex for OrderId
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      flex: 0.5,  // Reduced flex for Status
      cellClassName: (params) => {
        const statusValue = params.row.status;
        return statusValue === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 120,
      flex: 0.5,  // Reduced flex for Items Qty
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 150,
      flex: 0.5,  // Reduced flex for Amount
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.5,  // Increased flex for Actions to push it to the end
      minWidth: 120,
      sortable: false,
      align:'right',
      headerAlign:'right',
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon className="text-blue-500 hover:text-blue-700 mr-2"/>
            </Link>
            <Button onClick={() => { deleteOrderHandler(params.row.id) }}>
              <DeleteIcon className="text-red-500 hover:text-red-700" />
            </Button>
          </Fragment>
        );
      },
    }
  ];
  

  const rows = [];
  if (Array.isArray(orders)) {
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });
  }

  return (
    <Fragment>
      <MetaData title={'ALL Orders - ADMIN'} />
      <div className="flex mt-16 sm:mt-20 h-[100vh]">
        <SideBar />
        <div className="flex-1 p-6 bg-white border-l border-gray-300 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-600 transition-all duration-500">ALL ORDERS</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <div className="overflow-x-auto">
              <DataGrid
              sx={{
                fontSize:{xs:"15px",sx:"17px",md:"20px"},
                overflowY:"scroll",
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#1f2937",
                    // fontSize: "16px",
                    color: "#040404",
                },
                "& .MuiDataGrid-actionsCell": {
                    color: "#ffffff", // Set the color of the actions (three dots) to white
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                    color: "#ffffff", // Ensuring the column header titles are white
                },
                '& .MuiDataGrid-cell:hover': {
                    color: 'primary.main',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display:'none', // Make the column separator invisible by default
                },
                '&::-webkit-scrollbar': {
                    width: '10px',
                 },
                '&::-webkit-scrollbar-track': {
                   backgroundColor: '#f1f1f1',
                   borderRightRadius: '10px',
                  },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: '#888',
                      borderRightRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      backgroundColor: '#555',
                    },

                
            }}
                rows={rows}
                columns={columns}
                pageSizeOptions={[10]}
                disableSelectionOnClick
                autoHeight
                // className="productListTable"
                // Hide columns on small screen
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default OrderList;
