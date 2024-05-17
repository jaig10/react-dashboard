import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import ab from "../../images/jeans.png";
import { Link } from "react-router-dom";
const Products = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const productColumns = [
    {
      field: "title",
      headerName: "Title & Image",
      flex: 1,
      minWidth: 200, // Set minimum width for combined title and image
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <img
            src={row.image}
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
      renderCell: (params) => {
        return (
          <Box >
            <Link to={"/product/" + params.row.id}>
            <Button variant="contained" size="small" color="success" sx={{color:"white", fontWeight:"600", }}>Edit</Button>
            </Link>
            <Button variant="contained" size="small" color="error" sx={{color:"white", fontWeight:"600", marginLeft:"10px"}}>Delete</Button>
            
            {/* <DeleteOutline
              className="productListDelete"
            /> */}
          </Box>
        );
      },
    },
  ];

  const sampleProducts = [
    { id: 1, title: "Product A", description: "Description of Product A", image: ab, quantity: 100, brand: "Brand X", category: "Category 1" },
    { id: 2, title: "Product B", description: "Description of Product B", image: ab, quantity: 50, brand: "Brand Y", category: "Category 2" },
    { id: 3, title: "Product C", description: "Description of Product C", image: ab, quantity: 200, brand: "Brand Z", category: "Category 3" },
  ];

  return (
    <Box m="20px">
      {/* <img src={ab}/> */}
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
          // Remove unnecessary color styling for "title-column--cell"
          // "& .name-column--cell": {
          //   color: colors.greenAccent[300],
          // },
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
        <DataGrid checkboxSelection rows={sampleProducts} columns={productColumns} />
      </Box>
    </Box>
  );
};

export default Products;
