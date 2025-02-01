import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getAdminProducts, deleteProduct } from '../../actions/productActions';
import toast from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.deleteProduct);

  const [page, setPage] = useState(0); // Track current page
  const [pageSize, setPageSize] = useState(10); // Track page size

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success('Product Deleted Successfully');
      navigate('/admin/dashboard');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, isDeleted, deleteError]);

  const deleteProductHandler = (id) => {
    console.log('Inside delete func Deleting this ->', id);
    dispatch(deleteProduct(id));
  };

  const columns = [
    { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },
    {
      field: 'name',
      headerName: 'Name',
      minWidth: 350,
      flex: 1,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: 'actions',
      flex: 0.3,
      headerName: 'Actions',
      minWidth: 150,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon className="text-blue-500 hover:text-blue-700 mr-2" />
            </Link>
            <Button onClick={() => { deleteProductHandler(params.row.id); }}>
              <DeleteIcon className="text-red-500 hover:text-red-700" />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  if (Array.isArray(products)) {
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  }

  // Apply pagination by slicing the rows based on current page and page size
  const paginatedRows = rows.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <Fragment>
      <MetaData title={'ALL Products - ADMIN'} />
      <div className="flex sm:mt-20 mt-16 h-[100vh] overflow-hidden">
        <SideBar />
        <div className="flex-1 p-6 bg-white border-l border-gray-300 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6 text-center text-gray-600 transition-all duration-500">ALL PRODUCTS</h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <DataGrid
              sx={{
                fontSize: { xs: '15px', sx: '17px', md: '20px' },
                height: '98vh',
                overflowY: 'scroll',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#1f2937',
                  color: '#040404',
                },
                '& .MuiDataGrid-actionsCell': {
                  color: '#ffffff', // Set the color of the actions (three dots) to white
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: '#ffffff', // Ensuring the column header titles are white
                },
                '& .MuiDataGrid-cell:hover': {
                  color: 'primary.main',
                },
                '& .MuiDataGrid-columnSeparator': {
                  display: 'none', // Make the column separator invisible by default
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
              pageSize={pageSize}
              page={page}
              onPageChange={(newPage) => setPage(newPage)}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              pageSizeOptions={[10, 20, 50]}
              disableSelectionOnClick
              autoHeight
              pagination
              paginationMode="client"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
