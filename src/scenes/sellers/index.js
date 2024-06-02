import React, { useEffect } from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSellers } from "../../redux/sellerRedux/sellerApi"; // Adjust the path as needed

const SellerProducts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const sellers = useSelector((state) => state.seller?.sellers || []);
  const isFetching = useSelector((state) => state.seller?.isFetching || false);
  const error = useSelector((state) => state.seller?.error || false);

  useEffect(() => {
    getSellers(dispatch);
  }, [dispatch]);


  const sellerColumns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <Link to={"/seller/" + params.row.id}>
            <Button variant="contained" size="small" color="success" sx={{ color: "white", fontWeight: "600" }}>Edit</Button>
          </Link>
          <Button variant="contained" size="small" color="error" sx={{ color: "white", fontWeight: "600", marginLeft: "10px" }}>Delete</Button>
        </>
      ),
    },
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
        {isFetching ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography variant="h6" color="error">Failed to fetch sellers</Typography>
        ) : (
          <DataGrid
            checkboxSelection
            rows={sellers.map((seller) => ({
              id: seller._id, // Adjust this according to your seller's data structure
              name: seller.firstName,
              email: seller.email,
              phone: seller.phone,
            }))}
            columns={sellerColumns}
          />
        )}
      </Box>
    </Box>
  );
};

export default SellerProducts;
