import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MetaData from '../layouts/MetaData';
import SideBar from './SideBar';
import { Button } from '@mui/material';
import axios from 'axios';
import { server } from '../..';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const allUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${server}/users/admin/users`, {
                withCredentials: true,
            });
            setUsers(data.users);
        } catch (error) {
            console.log('User Error are :- ', error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteUserHandler = async (userId) => {
        await axios.delete(`${server}/users/admin/user/${userId}`, { withCredentials: true });
        allUsers();
    };

    useEffect(() => {
        allUsers();
    }, []);

    const columns = [
        { field: 'id', headerName: 'USER ID', minWidth: 200, flex: 0.5 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1 },
        { field: 'name', headerName: 'Name', minWidth: 150, flex: 0.3 },
        {
            field: 'role',
            headerName: 'Role',
            minWidth: 150,
            flex: 0.5,
            renderCell: (params) => (
                <span className={params.value.toLowerCase() === 'admin' ? 'text-green-500' : 'text-red-500'}>
                    {params.value}
                </span>
            ),
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            sortable: false,
            renderCell: (params) => (
                <Button onClick={() => deleteUserHandler(params.row.id)}>
                    <DeleteIcon className="text-red-500 hover:text-red-700" />
                </Button>
            ),
        },
    ];

    const rows = users.map((item) => ({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
    }));

    return (
        <Fragment>
            <MetaData title={'ALL Users - ADMIN'} />
            <div className="flex sm:mt-20 mt-16 h-[125vh]">
                <SideBar />
                <div className="flex-1 p-6 bg-white border-l border-gray-300 overflow-auto">
                    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-600 transition-all duration-500">ALL USERS</h1>
                    <DataGrid
                        sx={{
                            fontSize:{xs:"15px",sx:"17px",md:"20px"},
                            overflowY:"scroll",
                            backgroundColor: 'white',
                            border: 'none !important',
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#1f2937',
                                color: 'white',
                            },
                            '& .MuiDataGrid-actionsCell': {
                                color: 'black',
                            },
                            '& .MuiDataGrid-columnHeaderTitle': {
                                color: 'white',
                            },
                            // '& .MuiDataGrid-cell': {
                            //     fontSize: '1vmax',
                            //     color: 'rgba(0, 0, 0, 0.678)',
                            //     border: 'none !important',
                            // },
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                            '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within': {
                                outline: "none !important",
                            },
                            '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                                outline: "none !important",
                            },
                            // '@media screen and (max-width:600px)': {
                            //     '& .MuiDataGrid-cell': {
                            //         fontSize: '4vw',
                            //     },
                            // },
                            '& .MuiDataGrid-iconButtonContainer': {
                                color: '#ffffff !important', // Change filter button color
                                visibility: 'visible !important'
                            },
                            '& .MuiDataGrid-menuIcon': {
                                color: '#ffffff !important', // Change options (three dots) button color
                                visibility: 'visible !important'
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
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default AllUsers;
