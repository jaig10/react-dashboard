import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const SellerProducts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const sellerColumns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 }, {
      field: "action",
      headerName: "Action",
      width: 150,
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
  const sampleSellers = [
    { id: 1, name: "Seller 1", email: "seller1@example.com", phone: "123-456-7890" },
    { id: 2, name: "Seller 2", email: "seller2@example.com", phone: "987-654-3210" },
    { id: 3, name: "Seller 3", email: "seller3@example.com", phone: "555-555-5555" },
    // Add more sample seller data as needed
  ];

  return (
    <Box m="20px">
      <Header title="My Sellers" subtitle="List of my Sellers" />
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
        <DataGrid checkboxSelection rows={sampleSellers} columns={sellerColumns} />
      </Box>
    </Box>
  );
};

export default SellerProducts;
