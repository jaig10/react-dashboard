import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import ab from "../../images/jeans.png";
import Button from '@mui/material/Button';

const Banners = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "banner",
      headerName: "Banner",
      width: 260,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          <img
            className="bannerImage"
            src={params.row.img}
            alt=""
            style={{ width: 50, height: 50, borderRadius: "50%" }}
          />
          <Typography variant="body2" style={{ marginLeft: 10 }}>
            {params.row.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 170,
      renderCell: (params) => {
        return (
          <Box sx={{}}>
            <Link to={"/banner/" + params.row._id}>
      <Button variant="contained" color="success" sx={{color:"white", fontWeight:"600", }}>Edit</Button>
            </Link>
            <Button variant="contained" color="error" sx={{color:"white", fontWeight:"600", marginLeft:"20px"}}>Delete</Button>
            
            {/* <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            /> */}
          </Box>
        );
      },
    },
    { field: "desc", headerName: "Description", width: 320 },
  ];
  const banners = [
    {
      _id: "1234567890abcdef",
      img: ab, // Replace with your actual image URL
      name: "Summer Sale Banner",
      desc: "Get 20% off all summer clothing! Shop now.",
    },
    {
      _id: "0987654321fedcba",
      img: ab, // Replace with your actual image URL
      name: "New Arrivals Banner",
      desc: "Check out our latest collection of tech gadgets!",
    },
    {
      _id: "fedcba0987654321",
      img: ab, // Replace with your actual image URL
      name: "Back to School Banner",
      desc: "Get everything you need for the new school year!",
    },
    // Add more banner objects as needed
  ];

  return (
    <Box m="20px">
      <Header title="Banners" subtitle="List of all Banners" />
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
        <DataGrid rows={banners}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        // pageSize={8}
        checkboxSelection />
      </Box>
    </Box>
  );
};

export default Banners;
