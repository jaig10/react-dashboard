import React, { useEffect } from "react";
import { Box, Button, CircularProgress, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/productRedux/productApi"; // Adjust the path as needed
import ab from "../../images/jeans.png"; // Sample image for products

const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products || []);
  const isFetching = useSelector((state) => state.product?.isFetching || false);
  const error = useSelector((state) => state.product?.error || false);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const productColumns = [
    {
      field: "title",
      headerName: "Title & Image",
      flex: 1,
      minWidth: 200, // Set minimum width for combined title and image
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <img
            src={row.image || ab} // Fallback to sample image if image URL is not provided
            style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 10 }}
          />
          <Typography variant="body2">{row.title}</Typography>
        </Box>
      ),
    },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "quantity", headerName: "Quantity", type: "number", headerAlign: "left", align: "left" },
    { field: "brand", headerName: "Brand", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Link to={"/product/" + params.row.id}>
            <Button variant="contained" size="small" color="success" sx={{ color: "white", fontWeight: "600" }}>Edit</Button>
          </Link>
          <Button variant="contained" size="small" color="error" sx={{ color: "white", fontWeight: "600", marginLeft: "10px" }}>Delete</Button>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Products" subtitle="List of all Products" />
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
          <Typography variant="h6" color="error">Failed to fetch products</Typography>
        ) : (
          <DataGrid
            checkboxSelection
            rows={products.map((product) => ({
              id: product._id, // Adjust this according to your product's data structure
              title: product.title,
              description: product.desc,
              image: product.image,
              quantity: product.quantity,
              brand: product.brand,
              category: product.categories,
            }))}
            columns={productColumns}
          />
        )}
      </Box>
    </Box>
  );
};

export default Products;
