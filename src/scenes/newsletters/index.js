import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Newsletters = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const newsletterColumns = [
    { field: "id", headerName: "ID" },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "content", headerName: "Content", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 }, // Add the "Email" field
    // Add more newsletter-specific columns as needed
  ];

  // Sample newsletters data
  const sampleNewsletters = [
    { id: 1, title: "Newsletter 1", content: "Content of Newsletter 1", email: "newsletter1@example.com" },
    { id: 2, title: "Newsletter 2", content: "Content of Newsletter 2", email: "newsletter2@example.com" },
    { id: 3, title: "Newsletter 3", content: "Content of Newsletter 3", email: "newsletter3@example.com" },
    // Add more sample newsletter data as needed
  ];

  return (
    <Box m="20px">
      <Header title="Newsletters" subtitle="List of all Newsletters" />
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
        <DataGrid checkboxSelection rows={sampleNewsletters} columns={newsletterColumns} />
      </Box>
    </Box>
  );
};

export default Newsletters;
