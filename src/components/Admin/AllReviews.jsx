import React, { Fragment, useEffect, useState } from 'react';
import { clearErrors } from '../../actions/productActions';
import toast from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './productList.css';
import axios from 'axios';
import { server } from '../..';
import { useSelector } from 'react-redux';

const AllReviews = () => {
    const [reviews, setReviews] = useState([]);  // Store reviews data
    const [loading, setLoading] = useState(false); // Loading state
    const { user } = useSelector((state) => state.user);

    // Function to fetch all reviews from the API
    const getReviews = async () => {
        try {
            setLoading(true); // Set loading to true while fetching
            const { data } = await axios.get(`${server}/getReviewsForUser/${user._id}`,{
                withCredentials:true,   
            });
            
            // Update state with the reviews data
            setReviews(data);
            setLoading(false); // Set loading to false after fetching
        } catch (error) {
            setLoading(false);  // Set loading to false in case of error
            console.log('Error fetching reviews:', error);
            toast.error('Failed to fetch reviews.');
        }
    };

    // UseEffect to call the function on component mount
    useEffect(() => {
        getReviews();
    }, []);

    // Define columns for DataGrid
    const columns = [
        { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },
        { field: 'productId', headerName: 'Product ID', minWidth: 200, flex: 1 },
        { field: 'user', headerName: 'User', minWidth: 200, flex: 1 },
        { field: 'rating', headerName: 'Rating', minWidth: 150, flex: 0.5 },
        { field: 'comment', headerName: 'Comment', minWidth: 200, flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/review/${params.row.id}`}>
                        <EditIcon />
                    </Link>
                    <Button onClick={() => deleteReviewHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </Fragment>
            ),
        },
    ];

    // Map the reviews data to rows for DataGrid
    const rows = reviews.map((review) => ({
        id: review.reviews._id,  // Use the review ID as the row ID
        productId: review.productId,
        user: review.reviews.name,  // Assuming the review contains the user's name
        rating: review.reviews.rating,
        comment: review.reviews.comment,
    }));

    // Function to handle review deletion (if needed)
    const deleteReviewHandler = async (reviewId) => {
        try {
            // Call API to delete review
            await axios.delete(`${server}/reviews/${reviewId}`);
            getReviews();  // Refresh the reviews list
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
            <div className="flex-1 p-6 bg-gray-100 overflow-x-scroll">
                <h1 className="text-3xl font-semibold mb-6">ALL REVIEWS</h1>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSizeOptions={[10]}
                        disableSelectionOnClick
                        autoHeight
                        className="productListTable"
                    />
                </div>
            </div>
        </div>
    </Fragment>

    );
};

export default AllReviews;
