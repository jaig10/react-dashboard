import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Orders = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const orderColumns = [
    { field: "id", headerName: "ID", width: 120 },
    { field: "createdAt", headerName: "Date", width: 160 },
    { field: "seller", headerName: "Seller", width: 160 },
    { field: "amount", headerName: "Amount", width: 120 },
    { field: "size", headerName: "Size", width: 80 },
    { field: "status", headerName: "Status", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row.id}>
            <Button variant="contained" size="small" color="success" sx={{color:"white", fontWeight:"600", }}>Edit</Button>
            </Link>
            <Button variant="contained" size="small" color="error" sx={{color:"white", fontWeight:"600", marginLeft:"10px"}}>Delete</Button>
            
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </>
        );
      },
    },
  ];

  const sampleOrders = [
    { id: 1, createdAt: "2024-04-01", seller: "Seller 1", amount: 49.99, size: "M", status: "Pending" },
    { id: 2, createdAt: "2024-04-02", seller: "Seller 2", amount: 29.99, size: "L", status: "Shipped" },
    { id: 3, createdAt: "2024-04-03", seller: "Seller 3", amount: 99.99, size: "S", status: "Delivered" },
    // Add more sample order data as needed
  ];

  return (
    <Box m="20px">
      <Header title="Orders" subtitle="List of all Orders" />
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
        <DataGrid checkboxSelection rows={sampleOrders} columns={orderColumns} />
      </Box>
    </Box>
  );
};

export default Orders;
