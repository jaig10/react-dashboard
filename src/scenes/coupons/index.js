import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { Link } from "react-router-dom";

const Coupons = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const couponColumns = [
        { field: "id", headerName: "ID" },
        { field: "couponCodeName", headerName: "Coupon Code", width: 150 },
        { field: "discount", headerName: "Discount", width: 100 },
        { field: "maxDiscount", headerName: "Max Discount", width: 100 },
        { field: "flatDiscount", headerName: "Flat Discount", width: 120 },
        { field: "desc", headerName: "Description", width: 250 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
              return (
                <>
                  <Link to={"/coupon/" + params.row.id}>
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

    // Sample coupons data
    const sampleCoupons = [
        { id: 1, couponCodeName: "COUPON1", discount: "10%", maxDiscount: "$50", flatDiscount: "$10", desc: "Description of Coupon 1" },
        { id: 2, couponCodeName: "COUPON2", discount: "15%", maxDiscount: "$100", flatDiscount: "$20", desc: "Description of Coupon 2" },
        { id: 3, couponCodeName: "COUPON3", discount: "20%", maxDiscount: "$200", flatDiscount: "$30", desc: "Description of Coupon 3" },
        // Add more sample coupon data as needed
    ];

    return (
        <Box m="20px">
            <Header title="Coupons" subtitle="List of all Coupons" />
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
                <DataGrid checkboxSelection rows={sampleCoupons} columns={couponColumns} />
            </Box>
        </Box>
    );
};

export default Coupons;
