import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from '../../actions/orderAction';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';
import { deleteOrder, getAllOrders } from '../../actions/orderAction';
import {MaterialReactTable} from 'material-react-table';

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
    {
      accessorKey: "id",
      header: "Order ID",
    },
    {
      accessorKey: "status",
      header: "Status",
      Cell: ({ cell }) => (
        <span className={cell.getValue() === "Delivered" ? "text-green-600" : "text-red-600"}>
          {cell.getValue()}
        </span>
      ),
    },
    {
      accessorKey: "itemsQty",
      header: "Items Qty",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      enableSorting: false,
      enableColumnActions: false,
      Cell: ({ row }) => (
        <div className="flex justify-end gap-2">
          <Link to={`/admin/order/${row.original.id}`}>
            <EditIcon className="text-blue-500 hover:text-blue-700" />
          </Link>
          <Button onClick={() => deleteOrderHandler(row.original.id)}>
            <DeleteIcon className="text-red-500 hover:text-red-700" />
          </Button>
        </div>
      ),
    },
  ];

  const data = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.orderItems.length,
    amount: item.totalPrice,
    status: item.orderStatus,
  })) || [];

  return (
    <Fragment>
      <MetaData title={'ALL Orders - ADMIN'} />
      <div className="flex mt-16 sm:mt-20 h-[100vh] bg-[#f3f4f6]">
        <SideBar />
        <div className="flex-2 p-6 border-l border-gray-300 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-600 transition-all duration-500">
            ALL ORDERS
          </h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <MaterialReactTable
              columns={columns}
              data={data}
              enableColumnResizing
              enableStickyHeader
              enablePagination
              initialState={{ density: 'comfortable' }}
              muiTablePaperProps={{
                elevation: 2,
                sx: {
                  overflowX: "auto",
                  '&::-webkit-scrollbar': { width: '10px' },
                  '&::-webkit-scrollbar-thumb': { backgroundColor: '#888' },
                  '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                },
              }}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
