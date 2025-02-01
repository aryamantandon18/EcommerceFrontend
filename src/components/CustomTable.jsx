import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const createTable = ({
    rows,
    columns,
    loading,
    page,
    totalItems,
    onPageChange,
    onPageSizeChange,
    pageSize = 10,
    sx={},
    ...rest
})=>{
    return(
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10,20,50]}
            loading={loading}
            paginationMode="server"
            page={page-1} //adjusting for 0-based indexing
            rowCount={totalItems}
            onPageChange={(newPage)=>onPageChange(newPage+1)}
            onPageSizeChange={(newPageSize) => onPageSizeChange(newPageSize)}
            disableRowSelectionOnClick
            autoHeight
            getRowId={(row)=> row.re}
        />
    )
}