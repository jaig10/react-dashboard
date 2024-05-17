import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik, FieldArray } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import ab from "../../images/jeans.png";
import ab2 from "../../images/image.png";

const Product = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box m="20px">
      <Header title="Product" subtitle="Details of listed product" />
      <Box sx={{ display: "flex" }}>
        <Box sx={{ flex: 2, paddingX: "20px" }}>
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.title}
                    name="title"
                    error={!!touched.title && !!errors.title}
                    helperText={touched.title && errors.title}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={!!touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    sx={{ margin: "1.5rem 0 2rem 0" }}
                  />
                  <Box sx={{ marginTop: "2rem" }}>
                    <Typography
                      variant="h3"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "0 0 5px 0" }}
                    >
                      Media
                    </Typography>
                    <Box sx={{ display: "flex", marginTop: "20px" }}>
                      {values.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Image ${index + 1}`}
                          style={{ width: 150, height: 200, marginRight: 10 }}
                        />
                      ))}
                    </Box>
                  </Box>
                  <Box sx={{ marginTop: "4rem" }}>
                    <Typography
                      variant="h3"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "0 0 2rem 0" }}
                    >
                      Variants
                    </Typography>
                    <FieldArray name="variants">
                      {({ push, remove, form }) => (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 2,
                            }}
                          >
                            <Typography variant="h5" fontBold>
                              Size
                            </Typography>
                            <Button
                              variant="outlined"
                              color="secondary"
                              onClick={() =>
                                push({ size: "", price: 0, available: 0 })
                              }
                            >
                              Add another option
                            </Button>
                          </Box>
                          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            {form.values.variants.map((variant, index) => (
                              <Box
                                key={index}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mr: 2,
                                  mb: 2,
                                }}
                              >
                                <TextField
                                  variant="outlined"
                                  size="small"
                                  value={variant.size}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  name={`variants[${index}].size`}
                                  sx={{ mr: 1 }}
                                />
                                <IconButton
                                  onClick={() => remove(index)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                        </>
                      )}
                    </FieldArray>
                  </Box>
                  <FieldArray name="variants">
                    {({ push, remove }) => (
                      <Box sx={{ width: "100%", marginTop: "1rem" }}>
                        {values.variants.map((variant, index) => (
                          <Paper
                            key={index}
                            sx={{
                              padding: 2,
                              marginBottom: 2,
                              width: "100%",
                              backgroundColor: colors.primary[400],
                              color: colors.grey[100],
                            }}
                          >
                            <Grid container spacing={2}>
                              <Grid item xs={3}>
                                <TextField
                                  label="Size"
                                  variant="filled"
                                  value={variant.size}
                                  onChange={(e) =>
                                    handleChange({
                                      target: {
                                        name: `variants[${index}].size`,
                                        value: e.target.value,
                                      },
                                    })
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  label="Price"
                                  variant="filled"
                                  type="number"
                                  value={variant.price}
                                  onChange={(e) =>
                                    handleChange({
                                      target: {
                                        name: `variants[${index}].price`,
                                        value: parseInt(e.target.value),
                                      },
                                    })
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  label="Available"
                                  variant="filled"
                                  type="number"
                                  value={variant.available}
                                  onChange={(e) =>
                                    handleChange({
                                      target: {
                                        name: `variants[${index}].available`,
                                        value: parseInt(e.target.value),
                                      },
                                    })
                                  }
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={3}>
                                <IconButton
                                  onClick={() => remove(index)}
                                  color="error"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Paper>
                        ))}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            push({ size: "", price: 0, available: 0 })
                          }
                        >
                          Add Variant
                        </Button>
                      </Box>
                    )}
                  </FieldArray>
                  <Box>
                    <Typography
                      variant="h3"
                      color={colors.grey[100]}
                      fontWeight="bold"
                      sx={{ m: "4rem 0 2rem 0" }}
                    >
                      Metafields
                    </Typography>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Nickname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.nickname}
                      name="nickname"
                      sx={{
                        mb: 2,
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Brand"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.brand}
                      name="brand"
                      sx={{
                        mb: 2,
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Color"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.color}
                      name="color"
                      sx={{
                        mb: 2,
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Silhouette"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.silhouette}
                      name="silhouette"
                      sx={{
                        mb: 2,
                      }}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        <Box sx={{ flex: 1, paddingX: "20px" }}>
          <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value=""
              // onChange={}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Not Active">Not active</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

// const checkoutSchema = yup.object().shape({
//   title: yup.string().required("Title is required"),
//   description: yup.string().required("Description is required"),
//   images: yup.array().of(yup.string()),
//   variants: yup.array().of(
//     yup.object().shape({
//       size: yup.string().required("Size is required"),
//       price: yup.number().required("Price is required"),
//       available: yup.number().required("Available quantity is required"),
//     })
//   ),
// });

// const initialValues = {
//   title: "Sample Product",
//   description: "This is a sample product description.",
//   images: [ab, ab2, ab],
//   variants: [
//     { size: "S", price: 2190, available: 2 },
//     { size: "M", price: 2190, available: 2 },
//     { size: "L", price: 2190, available: 2 },
//     { size: "XL", price: 2190, available: 1 },
//   ],
// };

const checkoutSchema = yup.object().shape({
  title: yup.string().required("Title is required"), // Title of the product
  description: yup.string().required("Description is required"), // Description of the product
  type: yup.string(),
  color: yup.string(),
  nickname: yup.string(),
  brand: yup.string(),
  silhouette: yup.string(),
  images: yup.array().of(yup.string()),
  sizes: yup.array().of(yup.string()),
  variants: yup.array().of(
    yup.object().shape({
      size: yup.string().required("Size is required"),
      price: yup.number().required("Price is required"),
      available: yup.number().required("Available quantity is required"),
    })
  ),
  status: yup.string(),
});

// Define the initial values for the form
const initialValues = {
  title: "Sample Product",
  description: "This is a sample product description.",
  type: "Jeans",
  nickname: "Short one",
  brand: "nike",
  color: "Blue", // Sample color
  silhouette: "Slim Fit", // Sample silhouette
  images: [ab, ab2, ab], // Sample array of images
  sizes: ["S", "M", "L", "XL"], // Sample array of sizes
  variants: [
    { size: "S", price: 2190, available: 2 },
    { size: "M", price: 2190, available: 2 },
    { size: "L", price: 2190, available: 2 },
    { size: "XL", price: 2190, available: 1 },
  ],
};

export default Product;
