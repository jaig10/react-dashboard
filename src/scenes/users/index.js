import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const userColumns = [
        { field: "id", headerName: "ID" },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phoneNumber", headerName: "Phone Number", flex: 1 }, 
        {
            field: "action",
            headerName: "Action",
            width: 170,
            renderCell: (params) => {
              return (
                <>
                  <Link to={"/user/" + params.row.id}>
                  <Button variant="contained" size="small" color="success" sx={{color:"white", fontWeight:"600", }}>Edit</Button>
            </Link>
            <Button variant="contained" size="small" color="error" sx={{color:"white", fontWeight:"600", marginLeft:"10px"}}>Delete</Button>
            
                </>
              );
            },
          },
    ];
    

    const sampleUsers = [
        { id: 1, username: "user1", email: "user1@example.com", phoneNumber: "123-456-7890" },
        { id: 2, username: "user2", email: "user2@example.com", phoneNumber: "987-654-3210" },
        { id: 3, username: "user3", email: "user3@example.com", phoneNumber: "555-555-5555" },
        // Add more sample user data as needed
    ];
    

    return (
        <Box m="20px">
            <Header title="Users" subtitle="List of all Users" />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid checkboxSelection rows={sampleUsers} columns={userColumns} />
            </Box>
        </Box>
    );
};

export default Users;
