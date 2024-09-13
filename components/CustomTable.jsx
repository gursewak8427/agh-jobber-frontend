"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
    {
        field: "client",
        headerName: "Client",
        flex: 1, // Allow the column to take available space
        minWidth: 150,
    },
    {
        field: "quoteNo",
        headerName: "Quote number",
        flex: 1,
        minWidth: 200,
    },
    {
        field: "address",
        headerName: "Property",
        flex: 1,
        minWidth: 150,
    },
    {
        field: "createdAt",
        headerName: "Created",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 100,
    },
    {
        field: "total",
        headerName: "Total",
        type: 'number',
        flex: 1,
        minWidth: 150,
        valueFormatter: (value) => {
            if (value == null) {
                return '';
            }
            return `$${value.toLocaleString()}`;
        },
    },
];

const rows = [
    {
        id: 1,
        client: "Jon Snow",
        quoteNo: "QTN001",
        address: "Winterfell, North",
        createdAt: "2023-09-01",
        status: "active",
        total: 1200.0,
    },
    {
        id: 2,
        client: "Cersei Lannister",
        quoteNo: "QTN002",
        address: "Red Keep, King's Landing",
        createdAt: "2023-08-25",
        status: "lead",
        total: 5000.0,
    },
    {
        id: 3,
        client: "Jaime Lannister",
        quoteNo: "QTN003",
        address: "Casterly Rock",
        createdAt: "2023-09-03",
        status: "active",
        total: 3000.0,
    },
    {
        id: 4,
        client: "Arya Stark",
        quoteNo: "QTN004",
        address: "Braavos, Essos",
        createdAt: "2023-09-05",
        status: "lead",
        total: 1500.0,
    },
    {
        id: 5,
        client: "Daenerys Targaryen",
        quoteNo: "QTN005",
        address: "Dragonstone, Narrow Sea",
        createdAt: "2023-09-07",
        status: "active",
        total: 6000.0,
    },
];


// const getStatusBox = status => {
//     switch (status) {
//         case "active": return <div className="w-full h-full flex items-center justify-start capitalize">
//             <div className="w-3 h-3 bg-blue-400 rounded-full mr-2"></div>
//             {status}
//         </div>
//         case "lead": return <div className="w-full h-full flex items-center justify-start capitalize">
//             <div className="w-3 h-3 bg-green-800 rounded-full mr-2"></div>
//             {status}
//         </div>

//         default:
//             break;
//     }
// }

export default function CustomTable() {
    return (
        <Box
            sx={{
                width: "100%", // Make sure the container takes the full width
                overflowX: "auto", // Handle horizontal overflow
            }}
        >
            <DataGrid
                autoHeight
                rows={rows}
                columns={columns}
                sx={{
                    minWidth: 900, // Ensures the table doesn't shrink too much
                    "@media (max-width: 600px)": {
                        ".MuiDataGrid-columnHeaders": {
                            fontSize: "0.75rem",
                        },
                        ".MuiDataGrid-cell": {
                            fontSize: "0.75rem",
                        },
                    },
                }}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

