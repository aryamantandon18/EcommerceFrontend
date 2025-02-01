import React, { Fragment, useEffect, useState } from 'react';
import { clearErrors } from '../../actions/productActions';
import toast from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { Button, MenuItem, TextField } from '@mui/material';
import axios from 'axios';
import { server } from '../..';
import { useSelector } from 'react-redux';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);  // Store reviews data
    const [loading, setLoading] = useState(false); // Loading state
    const [totalReviews,settotalReviews] = useState(1);
    const [page,setPage] = useState(1);
    const[pageSize,setPageSize] = useState(10);
    // Filter Criteria States
    const [searchCriteria, setSearchCriteria] = useState({
        username: '',
        rating: '',
        productId: '',
    });
    
    const { user } = useSelector((state) => state.user);

    // Function to fetch all reviews from the API
    const getReviews = async (currentPage = 1,currentPageSize = 10) => {
        try {
            setLoading(true); // Set loading to true while fetching
            const { data } = await axios.post(`${server}/admin/reviews?page=${currentPage}&limit=${currentPageSize}`,
                searchCriteria,
                { withCredentials:true }
            );

            if(data.success){
                setReviews(data.reviews);
                settotalReviews(data.totalReviews);
                setPage(data.currentPage);
                setLoading(false); 
            }
        } catch (error) {
            setLoading(false);  
            console.log('Error fetching reviews:', error);
            toast.error('Failed to fetch reviews.');
        }
    };

    const handleFilterChange = (field, value) => {
        setSearchCriteria((prev) => ({ ...prev, [field]: value }));
    };

    // Clear Filters
    const clearFilters = () => {
        setSearchCriteria({ username: '', rating: '', productId: '' });
        getReviews(); // Fetch all reviews again
    };

    useEffect(() => {
        console.log("Line 65-- ", pageSize);
        getReviews(page, pageSize); // Fetch reviews whenever page or pageSize changes
    }, [page, pageSize]);


    useEffect(() => {
        getReviews();
    }, []);

    // Define columns for DataGrid
    const columns = [
        { field: 'reviewId', headerName: 'Review ID', minWidth: 200, flex: 1,sortable:false },
        { field: 'productId', headerName: 'Product ID', minWidth: 200, flex: 1,sortable:false },
        { field: 'username', headerName: 'User Name', minWidth: 200, flex: 1 },
        { field: 'userEmail', headerName:'User Email', mindWidth:200, flex:1},
        { field: 'rating', headerName: 'Rating', minWidth: 150, flex: 0.5 },
        { field: 'comment', headerName: 'Comment', minWidth: 200, flex: 1,filterable:false },
        {field:'date', headerName:'Date', minWidth:200, flex:1},
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/reviews/${params.row.reviewId}`}>
                        <EditIcon className="text-blue-500 hover:text-blue-700 mr-2"/>
                    </Link>
                    <Button onClick={() => deleteReviewHandler(params.row.reviewId)}>
                        <DeleteIcon className="text-red-500 hover:text-red-700"/>
                    </Button>
                </Fragment>
            ),
        },
    ];

    // Map the reviews data to rows for DataGrid
    const rows = reviews.map((review) => ({
        reviewId: review.reviewId,  // Use the review ID as the row ID
        productId: review.productId.slice(0,15)+"...",
        username: review.userName,  
        userEmail:review.userEmail,
        rating: review.rating,
        comment: review.comment,
        date: new Date(review.date).toLocaleDateString(),
    }));

    // Function to handle review deletion (if needed)
    const deleteReviewHandler = async (reviewId) => {
        try {
            // Call API to delete review
            await axios.delete(`${server}/admin/review/${reviewId}`,{
                withCredentials:true,
            });
            getReviews(page);  // Refresh the reviews list
            toast.success('Review deleted successfully');
        } catch (error) {
            console.log('Error deleting review:', error);
            toast.error('Failed to delete review');
        }
    };

    return (
        <Fragment>
        <MetaData title={'All Reviews - Admin'} />
        <div className="flex mt-16 sm:mt-20 h-[125vh]">
            <SideBar />
            <div className="flex-1 p-6 bg-white border-l border-gray-300 overflow-auto">
                <h1 className="text-3xl font-semibold mb-6 text-center text-gray-600 transition-all duration-500">ALL REVIEWS</h1>
                {/* <div className="bg-white shadow-md rounded-lg p-4 mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <TextField
                                label="Search by Username"
                                variant="outlined"
                                value={searchCriteria.username}
                                onChange={(e) => handleFilterChange('username', e.target.value)}
                            />
                            <TextField
                                label="Search by Rating"
                                variant="outlined"
                                value={searchCriteria.rating}
                                onChange={(e) => handleFilterChange('rating', e.target.value)}
                                select
                            >
                                <MenuItem value="">All Ratings</MenuItem>
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <MenuItem key={rating} value={rating}>
                                        {rating}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                label="Search by Product ID"
                                variant="outlined"
                                value={searchCriteria.productId}
                                onChange={(e) => handleFilterChange('productId', e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end mt-4 gap-4">
                            <Button variant="contained" color="primary" onClick={() => getReviews(page,pageSize)}>
                                Search
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={clearFilters}>
                                Clear Filters
                            </Button>
                        </div>
                </div> */}

                <div className="bg-white shadow-md rounded-lg p-4">
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
                        '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                            outline: "none !important",
                        },
                        '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                            outline: "none !important",
                        },
                          '& .MuiDataGrid-columnHeader .MuiDataGrid-filterIcon': {
                            color: "#040404", // Change the filter icon color
                          },
                          '& .MuiDataGrid-columnHeader .MuiDataGrid-menuIcon': {
                            color: "#040404", // Change the options 3 dots color
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
                        pageSize={pageSize}           
                        rowsPerPageOptions={[10, 20, 50]}
                        page={ page - 1 }   // DataGrid uses 0-based page index
                        paginationMode="server"
                        pagination={true}
                        loading={loading}
                        rowCount={totalReviews} 
                        autoHeight
                        className="h-[80vh]"
                        onPageChange={(page)=>{
                            setPage(page+1);
                        }}
                        onPageSizeChange={(pageSize) => {
                            setPageSize(pageSize);
                            setPage(1);  // Reset to first page if page size changes
                        }}
                        getRowId={(row)=> row.reviewId}
                    />
                </div>
            </div>
        </div>
    </Fragment>

    );
};

export default AllReviews;
